import { createPRNG } from './prng';
import {
  CellState, TransformType, getDifficulty,
  SHAPES, ROTATIONS, SCALES, COLORS, COUNTS, POSITIONS,
  TOTAL_QUESTIONS
} from './constants';
import {
  applyTransform, ALL_TRANSFORMS,
  getDimensionIndex, getDimensionValues, applyWrongValue
} from './transformations';

export interface Puzzle {
  grid: (CellState | null)[][]; // null = the missing cell (answer position)
  answer: CellState;
  distractors: CellState[];
  options: CellState[]; // answer + distractors shuffled
  correctOptionIndex: number;
  gridSize: 2 | 3;
  transforms: TransformType[];
  difficulty: string;
}

// Generate a random base cell state
function randomCell(prng: ReturnType<typeof createPRNG>): CellState {
  return {
    shape: SHAPES[prng.nextInt(0, SHAPES.length)],
    rotation: ROTATIONS[prng.nextInt(0, ROTATIONS.length)],
    fill: prng.nextInt(0, COLORS.length),
    count: COUNTS[prng.nextInt(0, COUNTS.length)],
    scale: SCALES[prng.nextInt(0, SCALES.length)],
    position: [POSITIONS[4][0], POSITIONS[4][1]], // center by default
    overlay: 'none',
    reflected: false,
  };
}

// Generate a single puzzle
export function generatePuzzle(
  seed: number,
  questionIndex: number
): Puzzle {
  // Create a question-specific PRNG by combining seed and question index
  const prng = createPRNG(seed * 31 + questionIndex * 7919);

  const difficulty = getDifficulty(questionIndex);
  const { gridSize, transformCount } = difficulty;

  // Select transforms for this puzzle
  const selectedTransforms = prng.pick([...ALL_TRANSFORMS], transformCount);

  // Generate base cell (top-left corner)
  const baseCell = randomCell(prng);

  // Build the grid by applying transforms across rows and columns
  const grid: CellState[][] = [];

  for (let row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (let col = 0; col < gridSize; col++) {
      let cell = { ...baseCell };

      // Apply transforms based on position
      // Row transforms: apply transform step = row
      // Column transforms: apply transform step = col
      for (let t = 0; t < selectedTransforms.length; t++) {
        const transform = selectedTransforms[t];
        if (t % 2 === 0) {
          // Even-indexed transforms vary by row
          cell = applyTransform(cell, transform, row);
        } else {
          // Odd-indexed transforms vary by column
          cell = applyTransform(cell, transform, col);
        }
      }

      // For single transform, apply by both row and col combined
      if (selectedTransforms.length === 1) {
        cell = { ...baseCell };
        cell = applyTransform(cell, selectedTransforms[0], row + col);
      }

      grid[row][col] = cell;
    }
  }

  // Remove the bottom-right cell as the answer
  const answerRow = gridSize - 1;
  const answerCol = gridSize - 1;
  const answer = grid[answerRow][answerCol];

  // Generate distractors
  const distractors = generateDistractors(answer, selectedTransforms, prng);

  // Create options array with answer + distractors
  const options = [answer, ...distractors];
  prng.shuffle(options);
  const correctOptionIndex = options.findIndex(o => cellsEqual(o, answer));

  // Replace answer cell with null in grid
  const gridWithHole: (CellState | null)[][] = grid.map((row, ri) =>
    row.map((cell, ci) => (ri === answerRow && ci === answerCol ? null : cell))
  );

  return {
    grid: gridWithHole,
    answer,
    distractors,
    options,
    correctOptionIndex,
    gridSize,
    transforms: selectedTransforms,
    difficulty: questionIndex < 10 ? 'easy' : questionIndex < 22 ? 'medium' : 'hard',
  };
}

// Generate 5 distractors, each violating exactly 1 rule
function generateDistractors(
  answer: CellState,
  transforms: TransformType[],
  prng: ReturnType<typeof createPRNG>
): CellState[] {
  const distractors: CellState[] = [];
  const seen = new Set<string>();
  seen.add(cellKey(answer));

  // Strategy: cycle through transforms, apply wrong values
  // For each transform, generate wrong values for that dimension
  const allTransforms = transforms.length > 0 ? transforms : ALL_TRANSFORMS.slice(0, 2);

  let attempts = 0;
  let transformIdx = 0;

  while (distractors.length < 5 && attempts < 50) {
    const transform = allTransforms[transformIdx % allTransforms.length];
    const currentIdx = getDimensionIndex(answer, transform);
    const numValues = getDimensionValues(transform);

    // Try a wrong value for this dimension
    const wrongIdx = (currentIdx + 1 + prng.nextInt(0, numValues - 1)) % numValues;

    if (wrongIdx !== currentIdx) {
      const distractor = applyWrongValue(answer, transform, wrongIdx);
      const key = cellKey(distractor);

      if (!seen.has(key)) {
        seen.add(key);
        distractors.push(distractor);
      }
    }

    transformIdx++;
    attempts++;
  }

  // If we still need more distractors, use additional transforms
  if (distractors.length < 5) {
    for (const transform of ALL_TRANSFORMS) {
      if (distractors.length >= 5) break;
      const currentIdx = getDimensionIndex(answer, transform);
      const numValues = getDimensionValues(transform);

      for (let offset = 1; offset < numValues && distractors.length < 5; offset++) {
        const wrongIdx = (currentIdx + offset) % numValues;
        const distractor = applyWrongValue(answer, transform, wrongIdx);
        const key = cellKey(distractor);

        if (!seen.has(key)) {
          seen.add(key);
          distractors.push(distractor);
        }
      }
    }
  }

  return distractors;
}

// Compare two cell states
function cellsEqual(a: CellState, b: CellState): boolean {
  return cellKey(a) === cellKey(b);
}

// Create a unique string key for a cell state
function cellKey(cell: CellState): string {
  return `${cell.shape}|${cell.rotation}|${cell.fill}|${cell.count}|${cell.scale}|${cell.position[0]},${cell.position[1]}|${cell.overlay}|${cell.reflected}`;
}

// Generate all 30 puzzles for a test
export function generateTest(seed: number): Puzzle[] {
  const puzzles: Puzzle[] = [];
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    puzzles.push(generatePuzzle(seed, i));
  }
  return puzzles;
}

// Get the correct answer index for a specific question
export function getCorrectAnswer(seed: number, questionIndex: number): number {
  const puzzle = generatePuzzle(seed, questionIndex);
  return puzzle.correctOptionIndex;
}

// Export for testing
export { cellsEqual, cellKey, generateDistractors };
