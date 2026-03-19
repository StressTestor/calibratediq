import { describe, it, expect } from 'vitest';
import { generatePuzzle, generateTest, cellKey, cellsEqual } from '@/lib/puzzle-generator';
import { CellState, TransformType } from '@/lib/constants';
import { getDimensionIndex, ALL_TRANSFORMS } from '@/lib/transformations';

// Helper: count how many dimensions differ between two cells
function countDifferingDimensions(a: CellState, b: CellState): number {
  let diffs = 0;
  if (a.shape !== b.shape) diffs++;
  if (a.rotation !== b.rotation) diffs++;
  if (a.fill !== b.fill) diffs++;
  if (a.count !== b.count) diffs++;
  if (a.scale !== b.scale) diffs++;
  if (a.position[0] !== b.position[0] || a.position[1] !== b.position[1]) diffs++;
  if (a.overlay !== b.overlay) diffs++;
  if (a.reflected !== b.reflected) diffs++;
  return diffs;
}

// Helper: identify which dimensions differ
function differingDimensions(a: CellState, b: CellState): string[] {
  const diffs: string[] = [];
  if (a.shape !== b.shape) diffs.push('shape');
  if (a.rotation !== b.rotation) diffs.push('rotation');
  if (a.fill !== b.fill) diffs.push('fill');
  if (a.count !== b.count) diffs.push('count');
  if (a.scale !== b.scale) diffs.push('scale');
  if (a.position[0] !== b.position[0] || a.position[1] !== b.position[1]) diffs.push('position');
  if (a.overlay !== b.overlay) diffs.push('overlay');
  if (a.reflected !== b.reflected) diffs.push('reflected');
  return diffs;
}

describe('generatePuzzle', () => {
  it('returns correct grid size per difficulty (2x2 for easy, 3x3 for medium/hard)', () => {
    // Easy: question 0-9
    const easy = generatePuzzle(42, 0);
    expect(easy.gridSize).toBe(2);
    expect(easy.grid.length).toBe(2);
    expect(easy.grid[0].length).toBe(2);

    // Medium: question 10-21
    const medium = generatePuzzle(42, 10);
    expect(medium.gridSize).toBe(3);
    expect(medium.grid.length).toBe(3);
    expect(medium.grid[0].length).toBe(3);

    // Hard: question 22-29
    const hard = generatePuzzle(42, 22);
    expect(hard.gridSize).toBe(3);
    expect(hard.grid.length).toBe(3);
    expect(hard.grid[0].length).toBe(3);
  });

  it('returns exactly 6 options (1 answer + 5 distractors)', () => {
    for (let q = 0; q < 30; q++) {
      const puzzle = generatePuzzle(42, q);
      expect(puzzle.options.length).toBe(6);
      expect(puzzle.distractors.length).toBe(5);
    }
  });

  it('the correct answer IS in the options array at correctOptionIndex', () => {
    for (let q = 0; q < 30; q++) {
      const puzzle = generatePuzzle(42, q);
      const optionAtIndex = puzzle.options[puzzle.correctOptionIndex];
      expect(cellKey(optionAtIndex)).toBe(cellKey(puzzle.answer));
    }
  });

  it('each distractor differs from the answer (not equal to answer)', () => {
    for (let q = 0; q < 30; q++) {
      const puzzle = generatePuzzle(42, q);
      for (const distractor of puzzle.distractors) {
        expect(cellsEqual(distractor, puzzle.answer)).toBe(false);
      }
    }
  });

  it('all 5 distractors are unique (no duplicates)', () => {
    for (let q = 0; q < 30; q++) {
      const puzzle = generatePuzzle(42, q);
      const keys = puzzle.distractors.map(d => cellKey(d));
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(5);
    }
  });

  it('each distractor violates exactly 1 dimension compared to the answer', () => {
    for (let q = 0; q < 30; q++) {
      const puzzle = generatePuzzle(42, q);
      for (let d = 0; d < puzzle.distractors.length; d++) {
        const distractor = puzzle.distractors[d];
        const diffs = countDifferingDimensions(puzzle.answer, distractor);
        expect(
          diffs,
          `Puzzle q=${q}, distractor ${d}: expected exactly 1 differing dimension, got ${diffs}. ` +
          `Differing: [${differingDimensions(puzzle.answer, distractor).join(', ')}]`
        ).toBe(1);
      }
    }
  });
});

describe('generateTest determinism', () => {
  it('same seed produces identical puzzles', () => {
    const testA = generateTest(12345);
    const testB = generateTest(12345);

    expect(testA.length).toBe(30);
    expect(testB.length).toBe(30);

    for (let i = 0; i < 30; i++) {
      expect(cellKey(testA[i].answer)).toBe(cellKey(testB[i].answer));
      expect(testA[i].correctOptionIndex).toBe(testB[i].correctOptionIndex);
      expect(testA[i].options.map(o => cellKey(o))).toEqual(
        testB[i].options.map(o => cellKey(o))
      );
    }
  });

  it('different seeds produce different puzzles', () => {
    const testA = generateTest(11111);
    const testB = generateTest(99999);

    // At least some puzzles should differ
    let differences = 0;
    for (let i = 0; i < 30; i++) {
      if (cellKey(testA[i].answer) !== cellKey(testB[i].answer)) {
        differences++;
      }
    }
    expect(differences).toBeGreaterThan(0);
  });
});

describe('full 30-puzzle validation across 5 seeds', () => {
  const seeds = [1, 42, 1000, 777777, 4294967295];

  for (const seed of seeds) {
    it(`validates all 30 puzzles for seed ${seed}`, () => {
      const puzzles = generateTest(seed);
      expect(puzzles.length).toBe(30);

      for (let q = 0; q < 30; q++) {
        const puzzle = puzzles[q];

        // Grid size matches difficulty
        if (q < 10) {
          expect(puzzle.gridSize).toBe(2);
        } else {
          expect(puzzle.gridSize).toBe(3);
        }

        // 6 options, 5 distractors
        expect(puzzle.options.length).toBe(6);
        expect(puzzle.distractors.length).toBe(5);

        // Answer is in options at correct index
        expect(cellKey(puzzle.options[puzzle.correctOptionIndex])).toBe(
          cellKey(puzzle.answer)
        );

        // All distractors differ from answer
        for (const distractor of puzzle.distractors) {
          expect(cellsEqual(distractor, puzzle.answer)).toBe(false);
        }

        // All distractors are unique
        const keys = puzzle.distractors.map(d => cellKey(d));
        expect(new Set(keys).size).toBe(5);

        // Each distractor differs in exactly 1 dimension
        for (let d = 0; d < puzzle.distractors.length; d++) {
          const diffs = countDifferingDimensions(puzzle.answer, puzzle.distractors[d]);
          expect(
            diffs,
            `Seed ${seed}, q=${q}, distractor ${d}: expected 1 diff, got ${diffs}. ` +
            `Differing: [${differingDimensions(puzzle.answer, puzzle.distractors[d]).join(', ')}]`
          ).toBe(1);
        }
      }
    });
  }
});
