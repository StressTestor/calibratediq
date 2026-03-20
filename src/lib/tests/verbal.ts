import { TestType, Question } from './types';
import { createPRNG } from '../prng';
import wordBank from './word-bank.json';

// ── Types ──────────────────────────────────────────────────────────────────

interface VerbalQuestionData {
  type: 'analogy' | 'odd_one_out';
  difficulty: 'easy' | 'medium' | 'hard';
  // For analogy type
  promptPair?: [string, string]; // e.g., ["Hot", "Cold"]
  targetFirst?: string; // e.g., "Up"
  // For odd-one-out
  pairs?: [string, string][]; // 6 pairs, one is the odd one out
  instruction: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

type Pair = { a: [string, string]; b: [string, string] };
type RelType = string;

/** Collect all pairs from a difficulty level, tagged with their relationship type */
function collectPairs(
  level: Record<string, Pair[]>
): { pair: Pair; rel: RelType }[] {
  const results: { pair: Pair; rel: RelType }[] = [];
  for (const [rel, pairs] of Object.entries(level)) {
    for (const pair of pairs) {
      results.push({ pair, rel });
    }
  }
  return results;
}

/** Get all relationship types for a difficulty level */
function getRelTypes(level: Record<string, Pair[]>): RelType[] {
  return Object.keys(level);
}

/** Pick distractors from different relationship types than the correct pair */
function pickDistractors(
  rng: ReturnType<typeof createPRNG>,
  correctRel: RelType,
  allPairs: { pair: Pair; rel: RelType }[],
  count: number
): string[] {
  // Filter to pairs with different relationship types
  const candidates = allPairs.filter((p) => p.rel !== correctRel);
  rng.shuffle(candidates);

  const distractors: string[] = [];
  const used = new Set<string>();

  for (const c of candidates) {
    if (distractors.length >= count) break;
    const word = c.pair.b[1]; // second word of the b-pair
    if (!used.has(word)) {
      used.add(word);
      distractors.push(word);
    }
  }

  // If we still need more (unlikely), pull from same rel type but different pairs
  if (distractors.length < count) {
    const sameCandidates = allPairs.filter((p) => p.rel === correctRel);
    rng.shuffle(sameCandidates);
    for (const c of sameCandidates) {
      if (distractors.length >= count) break;
      const word = c.pair.b[1];
      if (!used.has(word)) {
        used.add(word);
        distractors.push(word);
      }
    }
  }

  return distractors.slice(0, count);
}

// ── Question generators ────────────────────────────────────────────────────

function generateAnalogyQuestion(
  rng: ReturnType<typeof createPRNG>,
  difficulty: 'easy' | 'medium' | 'hard'
): Question {
  // Determine which bank levels to use
  let levels: Record<string, Pair[]>[];
  if (difficulty === 'easy') {
    levels = [wordBank.easy as unknown as Record<string, Pair[]>];
  } else if (difficulty === 'medium') {
    levels = [wordBank.medium as unknown as Record<string, Pair[]>];
  } else {
    levels = [wordBank.hard as unknown as Record<string, Pair[]>];
  }

  // Collect all pairs from the relevant difficulty levels
  const allPairs = levels.flatMap(collectPairs);

  // Also collect pairs from ALL levels for distractor variety
  const allLevelPairs = [
    ...collectPairs(wordBank.easy as unknown as Record<string, Pair[]>),
    ...collectPairs(wordBank.medium as unknown as Record<string, Pair[]>),
    ...collectPairs(wordBank.hard as unknown as Record<string, Pair[]>),
  ];

  // Pick a random pair
  const idx = rng.nextInt(0, allPairs.length);
  const chosen = allPairs[idx];
  const correctAnswer = chosen.pair.b[1]; // e.g., "Down"

  // Get 5 distractors
  const distractors = pickDistractors(rng, chosen.rel, allLevelPairs, 5);

  // Make sure the correct answer isn't already in distractors
  const filteredDistractors = distractors.filter((d) => d !== correctAnswer);
  while (filteredDistractors.length < 5) {
    // Grab any word not yet used
    const fallbackIdx = rng.nextInt(0, allLevelPairs.length);
    const word = allLevelPairs[fallbackIdx].pair.b[1];
    if (
      word !== correctAnswer &&
      !filteredDistractors.includes(word)
    ) {
      filteredDistractors.push(word);
    }
  }

  // Build options: correct + 5 distractors
  const options = [correctAnswer, ...filteredDistractors.slice(0, 5)];
  rng.shuffle(options);

  const correctIndex = options.indexOf(correctAnswer);

  const data: VerbalQuestionData = {
    type: 'analogy',
    difficulty,
    promptPair: chosen.pair.a as [string, string],
    targetFirst: chosen.pair.b[0],
    instruction: 'Complete the analogy',
  };

  return { data, options, correctIndex };
}

function generateOddOneOutQuestion(
  rng: ReturnType<typeof createPRNG>
): Question {
  const hardLevel = wordBank.hard as unknown as Record<string, Pair[]>;
  const mediumLevel = wordBank.medium as unknown as Record<string, Pair[]>;

  // Combine hard and medium for variety
  const combined: Record<string, Pair[]> = {};
  for (const [rel, pairs] of Object.entries(hardLevel)) {
    combined[rel] = [...pairs];
  }
  for (const [rel, pairs] of Object.entries(mediumLevel)) {
    if (combined[rel]) {
      combined[rel] = [...combined[rel], ...pairs];
    } else {
      combined[rel] = [...pairs];
    }
  }

  const relTypes = Object.keys(combined);

  // Pick the "majority" relationship type (5 pairs will share this)
  const majorityRelIdx = rng.nextInt(0, relTypes.length);
  const majorityRel = relTypes[majorityRelIdx];

  // Pick 5 pairs from this relationship type
  const majorityPool = [...combined[majorityRel]];
  rng.shuffle(majorityPool);
  const majorityPairs = majorityPool.slice(0, Math.min(5, majorityPool.length));

  // If we don't have enough pairs, supplement from other relationships of the same type
  while (majorityPairs.length < 5) {
    const fallbackIdx = rng.nextInt(0, majorityPool.length);
    majorityPairs.push(majorityPool[fallbackIdx]);
  }

  // Pick the "odd" relationship type (different from majority)
  let oddRelIdx = rng.nextInt(0, relTypes.length);
  while (relTypes[oddRelIdx] === majorityRel) {
    oddRelIdx = (oddRelIdx + 1) % relTypes.length;
  }
  const oddRel = relTypes[oddRelIdx];
  const oddPool = combined[oddRel];
  const oddPair = oddPool[rng.nextInt(0, oddPool.length)];

  // Build 6 display pairs: 5 majority + 1 odd
  const displayPairs: [string, string][] = [
    ...majorityPairs.map((p) => p.a as [string, string]),
    oddPair.a as [string, string],
  ];

  // The odd one out is always at index 5 before shuffle
  // We need to track which index it ends up at
  const indices = [0, 1, 2, 3, 4, 5];
  rng.shuffle(indices);

  const shuffledPairs = indices.map((i) => displayPairs[i]);
  const oddIndex = indices.indexOf(5); // where did the odd pair end up?

  // Options are indices 0-5 (displayed as pair labels A-F)
  const options = [0, 1, 2, 3, 4, 5];

  const data: VerbalQuestionData = {
    type: 'odd_one_out',
    difficulty: 'hard',
    pairs: shuffledPairs,
    instruction: 'Which pair has a different relationship?',
  };

  return { data, options, correctIndex: oddIndex };
}

// ── Main generator ─────────────────────────────────────────────────────────

function generateVerbalQuestion(
  seed: number,
  questionIndex: number
): Question {
  const rng = createPRNG(seed * 31337 + questionIndex * 7919);

  if (questionIndex < 10) {
    // Easy: simple analogies
    return generateAnalogyQuestion(rng, 'easy');
  } else if (questionIndex < 22) {
    // Medium: complex relationship analogies
    return generateAnalogyQuestion(rng, 'medium');
  } else {
    // Hard: alternate between double analogy and odd-one-out
    const useOddOneOut = rng.next() < 0.5;
    if (useOddOneOut) {
      return generateOddOneOutQuestion(rng);
    } else {
      return generateAnalogyQuestion(rng, 'hard');
    }
  }
}

// ── Test definition ────────────────────────────────────────────────────────

const verbalTest: TestType = {
  slug: 'verbal',
  name: 'Verbal Reasoning',
  shortName: 'vb',
  description:
    'Word analogies testing vocabulary depth and relationship recognition.',
  icon: '\u2261',
  totalQuestions: 30,
  learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
  generateQuestion: generateVerbalQuestion,
  renderQuestion() {
    return null;
  },
  renderOption() {
    return null;
  },
};

export type { VerbalQuestionData };
export default verbalTest;
