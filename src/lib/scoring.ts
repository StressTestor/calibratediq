// Abramowitz and Stegun rational approximation for inverse normal CDF
// Accurate to ~4.5e-4
function probit(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p === 0.5) return 0;

  const a1 = -3.969683028665376e+01;
  const a2 = 2.209460984245205e+02;
  const a3 = -2.759285104469687e+02;
  const a4 = 1.383577518672690e+02;
  const a5 = -3.066479806614716e+01;
  const a6 = 2.506628277459239e+00;

  const b1 = -5.447609879822406e+01;
  const b2 = 1.615858368580409e+02;
  const b3 = -1.556989798598866e+02;
  const b4 = 6.680131188771972e+01;
  const b5 = -1.328068155288572e+01;

  const c1 = -7.784894002430293e-03;
  const c2 = -3.223964580411365e-01;
  const c3 = -2.400758277161838e+00;
  const c4 = -2.549732539343734e+00;
  const c5 = 4.374664141464968e+00;
  const c6 = 2.938163982698783e+00;

  const d1 = 7.784695709041462e-03;
  const d2 = 3.224671290700398e-01;
  const d3 = 2.445134137142996e+00;
  const d4 = 3.754408661907416e+00;

  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  let q: number;

  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    const r = q * q;
    return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
      (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
}

// Normal CDF (for percentile calculation)
function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

export const IQ_MEAN = 100;
export const IQ_SD = 15;
export const IQ_FLOOR = 55;
export const IQ_CEILING = 145;
export const TOTAL_QUESTIONS = 30;
export const RAW_MEAN = 15; // Expected mean raw score
export const RAW_SD = 5;   // ~5 correct = 1 SD

export interface ScoreResult {
  rawScore: number;
  iq: number;
  percentile: number;
  classification: string;
  mensaQualified: boolean;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
}

export function calculateIQ(rawScore: number): number {
  // Map raw score to percentile position assuming normal distribution
  // rawScore 15 = 50th percentile (IQ 100)
  // rawScore 20 = ~84th percentile (IQ 115)
  // rawScore 10 = ~16th percentile (IQ 85)
  const p = normalCDF((rawScore - RAW_MEAN) / RAW_SD);

  // Clamp p to avoid infinity
  const pClamped = Math.max(0.0001, Math.min(0.9999, p));

  const z = probit(pClamped);
  const iq = IQ_MEAN + IQ_SD * z;

  return Math.round(Math.max(IQ_FLOOR, Math.min(IQ_CEILING, iq)));
}

export function calculatePercentile(iq: number): number {
  const z = (iq - IQ_MEAN) / IQ_SD;
  const percentile = normalCDF(z) * 100;
  return Math.round(percentile * 10) / 10;
}

export function getClassification(iq: number): string {
  if (iq >= 145) return 'Profoundly Gifted';
  if (iq >= 130) return 'Highly Gifted';
  if (iq >= 120) return 'Superior';
  if (iq >= 110) return 'Above Average';
  if (iq >= 90) return 'Average';
  if (iq >= 80) return 'Below Average';
  if (iq >= 70) return 'Borderline';
  return 'Below 70';
}

export function computeScore(answers: number[], correctAnswers: number[]): ScoreResult {
  let rawScore = 0;
  let easyCorrect = 0;
  let mediumCorrect = 0;
  let hardCorrect = 0;

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    if (answers[i] === correctAnswers[i]) {
      rawScore++;
      if (i < 10) easyCorrect++;
      else if (i < 22) mediumCorrect++;
      else hardCorrect++;
    }
  }

  const iq = calculateIQ(rawScore);
  const percentile = calculatePercentile(iq);
  const classification = getClassification(iq);
  const mensaQualified = iq >= 130;

  return {
    rawScore,
    iq,
    percentile,
    classification,
    mensaQualified,
    easyCorrect,
    mediumCorrect,
    hardCorrect,
  };
}

// Encode answers as compact string (each answer is 0-5, one char each)
export function encodeAnswers(answers: number[]): string {
  return answers.map(a => a.toString()).join('');
}

// Decode answers from compact string
export function decodeAnswers(str: string): number[] {
  return str.split('').map(Number);
}
