import { TestSlug } from './types';

export const COMPOSITE_WEIGHTS: Record<TestSlug, number> = {
  matrix: 0.30,
  spatial: 0.20,
  numerical: 0.20,
  logical: 0.15,
  verbal: 0.10,
  memory: 0.05,
};

export const COMPOSITE_LABELS: Record<TestSlug, string> = {
  matrix: 'Pattern Recognition',
  spatial: 'Spatial Reasoning',
  numerical: 'Number Sequences',
  logical: 'Logical Reasoning',
  verbal: 'Verbal Reasoning',
  memory: 'Working Memory',
};

export const MIN_TESTS_FOR_COMPOSITE = 3;

// Parse composite URL params: /composite?mx=SEED.ANSWERS&sp=SEED.ANSWERS&...
export function parseCompositeParams(searchParams: URLSearchParams): Record<TestSlug, { seed: string; answers: string } | null> {
  const shortNames: Record<string, TestSlug> = {
    mx: 'matrix', sp: 'spatial', nm: 'numerical',
    lg: 'logical', vb: 'verbal', mm: 'memory',
  };

  const result: Record<string, { seed: string; answers: string } | null> = {};
  for (const [short, slug] of Object.entries(shortNames)) {
    const value = searchParams.get(short);
    if (value && value.includes('.')) {
      const [seed, answers] = value.split('.', 2);
      result[slug] = { seed, answers };
    } else {
      result[slug] = null;
    }
  }
  return result as Record<TestSlug, { seed: string; answers: string } | null>;
}

// Build composite URL from individual test results
export function buildCompositeUrl(tests: Partial<Record<TestSlug, { seed: string; answers: string }>>): string {
  const slugToShort: Record<TestSlug, string> = {
    matrix: 'mx', spatial: 'sp', numerical: 'nm',
    logical: 'lg', verbal: 'vb', memory: 'mm',
  };

  const params = new URLSearchParams();
  for (const [slug, data] of Object.entries(tests)) {
    if (data) {
      params.set(slugToShort[slug as TestSlug], `${data.seed}.${data.answers}`);
    }
  }
  return `/composite?${params.toString()}`;
}

// Compute weighted composite IQ from individual test IQs
export function computeCompositeIQ(testIQs: Partial<Record<TestSlug, number>>): number {
  const completedTests = Object.entries(testIQs).filter(([_, iq]) => iq !== undefined) as [TestSlug, number][];
  if (completedTests.length < MIN_TESTS_FOR_COMPOSITE) return 0;

  // Normalize weights to sum to 1.0 for completed tests only
  const totalWeight = completedTests.reduce((sum, [slug]) => sum + COMPOSITE_WEIGHTS[slug], 0);

  const weightedSum = completedTests.reduce((sum, [slug, iq]) => {
    return sum + (iq * COMPOSITE_WEIGHTS[slug] / totalWeight);
  }, 0);

  return Math.round(weightedSum);
}
