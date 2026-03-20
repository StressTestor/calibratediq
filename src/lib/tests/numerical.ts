import { TestType, Question } from './types';
import { createPRNG } from '../prng';

// ── Types ──────────────────────────────────────────────────────────────────

interface NumericalQuestionData {
  sequence: number[];
  difficulty: 'easy' | 'medium' | 'hard';
  ruleDescription?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Clamp values to keep sequences readable */
function clamp(n: number, lo = -9999, hi = 9999): number {
  return Math.max(lo, Math.min(hi, n));
}

/** Check if all elements are finite integers within display range */
function isClean(seq: number[]): boolean {
  return seq.every(
    (n) => Number.isFinite(n) && Number.isInteger(n) && Math.abs(n) < 10000
  );
}

/** Check that a sequence has no adjacent duplicates (keeps puzzles interesting) */
function hasVariation(seq: number[]): boolean {
  for (let i = 1; i < seq.length; i++) {
    if (seq[i] === seq[i - 1]) return false;
  }
  return true;
}

/** Small list of primes for prime-based generators */
const PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
  71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
];

function nextPrime(n: number): number {
  if (n < 2) return 2;
  let c = n + 1;
  while (!isPrime(c)) c++;
  return c;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// ── Sequence Generators ────────────────────────────────────────────────────
// Each returns { shown: number[], answer: number, rule: string } or null on bad params.

type SeqResult = { shown: number[]; answer: number; rule: string } | null;

// ---------- EASY generators ----------

function arithmetic(rng: ReturnType<typeof createPRNG>): SeqResult {
  const start = rng.nextInt(-20, 50);
  let diff = rng.nextInt(2, 15);
  if (rng.next() < 0.3) diff = -diff;
  const len = rng.nextInt(5, 7);
  const seq: number[] = [];
  for (let i = 0; i < len + 1; i++) seq.push(start + diff * i);
  if (!isClean(seq)) return null;
  return { shown: seq.slice(0, len), answer: seq[len], rule: `+${diff}` };
}

function geometric(rng: ReturnType<typeof createPRNG>): SeqResult {
  const start = rng.nextInt(1, 6);
  const ratio = rng.nextInt(2, 5);
  const len = rng.nextInt(5, 7);
  const seq: number[] = [];
  let v = start;
  for (let i = 0; i < len + 1; i++) {
    seq.push(v);
    v *= ratio;
  }
  if (!isClean(seq)) return null;
  return { shown: seq.slice(0, len), answer: seq[len], rule: `*${ratio}` };
}

function squares(rng: ReturnType<typeof createPRNG>): SeqResult {
  const offset = rng.nextInt(1, 6);
  const len = rng.nextInt(5, 7);
  const seq: number[] = [];
  for (let i = 0; i < len + 1; i++) seq.push((offset + i) * (offset + i));
  if (!isClean(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `(n+${offset})^2`,
  };
}

function cubes(rng: ReturnType<typeof createPRNG>): SeqResult {
  const offset = rng.nextInt(1, 4);
  const len = 5;
  const seq: number[] = [];
  for (let i = 0; i < len + 1; i++) {
    const b = offset + i;
    seq.push(b * b * b);
  }
  if (!isClean(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `(n+${offset})^3`,
  };
}

function simpleAddition(rng: ReturnType<typeof createPRNG>): SeqResult {
  // Each term = previous + increasing step: +1, +2, +3, ...
  const start = rng.nextInt(1, 10);
  const baseStep = rng.nextInt(1, 4);
  const len = 6;
  const seq: number[] = [start];
  for (let i = 1; i <= len; i++) {
    seq.push(seq[i - 1] + baseStep * i);
  }
  if (!isClean(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `+${baseStep}*n increments`,
  };
}

const EASY_GENS = [arithmetic, geometric, squares, cubes, simpleAddition];

// ---------- MEDIUM generators ----------

function alternatingOps(rng: ReturnType<typeof createPRNG>): SeqResult {
  const start = rng.nextInt(1, 10);
  const addVal = rng.nextInt(2, 8);
  const mulVal = rng.nextInt(2, 4);
  const len = 7;
  const seq: number[] = [start];
  for (let i = 1; i <= len; i++) {
    if (i % 2 === 1) seq.push(seq[i - 1] + addVal);
    else seq.push(seq[i - 1] * mulVal);
  }
  if (!isClean(seq) || !hasVariation(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `alt +${addVal}, *${mulVal}`,
  };
}

function secondOrderArithmetic(rng: ReturnType<typeof createPRNG>): SeqResult {
  // Differences increase by a constant (quadratic-ish but easy version)
  const start = rng.nextInt(1, 10);
  const d0 = rng.nextInt(1, 5);
  const dd = rng.nextInt(1, 4);
  const len = 6;
  const seq: number[] = [start];
  let diff = d0;
  for (let i = 1; i <= len; i++) {
    seq.push(seq[i - 1] + diff);
    diff += dd;
  }
  if (!isClean(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `2nd order d0=${d0} dd=${dd}`,
  };
}

function interleaved(rng: ReturnType<typeof createPRNG>): SeqResult {
  // Odd-indexed positions follow rule A, even-indexed follow rule B
  const a0 = rng.nextInt(1, 10);
  const b0 = rng.nextInt(10, 30);
  const da = rng.nextInt(2, 6);
  const db = rng.nextInt(-5, -1);
  const len = 7; // must be odd so answer belongs to even-indexed sub-seq
  const seq: number[] = [];
  let ai = a0,
    bi = b0;
  for (let i = 0; i < len + 1; i++) {
    if (i % 2 === 0) {
      seq.push(ai);
      ai += da;
    } else {
      seq.push(bi);
      bi += db;
    }
  }
  if (!isClean(seq) || !hasVariation(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `interleaved +${da}/+${db}`,
  };
}

function fibLike(rng: ReturnType<typeof createPRNG>): SeqResult {
  const a = rng.nextInt(1, 6);
  const b = rng.nextInt(1, 6);
  const len = 7;
  const seq: number[] = [a, b];
  for (let i = 2; i <= len; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  if (!isClean(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `fib start ${a},${b}`,
  };
}

const MEDIUM_GENS = [
  alternatingOps,
  secondOrderArithmetic,
  interleaved,
  fibLike,
];

// ---------- HARD generators ----------

function quadratic(rng: ReturnType<typeof createPRNG>): SeqResult {
  const a = rng.nextInt(1, 4);
  const b = rng.nextInt(-3, 5);
  const c = rng.nextInt(-5, 10);
  const startN = rng.nextInt(0, 3);
  const len = 6;
  const seq: number[] = [];
  for (let i = 0; i < len + 1; i++) {
    const n = startN + i;
    seq.push(a * n * n + b * n + c);
  }
  if (!isClean(seq) || !hasVariation(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `${a}n^2+${b}n+${c}`,
  };
}

function tribonacci(rng: ReturnType<typeof createPRNG>): SeqResult {
  const a = rng.nextInt(0, 4);
  const b = rng.nextInt(0, 4);
  const c = rng.nextInt(1, 5);
  const len = 7;
  const seq: number[] = [a, b, c];
  for (let i = 3; i <= len; i++) {
    seq.push(seq[i - 1] + seq[i - 2] + seq[i - 3]);
  }
  if (!isClean(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `tribonacci ${a},${b},${c}`,
  };
}

function primeBased(rng: ReturnType<typeof createPRNG>): SeqResult {
  const startIdx = rng.nextInt(0, 8);
  const len = 6;
  if (startIdx + len >= PRIMES.length) return null;
  const seq = PRIMES.slice(startIdx, startIdx + len + 1);
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `primes from idx ${startIdx}`,
  };
}

function primeGaps(rng: ReturnType<typeof createPRNG>): SeqResult {
  // Sequence of gaps between consecutive primes
  const startIdx = rng.nextInt(0, 10);
  const len = 6;
  if (startIdx + len + 1 >= PRIMES.length) return null;
  const seq: number[] = [];
  for (let i = 0; i < len + 1; i++) {
    seq.push(PRIMES[startIdx + i + 1] - PRIMES[startIdx + i]);
  }
  if (!hasVariation(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `prime gaps from idx ${startIdx}`,
  };
}

function multiOp(rng: ReturnType<typeof createPRNG>): SeqResult {
  // 3 alternating operations
  const ops: Array<(x: number) => number> = [];
  const labels: string[] = [];

  const addVal = rng.nextInt(2, 8);
  ops.push((x) => x + addVal);
  labels.push(`+${addVal}`);

  const mulVal = rng.nextInt(2, 3);
  ops.push((x) => x * mulVal);
  labels.push(`*${mulVal}`);

  const subVal = rng.nextInt(1, 6);
  ops.push((x) => x - subVal);
  labels.push(`-${subVal}`);

  const start = rng.nextInt(2, 8);
  const len = 7;
  const seq: number[] = [start];
  for (let i = 1; i <= len; i++) {
    seq.push(ops[(i - 1) % 3](seq[i - 1]));
  }
  if (!isClean(seq) || !hasVariation(seq)) return null;
  if (seq.some((v) => v <= 0)) return null; // keep positive for readability
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `multi-op ${labels.join(',')}`,
  };
}

function cubicPoly(rng: ReturnType<typeof createPRNG>): SeqResult {
  const a = rng.nextInt(1, 3);
  const b = rng.nextInt(-2, 3);
  const c = rng.nextInt(-3, 4);
  const d = rng.nextInt(-5, 10);
  const len = 6;
  const seq: number[] = [];
  for (let i = 0; i < len + 1; i++) {
    seq.push(a * i * i * i + b * i * i + c * i + d);
  }
  if (!isClean(seq) || !hasVariation(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `${a}n^3+${b}n^2+${c}n+${d}`,
  };
}

function cumulativePrimes(rng: ReturnType<typeof createPRNG>): SeqResult {
  // Cumulative sum of primes
  const startIdx = rng.nextInt(0, 5);
  const len = 6;
  if (startIdx + len >= PRIMES.length) return null;
  const seq: number[] = [];
  let sum = 0;
  for (let i = 0; i < len + 1; i++) {
    sum += PRIMES[startIdx + i];
    seq.push(sum);
  }
  if (!isClean(seq)) return null;
  return {
    shown: seq.slice(0, len),
    answer: seq[len],
    rule: `cumulative primes from idx ${startIdx}`,
  };
}

const HARD_GENS = [
  quadratic,
  tribonacci,
  primeBased,
  primeGaps,
  multiOp,
  cubicPoly,
  cumulativePrimes,
];

// ── Distractor generation ──────────────────────────────────────────────────

function generateDistractors(
  rng: ReturnType<typeof createPRNG>,
  answer: number,
  shown: number[]
): number[] {
  const distractorSet = new Set<number>();
  distractorSet.add(answer);

  const lastShown = shown[shown.length - 1];
  const secondLast = shown.length > 1 ? shown[shown.length - 2] : lastShown;
  const lastDiff = lastShown - secondLast;

  // Common mistake: off-by-one
  const candidates = [
    answer + 1,
    answer - 1,
    answer + 2,
    answer - 2,
    // Wrong continuation: add last difference to last shown
    lastShown + lastDiff,
    // Double the difference
    lastShown + lastDiff * 2,
    // Apply difference to answer
    answer + lastDiff,
    // Nearby multiples
    answer + Math.max(1, Math.abs(Math.round(answer * 0.1))),
    answer - Math.max(1, Math.abs(Math.round(answer * 0.1))),
    // Other plausible values
    lastShown + (answer - lastShown) + 1,
    lastShown + (answer - lastShown) - 1,
    Math.round(answer * 1.5),
    Math.round(answer * 0.75),
  ];

  for (const c of candidates) {
    if (distractorSet.size >= 6) break;
    if (
      !distractorSet.has(c) &&
      Number.isFinite(c) &&
      Number.isInteger(c) &&
      Math.abs(c) < 10000
    ) {
      distractorSet.add(c);
    }
  }

  // Fill remaining with random nearby values
  let attempts = 0;
  while (distractorSet.size < 6 && attempts < 50) {
    attempts++;
    const spread = Math.max(5, Math.abs(answer) * 0.2);
    const d = answer + rng.nextInt(-Math.ceil(spread), Math.ceil(spread) + 1);
    if (
      !distractorSet.has(d) &&
      Number.isFinite(d) &&
      Number.isInteger(d) &&
      Math.abs(d) < 10000
    ) {
      distractorSet.add(d);
    }
  }

  // Remove the answer from the set, return 5 distractors
  distractorSet.delete(answer);
  const arr = Array.from(distractorSet);
  return arr.slice(0, 5);
}

// ── Main generator ─────────────────────────────────────────────────────────

function generateNumericalQuestion(
  seed: number,
  questionIndex: number
): Question {
  const rng = createPRNG(seed * 31337 + questionIndex * 7919);

  let difficulty: 'easy' | 'medium' | 'hard';
  let generators: Array<(r: ReturnType<typeof createPRNG>) => SeqResult>;

  if (questionIndex < 10) {
    difficulty = 'easy';
    generators = EASY_GENS;
  } else if (questionIndex < 22) {
    difficulty = 'medium';
    generators = MEDIUM_GENS;
  } else {
    difficulty = 'hard';
    generators = HARD_GENS;
  }

  // Try to generate a valid sequence, cycling through generators
  let result: SeqResult = null;
  let attempts = 0;
  const maxAttempts = 50;

  while (!result && attempts < maxAttempts) {
    const genIdx = rng.nextInt(0, generators.length);
    result = generators[genIdx](rng);
    attempts++;
  }

  // Fallback: arithmetic sequence that always works
  if (!result) {
    const start = rng.nextInt(1, 20);
    const diff = rng.nextInt(2, 10);
    const len = 6;
    const seq: number[] = [];
    for (let i = 0; i < len + 1; i++) seq.push(start + diff * i);
    result = { shown: seq.slice(0, len), answer: seq[len], rule: `fallback +${diff}` };
  }

  const { shown, answer, rule } = result;

  // Build options: answer + 5 distractors, shuffled
  const distractors = generateDistractors(rng, answer, shown);
  const options = [answer, ...distractors];
  rng.shuffle(options);

  const correctIndex = options.indexOf(answer);

  const data: NumericalQuestionData = {
    sequence: shown,
    difficulty,
    ruleDescription: rule,
  };

  return {
    data,
    options,
    correctIndex,
  };
}

// ── Test definition ────────────────────────────────────────────────────────

const numericalTest: TestType = {
  slug: 'numerical',
  name: 'Number Sequences',
  shortName: 'nm',
  description:
    'Find the pattern in number sequences using arithmetic, geometric, and polynomial rules.',
  icon: '\u2211',
  totalQuestions: 30,
  learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
  generateQuestion: generateNumericalQuestion,
  renderQuestion() {
    return null;
  },
  renderOption() {
    return null;
  },
};

export default numericalTest;
