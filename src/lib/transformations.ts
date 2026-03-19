import {
  CellState, TransformType,
  SHAPES, ROTATIONS, SCALES, COLORS, COUNTS, POSITIONS, OVERLAYS
} from './constants';

// Each transform mutates exactly ONE dimension of CellState
// All transforms are pure functions that return a new CellState

export function applyTransform(
  cell: CellState,
  transform: TransformType,
  step: number
): CellState {
  const next = { ...cell };

  switch (transform) {
    case 'rotate': {
      const idx = ROTATIONS.indexOf(cell.rotation);
      next.rotation = ROTATIONS[(idx + step) % ROTATIONS.length];
      break;
    }
    case 'reflect': {
      // Toggle reflection each step
      next.reflected = step % 2 === 1 ? !cell.reflected : cell.reflected;
      break;
    }
    case 'scale': {
      const idx = SCALES.indexOf(cell.scale);
      next.scale = SCALES[(idx + step) % SCALES.length];
      break;
    }
    case 'colorShift': {
      next.fill = (cell.fill + step) % COLORS.length;
      break;
    }
    case 'shapeSwap': {
      const idx = SHAPES.indexOf(cell.shape);
      next.shape = SHAPES[(idx + step) % SHAPES.length];
      break;
    }
    case 'countChange': {
      // Cycle through counts: 1->2->3->4->1...
      const idx = COUNTS.indexOf(cell.count as 1 | 2 | 3 | 4);
      const countIdx = idx === -1 ? 0 : idx;
      next.count = COUNTS[(countIdx + step) % COUNTS.length];
      break;
    }
    case 'overlay': {
      const idx = OVERLAYS.indexOf(cell.overlay);
      next.overlay = OVERLAYS[(idx + step) % OVERLAYS.length];
      break;
    }
    case 'positionShift': {
      const posIdx = POSITIONS.findIndex(
        p => p[0] === cell.position[0] && p[1] === cell.position[1]
      );
      const newIdx = (posIdx === -1 ? 0 : posIdx + step) % POSITIONS.length;
      const pos = POSITIONS[newIdx >= 0 ? newIdx : newIdx + POSITIONS.length];
      next.position = [pos[0], pos[1]];
      break;
    }
  }

  return next;
}

// Get all possible values for a dimension (for distractor generation)
export function getDimensionValues(transform: TransformType): number {
  switch (transform) {
    case 'rotate': return ROTATIONS.length;       // 4
    case 'reflect': return 2;                      // true/false
    case 'scale': return SCALES.length;            // 3
    case 'colorShift': return COLORS.length;       // 6
    case 'shapeSwap': return SHAPES.length;        // 6
    case 'countChange': return COUNTS.length;      // 4
    case 'overlay': return OVERLAYS.length;        // 4
    case 'positionShift': return POSITIONS.length;  // 9
  }
}

// Apply a wrong value to one dimension for distractor generation
export function applyWrongValue(
  cell: CellState,
  transform: TransformType,
  wrongIndex: number
): CellState {
  const next = { ...cell };

  switch (transform) {
    case 'rotate':
      next.rotation = ROTATIONS[wrongIndex % ROTATIONS.length];
      break;
    case 'reflect':
      next.reflected = !cell.reflected;
      break;
    case 'scale':
      next.scale = SCALES[wrongIndex % SCALES.length];
      break;
    case 'colorShift':
      next.fill = wrongIndex % COLORS.length;
      break;
    case 'shapeSwap':
      next.shape = SHAPES[wrongIndex % SHAPES.length];
      break;
    case 'countChange':
      next.count = COUNTS[wrongIndex % COUNTS.length];
      break;
    case 'overlay':
      next.overlay = OVERLAYS[wrongIndex % OVERLAYS.length];
      break;
    case 'positionShift': {
      const pos = POSITIONS[wrongIndex % POSITIONS.length];
      next.position = [pos[0], pos[1]];
      break;
    }
  }

  return next;
}

// Get the current value index for a dimension
export function getDimensionIndex(cell: CellState, transform: TransformType): number {
  switch (transform) {
    case 'rotate': return ROTATIONS.indexOf(cell.rotation);
    case 'reflect': return cell.reflected ? 1 : 0;
    case 'scale': return SCALES.indexOf(cell.scale);
    case 'colorShift': return cell.fill;
    case 'shapeSwap': return SHAPES.indexOf(cell.shape);
    case 'countChange': return COUNTS.indexOf(cell.count as 1 | 2 | 3 | 4);
    case 'overlay': return OVERLAYS.indexOf(cell.overlay);
    case 'positionShift': return POSITIONS.findIndex(
      p => p[0] === cell.position[0] && p[1] === cell.position[1]
    );
  }
}

// All available transform types
export const ALL_TRANSFORMS: TransformType[] = [
  'rotate', 'reflect', 'scale', 'colorShift',
  'shapeSwap', 'countChange', 'overlay', 'positionShift'
];
