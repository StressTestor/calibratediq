import { describe, it, expect } from 'vitest';
import { cellPrimitives, transformPoint, visualKey, type Point } from '@/lib/cell-geometry';
import { generatePuzzle, generateTest } from '@/lib/puzzle-generator';
import { decodeSeed } from '@/lib/prng';
import { CellState, COUNTS, POSITIONS, ROTATIONS, SCALES, SHAPES } from '@/lib/constants';

const EPS = 1e-6;

function near(a: Point, b: Point): boolean {
  return Math.abs(a[0] - b[0]) < EPS && Math.abs(a[1] - b[1]) < EPS;
}

function sameSet(a: Point[], b: Point[]): boolean {
  return a.length === b.length && a.every(p => b.some(q => near(p, q)));
}

// Tolerance-based check, independent of visualKey's string rounding.
function rendersIdentically(a: CellState, b: CellState): boolean {
  if (a.fill !== b.fill || a.overlay !== b.overlay) return false;
  const shapes = (cell: CellState): Point[][] =>
    cellPrimitives(cell).map(p =>
      p.kind === 'circle'
        ? [transformPoint(cell, [p.cx, p.cy]), [p.r, -1]]
        : p.points.map(pt => transformPoint(cell, pt)),
    );
  const sa = shapes(a);
  const sb = shapes(b);
  return sa.length === sb.length && sa.every(x => sb.some(y => sameSet(x, y)));
}

const base: CellState = {
  shape: 'circle',
  rotation: 0,
  fill: 0,
  count: 1,
  scale: 'medium',
  position: [1, 1],
  overlay: 'none',
  reflected: false,
};

describe('visualKey', () => {
  it('treats rotations and reflections of symmetric figures as identical', () => {
    expect(visualKey({ ...base, rotation: 90 })).toBe(visualKey(base));
    expect(visualKey({ ...base, reflected: true })).toBe(visualKey(base));

    const diamonds: CellState = { ...base, shape: 'diamond', count: 2 };
    expect(visualKey({ ...diamonds, rotation: 270 })).toBe(visualKey({ ...diamonds, rotation: 90 }));
    expect(visualKey({ ...diamonds, rotation: 90, reflected: true })).toBe(
      visualKey({ ...diamonds, rotation: 90 }),
    );
    expect(visualKey({ ...diamonds, rotation: 180 })).toBe(visualKey(diamonds));
  });

  it('distinguishes visibly different cells', () => {
    const triangle: CellState = { ...base, shape: 'triangle' };
    expect(visualKey({ ...triangle, rotation: 90 })).not.toBe(visualKey(triangle));
    expect(visualKey({ ...base, fill: 1 })).not.toBe(visualKey(base));
    expect(visualKey({ ...base, scale: 'large' })).not.toBe(visualKey(base));
    expect(visualKey({ ...base, overlay: 'and' })).not.toBe(visualKey(base));
    expect(visualKey({ ...base, position: [0, 0] })).not.toBe(visualKey(base));
  });
});

describe('visualKey matches rendered geometry', () => {
  it('agrees with a tolerance-based comparison for every rotation/reflection pair', () => {
    for (const shape of SHAPES)
      for (const count of COUNTS)
        for (const scale of SCALES)
          for (const position of POSITIONS) {
            const variants: CellState[] = [];
            for (const rotation of ROTATIONS)
              for (const reflected of [false, true])
                variants.push({ ...base, shape, count, scale, position: [...position], rotation, reflected });
            for (let i = 0; i < variants.length; i++)
              for (let j = i + 1; j < variants.length; j++) {
                const a = variants[i];
                const b = variants[j];
                expect(visualKey(a) === visualKey(b), JSON.stringify([a, b])).toBe(rendersIdentically(a, b));
              }
          }
  });
});

describe('matrix options are visually distinct', () => {
  it('seed abc123 question 13 has six distinct options', () => {
    const { options } = generatePuzzle(decodeSeed('abc123'), 12);
    for (let i = 0; i < options.length; i++)
      for (let j = i + 1; j < options.length; j++)
        expect(rendersIdentically(options[i], options[j]), `options ${i},${j}`).toBe(false);
  });

  it('no two options in any puzzle render identically (200 seeds x 30 questions)', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const puzzles = generateTest(seed * 104729);
      puzzles.forEach((puzzle, q) => {
        const { options } = puzzle;
        for (let i = 0; i < options.length; i++)
          for (let j = i + 1; j < options.length; j++)
            expect(rendersIdentically(options[i], options[j]), `seed ${seed * 104729}, q=${q}`).toBe(false);
      });
    }
  });
});
