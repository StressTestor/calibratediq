import { TestType, Question } from './types';
import { createPRNG } from '../prng';

// ── Types ──────────────────────────────────────────────────────────────────

export interface MemoryQuestionData {
  type: 'digit_span' | 'grid_pattern' | 'dual_task';
  difficulty: 'easy' | 'medium' | 'hard';
  stimulus: {
    digits?: number[];
    gridSize?: number;
    highlightedCells?: [number, number][];
    shapes?: { shape: string; color: string; position: number }[];
  };
  question: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal'];
const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'star'];

// ── Helpers ────────────────────────────────────────────────────────────────

type RNG = ReturnType<typeof createPRNG>;

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function cellSetsEqual(a: [number, number][], b: [number, number][]): boolean {
  if (a.length !== b.length) return false;
  const setA = new Set(a.map(([r, c]) => `${r},${c}`));
  const setB = new Set(b.map(([r, c]) => `${r},${c}`));
  if (setA.size !== setB.size) return false;
  for (const k of setA) {
    if (!setB.has(k)) return false;
  }
  return true;
}

// ── Digit Span (Easy: Q1-10) ──────────────────────────────────────────────

function digitSpanLength(questionIndex: number): number {
  if (questionIndex < 3) return 4;
  if (questionIndex < 6) return 5;
  if (questionIndex < 8) return 6;
  return 7;
}

function generateDigits(rng: RNG, length: number): number[] {
  const digits: number[] = [];
  for (let i = 0; i < length; i++) {
    digits.push(rng.nextInt(1, 10)); // 1-9
  }
  return digits;
}

function generateDigitDistractors(rng: RNG, correct: number[]): number[][] {
  const distractors: number[][] = [];
  const seen = new Set<string>();
  seen.add(correct.join(','));

  // Strategy 1: swap two adjacent digits
  for (let i = 0; i < correct.length - 1 && distractors.length < 5; i++) {
    const swapped = [...correct];
    [swapped[i], swapped[i + 1]] = [swapped[i + 1], swapped[i]];
    const key = swapped.join(',');
    if (!seen.has(key)) {
      seen.add(key);
      distractors.push(swapped);
    }
  }

  // Strategy 2: change one digit
  let attempts = 0;
  while (distractors.length < 5 && attempts < 30) {
    attempts++;
    const changed = [...correct];
    const idx = rng.nextInt(0, changed.length);
    let newDigit = rng.nextInt(1, 10);
    // Make sure it's actually different
    while (newDigit === changed[idx]) {
      newDigit = rng.nextInt(1, 10);
    }
    changed[idx] = newDigit;
    const key = changed.join(',');
    if (!seen.has(key)) {
      seen.add(key);
      distractors.push(changed);
    }
  }

  // Strategy 3: reverse a pair of non-adjacent digits
  attempts = 0;
  while (distractors.length < 5 && attempts < 30) {
    attempts++;
    const reversed = [...correct];
    const i = rng.nextInt(0, reversed.length);
    let j = rng.nextInt(0, reversed.length);
    while (j === i) j = rng.nextInt(0, reversed.length);
    [reversed[i], reversed[j]] = [reversed[j], reversed[i]];
    const key = reversed.join(',');
    if (!seen.has(key)) {
      seen.add(key);
      distractors.push(reversed);
    }
  }

  return distractors.slice(0, 5);
}

function generateDigitSpan(rng: RNG, questionIndex: number): Question {
  const length = digitSpanLength(questionIndex);
  const digits = generateDigits(rng, length);
  const distractors = generateDigitDistractors(rng, digits);

  const options: number[][] = [digits, ...distractors];
  rng.shuffle(options);
  const correctIndex = options.findIndex((o) => arraysEqual(o, digits));

  const data: MemoryQuestionData = {
    type: 'digit_span',
    difficulty: 'easy',
    stimulus: { digits },
    question: 'What was the sequence?',
  };

  return { data, options, correctIndex };
}

// ── Grid Pattern (Medium: Q11-22) ──────────────────────────────────────────

function highlightCount(questionIndex: number): number {
  // Q11-14: 4 cells, Q15-18: 5 cells, Q19-22: 6 cells
  const offset = questionIndex - 10;
  if (offset < 4) return 4;
  if (offset < 8) return 5;
  return 6;
}

function generateGridCells(
  rng: RNG,
  gridSize: number,
  count: number
): [number, number][] {
  const allCells: [number, number][] = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      allCells.push([r, c]);
    }
  }
  rng.shuffle(allCells);
  return allCells.slice(0, count);
}

function generateGridDistractors(
  rng: RNG,
  correct: [number, number][],
  gridSize: number
): [number, number][][] {
  const distractors: [number, number][][] = [];
  const seen = new Set<string>();
  const correctKey = [...correct].sort((a, b) => a[0] * 10 + a[1] - (b[0] * 10 + b[1])).map(([r, c]) => `${r},${c}`).join(';');
  seen.add(correctKey);

  const allCells: [number, number][] = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      allCells.push([r, c]);
    }
  }

  const correctSet = new Set(correct.map(([r, c]) => `${r},${c}`));
  const nonHighlighted = allCells.filter(([r, c]) => !correctSet.has(`${r},${c}`));

  function toKey(cells: [number, number][]): string {
    return [...cells].sort((a, b) => a[0] * 10 + a[1] - (b[0] * 10 + b[1])).map(([r, c]) => `${r},${c}`).join(';');
  }

  // Strategy 1: shift one cell to a neighboring empty cell
  for (let i = 0; i < correct.length && distractors.length < 5; i++) {
    if (nonHighlighted.length === 0) break;
    const shifted: [number, number][] = [...correct];
    const replacement = nonHighlighted[rng.nextInt(0, nonHighlighted.length)];
    shifted[i] = replacement;
    const key = toKey(shifted);
    if (!seen.has(key)) {
      seen.add(key);
      distractors.push(shifted);
    }
  }

  // Strategy 2: swap one highlighted cell with a non-highlighted cell
  let attempts = 0;
  while (distractors.length < 5 && attempts < 30) {
    attempts++;
    const swapped: [number, number][] = [...correct];
    const removeIdx = rng.nextInt(0, swapped.length);
    if (nonHighlighted.length === 0) break;
    const addCell = nonHighlighted[rng.nextInt(0, nonHighlighted.length)];
    swapped[removeIdx] = addCell;
    const key = toKey(swapped);
    if (!seen.has(key)) {
      seen.add(key);
      distractors.push(swapped);
    }
  }

  // Strategy 3: add one cell, remove a different one
  attempts = 0;
  while (distractors.length < 5 && attempts < 40) {
    attempts++;
    const modified: [number, number][] = [...correct];
    const removeIdx = rng.nextInt(0, modified.length);
    if (nonHighlighted.length === 0) break;
    const addCell = nonHighlighted[rng.nextInt(0, nonHighlighted.length)];
    modified.splice(removeIdx, 1, addCell);
    // Also swap positions of two remaining
    if (modified.length >= 2) {
      const a = rng.nextInt(0, modified.length);
      let b = rng.nextInt(0, modified.length);
      while (b === a) b = rng.nextInt(0, modified.length);
      // Swap doesn't matter for set equality but the visual is different
    }
    const key = toKey(modified);
    if (!seen.has(key)) {
      seen.add(key);
      distractors.push(modified);
    }
  }

  return distractors.slice(0, 5);
}

function generateGridPattern(rng: RNG, questionIndex: number): Question {
  const gridSize = 4;
  const count = highlightCount(questionIndex);
  const highlighted = generateGridCells(rng, gridSize, count);
  const distractors = generateGridDistractors(rng, highlighted, gridSize);

  const options: [number, number][][] = [highlighted, ...distractors];
  rng.shuffle(options);
  const correctIndex = options.findIndex((o) => cellSetsEqual(o, highlighted));

  const data: MemoryQuestionData = {
    type: 'grid_pattern',
    difficulty: 'medium',
    stimulus: { gridSize, highlightedCells: highlighted },
    question: 'Which grid matches the pattern you saw?',
  };

  return { data, options, correctIndex };
}

// ── Dual Task (Hard: Q23-30) ──────────────────────────────────────────────

function generateShapeStimulus(
  rng: RNG,
  count: number
): { shape: string; color: string; position: number }[] {
  const availableColors = rng.pick(COLORS, count);
  const availableShapes = rng.pick(SHAPES, count);
  const shapes: { shape: string; color: string; position: number }[] = [];
  for (let i = 0; i < count; i++) {
    shapes.push({
      shape: availableShapes[i],
      color: availableColors[i],
      position: i + 1,
    });
  }
  return shapes;
}

function generateDualTask(rng: RNG, questionIndex: number): Question {
  const shapeCount = questionIndex < 26 ? 4 : 5;
  const shapes = generateShapeStimulus(rng, shapeCount);

  // Alternate question type based on question index
  const askColor = questionIndex % 2 === 0;
  const targetIdx = rng.nextInt(0, shapes.length);
  const targetShape = shapes[targetIdx];

  let question: string;
  let correctAnswer: string;
  let distractorPool: string[];

  if (askColor) {
    question = `What color was the ${targetShape.shape} at position #${targetShape.position}?`;
    correctAnswer = targetShape.color;
    // Distractors: other colors from the stimulus + random colors
    distractorPool = [
      ...shapes.filter((_, i) => i !== targetIdx).map((s) => s.color),
      ...COLORS.filter((c) => c !== correctAnswer),
    ];
  } else {
    question = `What shape was at position #${targetShape.position}?`;
    correctAnswer = targetShape.shape;
    // Distractors: other shapes from the stimulus + random shapes
    distractorPool = [
      ...shapes.filter((_, i) => i !== targetIdx).map((s) => s.shape),
      ...SHAPES.filter((s) => s !== correctAnswer),
    ];
  }

  // Deduplicate distractors
  const uniqueDistractors = Array.from(new Set(distractorPool.filter((d) => d !== correctAnswer)));
  rng.shuffle(uniqueDistractors);
  const distractors = uniqueDistractors.slice(0, 5);

  const options: string[] = [correctAnswer, ...distractors];
  rng.shuffle(options);
  const correctIndex = options.indexOf(correctAnswer);

  const data: MemoryQuestionData = {
    type: 'dual_task',
    difficulty: 'hard',
    stimulus: { shapes },
    question,
  };

  return { data, options, correctIndex };
}

// ── Main generator ─────────────────────────────────────────────────────────

function generateMemoryQuestion(
  seed: number,
  questionIndex: number
): Question {
  const rng = createPRNG(seed * 31337 + questionIndex * 7919);

  if (questionIndex < 10) {
    return generateDigitSpan(rng, questionIndex);
  } else if (questionIndex < 22) {
    return generateGridPattern(rng, questionIndex);
  } else {
    return generateDualTask(rng, questionIndex);
  }
}

// ── Test definition ────────────────────────────────────────────────────────

const memoryTest: TestType = {
  slug: 'memory',
  name: 'Working Memory',
  shortName: 'mm',
  description: 'Timed recall of digit sequences, grid patterns, and multi-element stimuli.',
  icon: '\u29C9',
  totalQuestions: 30,
  revealDuration: 4000,
  learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
  generateQuestion: generateMemoryQuestion,
  renderQuestion() {
    return null;
  },
  renderOption() {
    return null;
  },
};

export default memoryTest;
