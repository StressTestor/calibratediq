import { describe, it, expect } from 'vitest';
import { visualKey } from '@/lib/cell-geometry';
import { generateTest } from '@/lib/puzzle-generator';
import { CellState } from '@/lib/constants';

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

describe('matrix options are visually distinct', () => {
  it('no two options in any puzzle render identically (200 seeds x 30 questions)', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const puzzles = generateTest(seed * 104729);
      puzzles.forEach((puzzle, q) => {
        const keys = puzzle.options.map(visualKey);
        expect(new Set(keys).size, `seed ${seed * 104729}, q=${q}`).toBe(6);
      });
    }
  });
});
