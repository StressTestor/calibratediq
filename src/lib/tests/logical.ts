import { TestType, Question } from './types';
import { createPRNG } from '../prng';

// ── Types ──────────────────────────────────────────────────────────────────

export interface LogicalQuestionData {
  premises: string[];
  questionText: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// ── Abstract term pools ────────────────────────────────────────────────────

const GROUP_A = [
  'Zarks', 'Plims', 'Droffs', 'Glunks', 'Vorps',
  'Twibs', 'Snelps', 'Frobs', 'Qualms', 'Brints',
];

const GROUP_B = [
  'Blips', 'Crunds', 'Nolfs', 'Yemps', 'Targs',
  'Wimps', 'Kelbs', 'Dunts', 'Jarks', 'Hovs',
];

type RNG = ReturnType<typeof createPRNG>;

/** Pick n unique terms from a pool */
function pickTerms(rng: RNG, pool: string[], n: number): string[] {
  const copy = [...pool];
  rng.shuffle(copy);
  return copy.slice(0, n);
}

/** Pick a proper name for an individual (e.g. "Zark X") */
function pickIndividual(rng: RNG): string {
  const names = ['Rex', 'Zel', 'Pax', 'Kiv', 'Dov', 'Mun', 'Tig', 'Wex', 'Jol', 'Fen'];
  return names[rng.nextInt(0, names.length)];
}

// ── Easy: Simple syllogisms (Q1-10) ────────────────────────────────────────

interface SyllogismResult {
  premises: string[];
  questionText: string;
  correct: string;
  distractors: string[];
}

function generateEasySyllogism(rng: RNG): SyllogismResult {
  const [a, c] = pickTerms(rng, GROUP_A, 2);
  const [b] = pickTerms(rng, GROUP_B, 1);
  const individual = pickIndividual(rng);

  const template = rng.nextInt(0, 5);

  switch (template) {
    case 0: {
      // All A are B. All B are C. Therefore all A are C. (valid)
      return {
        premises: [`All ${a} are ${b}.`, `All ${b} are ${c}.`],
        questionText: 'Which conclusion necessarily follows?',
        correct: `All ${a} are ${c}.`,
        distractors: [
          `All ${c} are ${a}.`,
          `All ${b} are ${a}.`,
          `No ${a} are ${c}.`,
          `Some ${a} are not ${c}.`,
        ],
      };
    }
    case 1: {
      // All A are B. X is an A. Therefore X is a B. (valid)
      return {
        premises: [`All ${a} are ${b}.`, `${individual} is a ${a.slice(0, -1)}.`],
        questionText: 'Which conclusion necessarily follows?',
        correct: `${individual} is a ${b.slice(0, -1)}.`,
        distractors: [
          `${individual} is not a ${b.slice(0, -1)}.`,
          `All ${b} are ${a}.`,
          `${individual} is a ${c.slice(0, -1)}.`,
          `Not all ${a} are ${b}.`,
        ],
      };
    }
    case 2: {
      // No A are B. X is an A. Therefore X is not a B. (valid)
      return {
        premises: [`No ${a} are ${b}.`, `${individual} is a ${a.slice(0, -1)}.`],
        questionText: 'Which conclusion necessarily follows?',
        correct: `${individual} is not a ${b.slice(0, -1)}.`,
        distractors: [
          `${individual} is a ${b.slice(0, -1)}.`,
          `All ${b} are ${a}.`,
          `Some ${a} are ${b}.`,
          `${individual} is a ${c.slice(0, -1)}.`,
        ],
      };
    }
    case 3: {
      // All A are B. X is a B. Therefore X is an A. (INVALID - affirming consequent)
      // Correct answer: "Cannot be determined"
      return {
        premises: [`All ${a} are ${b}.`, `${individual} is a ${b.slice(0, -1)}.`],
        questionText: 'Which conclusion necessarily follows?',
        correct: `It cannot be determined whether ${individual} is a ${a.slice(0, -1)}.`,
        distractors: [
          `${individual} is a ${a.slice(0, -1)}.`,
          `${individual} is not a ${a.slice(0, -1)}.`,
          `All ${b} are ${a}.`,
          `No ${a} are ${b}.`,
        ],
      };
    }
    case 4:
    default: {
      // Some A are B. All B are C. Therefore some A are C. (valid)
      return {
        premises: [`Some ${a} are ${b}.`, `All ${b} are ${c}.`],
        questionText: 'Which conclusion necessarily follows?',
        correct: `Some ${a} are ${c}.`,
        distractors: [
          `All ${a} are ${c}.`,
          `All ${c} are ${a}.`,
          `No ${a} are ${c}.`,
          `Some ${c} are not ${a}.`,
        ],
      };
    }
  }
}

// ── Medium: Conditional chains (Q11-22) ────────────────────────────────────

function generateMediumConditional(rng: RNG): SyllogismResult {
  const terms = pickTerms(rng, [...GROUP_A, ...GROUP_B], 4);
  const [p, q, r, s] = terms;

  const template = rng.nextInt(0, 5);

  switch (template) {
    case 0: {
      // Modus ponens: If P then Q. P is true. Therefore Q.
      const ind = pickIndividual(rng);
      return {
        premises: [
          `If something is a ${p.slice(0, -1)}, then it is a ${q.slice(0, -1)}.`,
          `${ind} is a ${p.slice(0, -1)}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `${ind} is a ${q.slice(0, -1)}.`,
        distractors: [
          `${ind} is not a ${q.slice(0, -1)}.`,
          `${ind} is a ${r.slice(0, -1)}.`,
          `All ${q} are ${p}.`,
          `It cannot be determined.`,
        ],
      };
    }
    case 1: {
      // Modus tollens: If P then Q. Not Q. Therefore not P.
      const ind = pickIndividual(rng);
      return {
        premises: [
          `If something is a ${p.slice(0, -1)}, then it is a ${q.slice(0, -1)}.`,
          `${ind} is not a ${q.slice(0, -1)}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `${ind} is not a ${p.slice(0, -1)}.`,
        distractors: [
          `${ind} is a ${p.slice(0, -1)}.`,
          `${ind} is a ${q.slice(0, -1)}.`,
          `All ${p} are ${q}.`,
          `It cannot be determined whether ${ind} is a ${p.slice(0, -1)}.`,
        ],
      };
    }
    case 2: {
      // Chain: If P then Q. If Q then R. P is true. Therefore R.
      const ind = pickIndividual(rng);
      return {
        premises: [
          `If something is a ${p.slice(0, -1)}, then it is a ${q.slice(0, -1)}.`,
          `If something is a ${q.slice(0, -1)}, then it is a ${r.slice(0, -1)}.`,
          `${ind} is a ${p.slice(0, -1)}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `${ind} is a ${r.slice(0, -1)}.`,
        distractors: [
          `${ind} is not a ${r.slice(0, -1)}.`,
          `${ind} is a ${s.slice(0, -1)}.`,
          `All ${r} are ${p}.`,
          `It cannot be determined.`,
        ],
      };
    }
    case 3: {
      // Affirming the consequent (INVALID): If P then Q. Q is true. Therefore P.
      const ind = pickIndividual(rng);
      return {
        premises: [
          `If something is a ${p.slice(0, -1)}, then it is a ${q.slice(0, -1)}.`,
          `${ind} is a ${q.slice(0, -1)}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `It cannot be determined whether ${ind} is a ${p.slice(0, -1)}.`,
        distractors: [
          `${ind} is a ${p.slice(0, -1)}.`,
          `${ind} is not a ${p.slice(0, -1)}.`,
          `All ${q} are ${p}.`,
          `No ${q} are ${p}.`,
        ],
      };
    }
    case 4:
    default: {
      // Denying the antecedent (INVALID): If P then Q. Not P. Therefore not Q.
      const ind = pickIndividual(rng);
      return {
        premises: [
          `If something is a ${p.slice(0, -1)}, then it is a ${q.slice(0, -1)}.`,
          `${ind} is not a ${p.slice(0, -1)}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `It cannot be determined whether ${ind} is a ${q.slice(0, -1)}.`,
        distractors: [
          `${ind} is not a ${q.slice(0, -1)}.`,
          `${ind} is a ${q.slice(0, -1)}.`,
          `No ${q} are ${p}.`,
          `All ${p} are ${q}.`,
        ],
      };
    }
  }
}

// ── Hard: Multi-premise quantifier logic (Q23-30) ──────────────────────────

function generateHardQuantifier(rng: RNG): SyllogismResult {
  const aTerms = pickTerms(rng, GROUP_A, 3);
  const bTerms = pickTerms(rng, GROUP_B, 2);
  const allTerms = [...aTerms, ...bTerms];
  rng.shuffle(allTerms);
  const [t1, t2, t3, t4] = allTerms;

  const template = rng.nextInt(0, 5);

  switch (template) {
    case 0: {
      // All A are B. Some B are C. No C are D.
      // Valid: Some A might be C, but "Some A are C" doesn't necessarily follow
      // Valid: No conclusion about all A and D
      // "Cannot be determined" about A and D relationship
      return {
        premises: [
          `All ${t1} are ${t2}.`,
          `Some ${t2} are ${t3}.`,
          `No ${t3} are ${t4}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `Some ${t2} are not ${t4}.`,
        distractors: [
          `No ${t1} are ${t4}.`,
          `All ${t1} are ${t3}.`,
          `Some ${t1} are ${t4}.`,
          `No ${t2} are ${t4}.`,
        ],
      };
    }
    case 1: {
      // All A are B. All B are C. Some C are D.
      // Valid: All A are C
      // Invalid: Some A are D (not necessarily)
      return {
        premises: [
          `All ${t1} are ${t2}.`,
          `All ${t2} are ${t3}.`,
          `Some ${t3} are ${t4}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `All ${t1} are ${t3}.`,
        distractors: [
          `Some ${t1} are ${t4}.`,
          `All ${t3} are ${t1}.`,
          `No ${t1} are ${t4}.`,
          `All ${t4} are ${t2}.`,
        ],
      };
    }
    case 2: {
      // No A are B. All B are C. All C are D.
      // Valid: No A are B (given), All B are D
      // Invalid: No A are D (A could be D through other means)
      return {
        premises: [
          `No ${t1} are ${t2}.`,
          `All ${t2} are ${t3}.`,
          `All ${t3} are ${t4}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `All ${t2} are ${t4}.`,
        distractors: [
          `No ${t1} are ${t4}.`,
          `No ${t1} are ${t3}.`,
          `All ${t4} are ${t2}.`,
          `Some ${t1} are ${t3}.`,
        ],
      };
    }
    case 3: {
      // All A are B. No B are C. Some A are D.
      // Valid: No A are C (since all A are B and no B are C)
      return {
        premises: [
          `All ${t1} are ${t2}.`,
          `No ${t2} are ${t3}.`,
          `Some ${t1} are ${t4}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `No ${t1} are ${t3}.`,
        distractors: [
          `All ${t1} are ${t4}.`,
          `Some ${t3} are ${t1}.`,
          `No ${t4} are ${t3}.`,
          `Cannot be determined.`,
        ],
      };
    }
    case 4:
    default: {
      // Some A are B. All B are C. No C are D.
      // Valid: Some A are C. Also: No B are D.
      // We test: Some A are C.
      return {
        premises: [
          `Some ${t1} are ${t2}.`,
          `All ${t2} are ${t3}.`,
          `No ${t3} are ${t4}.`,
        ],
        questionText: 'Which conclusion necessarily follows?',
        correct: `Some ${t1} are ${t3}.`,
        distractors: [
          `All ${t1} are ${t3}.`,
          `No ${t1} are ${t3}.`,
          `Some ${t4} are ${t1}.`,
          `All ${t3} are ${t1}.`,
        ],
      };
    }
  }
}

// ── Main generator ─────────────────────────────────────────────────────────

function generateLogicalQuestion(
  seed: number,
  questionIndex: number
): Question {
  const rng = createPRNG(seed * 31337 + questionIndex * 7919);

  let difficulty: 'easy' | 'medium' | 'hard';
  let result: SyllogismResult;

  if (questionIndex < 10) {
    difficulty = 'easy';
    result = generateEasySyllogism(rng);
  } else if (questionIndex < 22) {
    difficulty = 'medium';
    result = generateMediumConditional(rng);
  } else {
    difficulty = 'hard';
    result = generateHardQuantifier(rng);
  }

  const { premises, questionText, correct, distractors } = result;

  // Build 6 options: 1 correct + 5 distractors
  // If we have fewer than 5 distractors, pad with generic ones
  const usedDistractors = distractors.slice(0, 5);
  while (usedDistractors.length < 5) {
    usedDistractors.push('None of the above conclusions follow.');
  }

  const options: string[] = [correct, ...usedDistractors];
  rng.shuffle(options);

  const correctIndex = options.indexOf(correct);

  const data: LogicalQuestionData = {
    premises,
    questionText,
    difficulty,
  };

  return {
    data,
    options,
    correctIndex,
  };
}

// ── Test definition ────────────────────────────────────────────────────────

const logicalTest: TestType = {
  slug: 'logical',
  name: 'Logical Reasoning',
  shortName: 'lg',
  description:
    'Deductive reasoning with syllogisms, conditionals, and quantifier logic.',
  icon: '\u2234',
  totalQuestions: 30,
  learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
  generateQuestion: generateLogicalQuestion,
  renderQuestion() {
    return null;
  },
  renderOption() {
    return null;
  },
};

export default logicalTest;
