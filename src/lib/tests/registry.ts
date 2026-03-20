import { TestType, TestSlug, TEST_SLUGS } from './types';

// These will be lazy-imported to avoid loading all test types at once
const testModules: Record<TestSlug, () => Promise<{ default: TestType }>> = {
  matrix: () => import('./matrix'),
  spatial: () => import('./spatial'),
  numerical: () => import('./numerical'),
  logical: () => import('./logical'),
  verbal: () => import('./verbal'),
  memory: () => import('./memory'),
};

// Synchronous registry for server-side and pre-loaded contexts
// Each test module exports a default TestType
const _cache: Partial<Record<TestSlug, TestType>> = {};

export async function getTestType(slug: TestSlug): Promise<TestType> {
  if (_cache[slug]) return _cache[slug]!;
  const mod = await testModules[slug]();
  _cache[slug] = mod.default;
  return mod.default;
}

export function isValidTestSlug(slug: string): slug is TestSlug {
  return TEST_SLUGS.includes(slug as TestSlug);
}

export function getAllTestSlugs(): readonly TestSlug[] {
  return TEST_SLUGS;
}
