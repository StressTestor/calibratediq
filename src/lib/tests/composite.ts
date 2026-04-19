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

export interface CompositeTestParams {
  seed: string;
  answers: string;
  completedAt: string;
  signature: string;
}

// Delimiter chosen because none of the fields can contain it:
// - seed: base36 [0-9a-z]
// - answers: digits [0-5]
// - completedAt: ISO 8601 (contains '.', ':', '-', 'T', 'Z' — but no '~')
// - signature: 'v1:' + hex, no '~'
const COMPOSITE_FIELD_DELIM = '~';

// Parse composite URL params: /composite?mx=SEED~ANSWERS~COMPLETEDAT~SIGNATURE&sp=...
// The 4-field format is required after Fix 2; legacy 2-field links (pre-signing)
// are returned as null so they get excluded from the composite score (fail-closed).
export function parseCompositeParams(
  searchParams: URLSearchParams,
): Record<TestSlug, CompositeTestParams | null> {
  const shortNames: Record<string, TestSlug> = {
    mx: 'matrix', sp: 'spatial', nm: 'numerical',
    lg: 'logical', vb: 'verbal', mm: 'memory',
  };

  const result: Record<string, CompositeTestParams | null> = {};
  for (const [short, slug] of Object.entries(shortNames)) {
    const value = searchParams.get(short);
    if (!value) {
      result[slug] = null;
      continue;
    }
    const parts = value.split(COMPOSITE_FIELD_DELIM);
    if (parts.length !== 4) {
      result[slug] = null;
      continue;
    }
    const [seed, answers, completedAt, signature] = parts;
    if (!seed || !answers || !completedAt || !signature) {
      result[slug] = null;
      continue;
    }
    result[slug] = { seed, answers, completedAt, signature };
  }
  return result as Record<TestSlug, CompositeTestParams | null>;
}

// Build composite URL from individual test results
export function buildCompositeUrl(
  tests: Partial<Record<TestSlug, CompositeTestParams>>,
): string {
  const slugToShort: Record<TestSlug, string> = {
    matrix: 'mx', spatial: 'sp', numerical: 'nm',
    logical: 'lg', verbal: 'vb', memory: 'mm',
  };

  const params = new URLSearchParams();
  for (const [slug, data] of Object.entries(tests)) {
    if (data) {
      params.set(
        slugToShort[slug as TestSlug],
        [data.seed, data.answers, data.completedAt, data.signature].join(COMPOSITE_FIELD_DELIM),
      );
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
