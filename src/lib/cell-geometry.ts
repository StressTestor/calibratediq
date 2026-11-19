import { type CellState, type Scale } from './constants';

export const CELL_VIEW_SIZE = 100;

const SCALE_FACTORS: Record<Scale, number> = {
  small: 0.6,
  medium: 0.8,
  large: 1.0,
};

export type Point = [number, number];

export type Primitive =
  | { kind: 'circle'; cx: number; cy: number; r: number }
  | { kind: 'polygon'; points: Point[] };

function shapePrimitive(shape: CellState['shape'], cx: number, cy: number, r: number): Primitive {
  switch (shape) {
    case 'square': {
      const half = r * 0.85;
      return {
        kind: 'polygon',
        points: [
          [cx - half, cy - half],
          [cx + half, cy - half],
          [cx + half, cy + half],
          [cx - half, cy + half],
        ],
      };
    }
    case 'triangle':
      return {
        kind: 'polygon',
        points: [
          [cx, cy - r],
          [cx - r * 0.866, cy + r * 0.5],
          [cx + r * 0.866, cy + r * 0.5],
        ],
      };
    case 'diamond':
      return {
        kind: 'polygon',
        points: [
          [cx, cy - r],
          [cx + r * 0.7, cy],
          [cx, cy + r],
          [cx - r * 0.7, cy],
        ],
      };
    case 'star': {
      const innerR = r * 0.4;
      const points: Point[] = [];
      for (let i = 0; i < 5; i++) {
        const outerAngle = -Math.PI / 2 + (2 * Math.PI * i) / 5;
        points.push([cx + r * Math.cos(outerAngle), cy + r * Math.sin(outerAngle)]);
        const innerAngle = outerAngle + Math.PI / 5;
        points.push([cx + innerR * Math.cos(innerAngle), cy + innerR * Math.sin(innerAngle)]);
      }
      return { kind: 'polygon', points };
    }
    case 'hexagon': {
      const points: Point[] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
      }
      return { kind: 'polygon', points };
    }
    case 'circle':
    default:
      return { kind: 'circle', cx, cy, r };
  }
}

function elementCenters(count: number, cx: number, cy: number, spacing: number): Point[] {
  switch (count) {
    case 2:
      return [[cx - spacing, cy], [cx + spacing, cy]];
    case 3:
      return [
        [cx, cy - spacing * 0.7],
        [cx - spacing, cy + spacing * 0.5],
        [cx + spacing, cy + spacing * 0.5],
      ];
    case 4:
      return [
        [cx - spacing, cy - spacing],
        [cx + spacing, cy - spacing],
        [cx - spacing, cy + spacing],
        [cx + spacing, cy + spacing],
      ];
    case 1:
    default:
      return [[cx, cy]];
  }
}

/** Untransformed primitives for a cell, in the 100x100 view box. */
export function cellPrimitives(cell: CellState): Primitive[] {
  const baseR = CELL_VIEW_SIZE * 0.35;
  const countScale = cell.count === 1 ? 1 : cell.count === 2 ? 0.65 : cell.count === 3 ? 0.55 : 0.48;
  const r = baseR * SCALE_FACTORS[cell.scale] * countScale;
  const spacing = CELL_VIEW_SIZE * 0.22;

  const centerX = CELL_VIEW_SIZE / 2 + (cell.position[1] - 1) * CELL_VIEW_SIZE * 0.15;
  const centerY = CELL_VIEW_SIZE / 2 + (cell.position[0] - 1) * CELL_VIEW_SIZE * 0.15;

  return elementCenters(cell.count, centerX, centerY, spacing).map(([x, y]) =>
    shapePrimitive(cell.shape, x, y, r),
  );
}

/** SVG transform for the cell's reflection and rotation. */
export function cellTransform(cell: CellState): string {
  const transforms: string[] = [];
  if (cell.reflected) {
    transforms.push(`translate(${CELL_VIEW_SIZE}, 0) scale(-1, 1)`);
  }
  if (cell.rotation !== 0) {
    transforms.push(`rotate(${cell.rotation}, ${CELL_VIEW_SIZE / 2}, ${CELL_VIEW_SIZE / 2})`);
  }
  return transforms.join(' ');
}

// Applies cellTransform to a point: SVG applies the rightmost transform first,
// so rotate, then reflect.
function transformPoint(cell: CellState, [x, y]: Point): Point {
  const c = CELL_VIEW_SIZE / 2;
  const dx = x - c;
  const dy = y - c;
  const quarterTurns = (cell.rotation / 90) % 4;
  const cos = [1, 0, -1, 0][quarterTurns];
  const sin = [0, 1, 0, -1][quarterTurns];
  let px = c + dx * cos - dy * sin;
  const py = c + dx * sin + dy * cos;
  if (cell.reflected) px = CELL_VIEW_SIZE - px;
  return [px, py];
}

function fmt(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return (rounded === 0 ? 0 : rounded).toFixed(2);
}

function fmtPoint([x, y]: Point): string {
  return `${fmt(x)},${fmt(y)}`;
}

/**
 * Key describing what a cell looks like once rendered. Two cells with the same
 * visual key are indistinguishable on screen even if their CellState differs
 * (e.g. a rotated circle, or a reflected pair of diamonds).
 */
export function visualKey(cell: CellState): string {
  const primitives = cellPrimitives(cell).map(p => {
    if (p.kind === 'circle') {
      return `c:${fmtPoint(transformPoint(cell, [p.cx, p.cy]))}:${fmt(p.r)}`;
    }
    const pts = p.points.map(pt => fmtPoint(transformPoint(cell, pt))).sort();
    return `p:${pts.join(' ')}`;
  });
  primitives.sort();
  return `${cell.fill}|${cell.overlay}|${primitives.join(';')}`;
}
