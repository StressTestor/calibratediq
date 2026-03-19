import { describe, it, expect } from 'vitest';
import { createPRNG, encodeSeed, decodeSeed } from '@/lib/prng';

describe('createPRNG', () => {
  it('same seed produces same sequence', () => {
    const a = createPRNG(42);
    const b = createPRNG(42);
    const seqA: number[] = [];
    const seqB: number[] = [];
    for (let i = 0; i < 100; i++) {
      seqA.push(a.next());
      seqB.push(b.next());
    }
    expect(seqA).toEqual(seqB);
  });

  it('different seeds produce different sequences', () => {
    const a = createPRNG(42);
    const b = createPRNG(9999);
    const seqA: number[] = [];
    const seqB: number[] = [];
    for (let i = 0; i < 10; i++) {
      seqA.push(a.next());
      seqB.push(b.next());
    }
    expect(seqA).not.toEqual(seqB);
  });

  it('nextInt returns values in [min, max)', () => {
    const prng = createPRNG(123);
    for (let i = 0; i < 200; i++) {
      const val = prng.nextInt(3, 10);
      expect(val).toBeGreaterThanOrEqual(3);
      expect(val).toBeLessThan(10);
    }
  });

  it('shuffle produces a permutation (same elements)', () => {
    const prng = createPRNG(55);
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arr = [...original];
    prng.shuffle(arr);
    expect(arr.sort((a, b) => a - b)).toEqual(original);
  });

  it('shuffle with same seed produces same order', () => {
    const a = createPRNG(77);
    const b = createPRNG(77);
    const arrA = [1, 2, 3, 4, 5, 6, 7, 8];
    const arrB = [1, 2, 3, 4, 5, 6, 7, 8];
    a.shuffle(arrA);
    b.shuffle(arrB);
    expect(arrA).toEqual(arrB);
  });
});

describe('encodeSeed / decodeSeed', () => {
  it('roundtrip preserves the value', () => {
    const seeds = [0, 1, 42, 1000000, 4294967295, 123456789];
    for (const seed of seeds) {
      expect(decodeSeed(encodeSeed(seed))).toBe(seed);
    }
  });
});
