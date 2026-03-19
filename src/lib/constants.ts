// Shape types available for puzzles
export const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'star', 'hexagon'] as const;
export type ShapeType = typeof SHAPES[number];

// Rotation values (degrees)
export const ROTATIONS = [0, 90, 180, 270] as const;
export type Rotation = typeof ROTATIONS[number];

// Scale values
export const SCALES = ['small', 'medium', 'large'] as const;
export type Scale = typeof SCALES[number];

// Color palette (works in both light and dark mode)
export const COLORS = [
  '#4A90D9', // blue
  '#D94A4A', // red
  '#4AD97A', // green
  '#D9A84A', // orange
  '#9B4AD9', // purple
  '#4AD9D9', // teal
] as const;

// Element counts
export const COUNTS = [1, 2, 3, 4] as const;

// Position grid (3x3 sub-grid positions within a cell)
export const POSITIONS = [
  [0, 0], [0, 1], [0, 2],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2],
] as const;

// Overlay operations
export const OVERLAYS = ['none', 'and', 'or', 'subtract'] as const;
export type OverlayOp = typeof OVERLAYS[number];

// Cell state - each property is an orthogonal dimension
export interface CellState {
  shape: ShapeType;
  rotation: Rotation;
  fill: number; // index into COLORS
  count: number; // 1-4
  scale: Scale;
  position: [number, number]; // sub-grid position
  overlay: OverlayOp;
  reflected: boolean;
}

// Transform types
export type TransformType =
  | 'rotate'
  | 'reflect'
  | 'scale'
  | 'colorShift'
  | 'shapeSwap'
  | 'countChange'
  | 'overlay'
  | 'positionShift';

// Difficulty configuration
export interface DifficultyConfig {
  gridSize: 2 | 3;
  transformCount: number;
  label: string;
}

export const DIFFICULTIES: Record<string, DifficultyConfig> = {
  easy: { gridSize: 2, transformCount: 1, label: 'Easy' },
  medium: { gridSize: 3, transformCount: 2, label: 'Medium' },
  hard: { gridSize: 3, transformCount: 3, label: 'Hard' },
};

// Question ranges per difficulty
export const QUESTION_RANGES = {
  easy: { start: 0, end: 10 },    // Q1-10
  medium: { start: 10, end: 22 }, // Q11-22
  hard: { start: 22, end: 30 },   // Q23-30
};

// Total number of questions in a test
export const TOTAL_QUESTIONS = 30;

export function getDifficulty(questionIndex: number): DifficultyConfig {
  if (questionIndex < 10) return DIFFICULTIES.easy;
  if (questionIndex < 22) return DIFFICULTIES.medium;
  return DIFFICULTIES.hard;
}
