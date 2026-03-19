import { describe, it, expect } from 'vitest';
import {
  applyTransform, applyWrongValue, getDimensionIndex, getDimensionValues,
  ALL_TRANSFORMS,
} from '@/lib/transformations';
import {
  CellState, TransformType,
  SHAPES, ROTATIONS, SCALES, COLORS, COUNTS, POSITIONS, OVERLAYS,
} from '@/lib/constants';

function makeBaseCell(): CellState {
  return {
    shape: 'circle',
    rotation: 0,
    fill: 0,
    count: 1,
    scale: 'small',
    position: [1, 1],
    overlay: 'none',
    reflected: false,
  };
}

// Dimensions to check for each transform type
const dimensionKeys: Record<TransformType, keyof CellState> = {
  rotate: 'rotation',
  reflect: 'reflected',
  scale: 'scale',
  colorShift: 'fill',
  shapeSwap: 'shape',
  countChange: 'count',
  overlay: 'overlay',
  positionShift: 'position',
};

function cellDimensionValue(cell: CellState, key: keyof CellState): string {
  const val = cell[key];
  if (Array.isArray(val)) return JSON.stringify(val);
  return String(val);
}

describe('applyTransform', () => {
  for (const transform of ALL_TRANSFORMS) {
    it(`${transform} modifies only its target dimension`, () => {
      const base = makeBaseCell();
      const transformed = applyTransform(base, transform, 1);

      const targetKey = dimensionKeys[transform];

      // All other dimensions should be unchanged
      for (const [t, key] of Object.entries(dimensionKeys)) {
        if (t === transform) continue;
        expect(
          cellDimensionValue(transformed, key),
          `${t} dimension (${key}) should not change when applying ${transform}`
        ).toBe(cellDimensionValue(base, key));
      }

      // The target dimension MIGHT change (depends on modular arithmetic)
      // With step=1 it should change for most transforms
    });
  }

  it('applyTransform with step=0 returns the same cell (identity)', () => {
    const base = makeBaseCell();
    for (const transform of ALL_TRANSFORMS) {
      const result = applyTransform(base, transform, 0);
      for (const key of Object.keys(dimensionKeys) as TransformType[]) {
        expect(
          cellDimensionValue(result, dimensionKeys[key]),
          `${key} should be unchanged with step=0 for ${transform}`
        ).toBe(cellDimensionValue(base, dimensionKeys[key]));
      }
    }
  });
});

describe('applyWrongValue', () => {
  it('produces a cell different from the original in exactly the target dimension', () => {
    const base = makeBaseCell();

    for (const transform of ALL_TRANSFORMS) {
      const currentIdx = getDimensionIndex(base, transform);
      const numValues = getDimensionValues(transform);
      // Pick a wrong index that differs from current
      const wrongIdx = (currentIdx + 1) % numValues;
      const wrong = applyWrongValue(base, transform, wrongIdx);

      const targetKey = dimensionKeys[transform];

      // Target dimension should differ
      expect(
        cellDimensionValue(wrong, targetKey),
        `${transform}: target dimension should differ`
      ).not.toBe(cellDimensionValue(base, targetKey));

      // All other dimensions should be unchanged
      for (const [t, key] of Object.entries(dimensionKeys)) {
        if (t === transform) continue;
        expect(
          cellDimensionValue(wrong, key as keyof CellState),
          `${transform}: ${t} dimension (${key}) should not change`
        ).toBe(cellDimensionValue(base, key as keyof CellState));
      }
    }
  });
});

describe('getDimensionIndex', () => {
  it('returns correct index for each dimension', () => {
    const base = makeBaseCell();
    expect(getDimensionIndex(base, 'rotate')).toBe(ROTATIONS.indexOf(0));
    expect(getDimensionIndex(base, 'reflect')).toBe(0); // false
    expect(getDimensionIndex(base, 'scale')).toBe(SCALES.indexOf('small'));
    expect(getDimensionIndex(base, 'colorShift')).toBe(0);
    expect(getDimensionIndex(base, 'shapeSwap')).toBe(SHAPES.indexOf('circle'));
    expect(getDimensionIndex(base, 'countChange')).toBe(COUNTS.indexOf(1));
    expect(getDimensionIndex(base, 'overlay')).toBe(OVERLAYS.indexOf('none'));
    expect(getDimensionIndex(base, 'positionShift')).toBe(
      POSITIONS.findIndex(p => p[0] === 1 && p[1] === 1)
    );
  });
});

describe('getDimensionValues', () => {
  it('returns the correct count for each transform type', () => {
    expect(getDimensionValues('rotate')).toBe(ROTATIONS.length);       // 4
    expect(getDimensionValues('reflect')).toBe(2);                      // true/false
    expect(getDimensionValues('scale')).toBe(SCALES.length);            // 3
    expect(getDimensionValues('colorShift')).toBe(COLORS.length);       // 6
    expect(getDimensionValues('shapeSwap')).toBe(SHAPES.length);        // 6
    expect(getDimensionValues('countChange')).toBe(COUNTS.length);      // 4
    expect(getDimensionValues('overlay')).toBe(OVERLAYS.length);        // 4
    expect(getDimensionValues('positionShift')).toBe(POSITIONS.length);  // 9
  });
});
