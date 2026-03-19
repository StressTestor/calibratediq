import { describe, it, expect } from 'vitest';
import {
  calculateIQ, calculatePercentile, getClassification,
  computeScore, encodeAnswers, decodeAnswers,
  IQ_FLOOR, IQ_CEILING, TOTAL_QUESTIONS,
} from '@/lib/scoring';

describe('calculateIQ', () => {
  it('calculateIQ(0) returns IQ_FLOOR (55)', () => {
    expect(calculateIQ(0)).toBe(IQ_FLOOR);
  });

  it('calculateIQ(30) returns IQ_CEILING (145)', () => {
    expect(calculateIQ(30)).toBe(IQ_CEILING);
  });

  it('calculateIQ(15) returns 100 (mean)', () => {
    expect(calculateIQ(15)).toBe(100);
  });

  it('calculateIQ(20) returns approximately 115 (+/- 2)', () => {
    const iq = calculateIQ(20);
    expect(iq).toBeGreaterThanOrEqual(113);
    expect(iq).toBeLessThanOrEqual(117);
  });

  it('calculateIQ(10) returns approximately 85 (+/- 2)', () => {
    const iq = calculateIQ(10);
    expect(iq).toBeGreaterThanOrEqual(83);
    expect(iq).toBeLessThanOrEqual(87);
  });
});

describe('calculatePercentile', () => {
  it('calculatePercentile(100) returns approximately 50', () => {
    const p = calculatePercentile(100);
    expect(p).toBeGreaterThanOrEqual(49);
    expect(p).toBeLessThanOrEqual(51);
  });

  it('calculatePercentile(130) returns approximately 98 (+/- 1)', () => {
    const p = calculatePercentile(130);
    expect(p).toBeGreaterThanOrEqual(97);
    expect(p).toBeLessThanOrEqual(99);
  });
});

describe('getClassification', () => {
  it('returns correct label for each IQ range boundary', () => {
    expect(getClassification(145)).toBe('Profoundly Gifted');
    expect(getClassification(150)).toBe('Profoundly Gifted');
    expect(getClassification(130)).toBe('Highly Gifted');
    expect(getClassification(144)).toBe('Highly Gifted');
    expect(getClassification(120)).toBe('Superior');
    expect(getClassification(129)).toBe('Superior');
    expect(getClassification(110)).toBe('Above Average');
    expect(getClassification(119)).toBe('Above Average');
    expect(getClassification(90)).toBe('Average');
    expect(getClassification(109)).toBe('Average');
    expect(getClassification(80)).toBe('Below Average');
    expect(getClassification(89)).toBe('Below Average');
    expect(getClassification(70)).toBe('Borderline');
    expect(getClassification(79)).toBe('Borderline');
    expect(getClassification(69)).toBe('Below 70');
    expect(getClassification(55)).toBe('Below 70');
  });
});

describe('computeScore', () => {
  it('correctly counts per-difficulty breakdowns', () => {
    // 30 answers, all correct
    const correct = Array.from({ length: 30 }, (_, i) => i);
    const answers = [...correct];
    const result = computeScore(answers, correct);
    expect(result.rawScore).toBe(30);
    expect(result.easyCorrect).toBe(10);   // Q0-9
    expect(result.mediumCorrect).toBe(12); // Q10-21
    expect(result.hardCorrect).toBe(8);    // Q22-29
  });

  it('scores zero when no answers match', () => {
    const correct = Array.from({ length: 30 }, () => 0);
    const answers = Array.from({ length: 30 }, () => 1);
    const result = computeScore(answers, correct);
    expect(result.rawScore).toBe(0);
    expect(result.easyCorrect).toBe(0);
    expect(result.mediumCorrect).toBe(0);
    expect(result.hardCorrect).toBe(0);
  });

  it('scores partial results correctly', () => {
    // Only easy questions correct (first 10)
    const correct = Array.from({ length: 30 }, () => 0);
    const answers = Array.from({ length: 30 }, (_, i) => (i < 10 ? 0 : 1));
    const result = computeScore(answers, correct);
    expect(result.rawScore).toBe(10);
    expect(result.easyCorrect).toBe(10);
    expect(result.mediumCorrect).toBe(0);
    expect(result.hardCorrect).toBe(0);
  });
});

describe('encodeAnswers / decodeAnswers', () => {
  it('roundtrip preserves the values', () => {
    const answers = [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5];
    expect(decodeAnswers(encodeAnswers(answers))).toEqual(answers);
  });

  it('handles all zeros', () => {
    const answers = Array.from({ length: 30 }, () => 0);
    expect(decodeAnswers(encodeAnswers(answers))).toEqual(answers);
  });
});
