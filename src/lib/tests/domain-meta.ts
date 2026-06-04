import { TEST_SLUGS, type TestSlug } from './types';

/**
 * Single source of truth for per-domain presentation: display name, glyph,
 * accent color, and a short blurb. Shared by the homepage, the tests grid,
 * the results "try another domain" list, and the composite radar chart so the
 * color/icon for each cognitive domain stays consistent everywhere.
 * Colors mirror the --color-domain-* tokens in globals.css.
 */
export interface DomainMeta {
  slug: TestSlug;
  name: string;
  short: string;
  icon: string;
  color: string;
  blurb: string;
}

export const DOMAIN_META: Record<TestSlug, DomainMeta> = {
  matrix: {
    slug: 'matrix',
    name: 'Pattern Recognition',
    short: 'Pattern',
    icon: '◧',
    color: '#0d9488',
    blurb: 'Visual matrix puzzles',
  },
  spatial: {
    slug: 'spatial',
    name: 'Spatial Reasoning',
    short: 'Spatial',
    icon: '⬡',
    color: '#0284c7',
    blurb: 'Mental rotation and folding',
  },
  numerical: {
    slug: 'numerical',
    name: 'Number Sequences',
    short: 'Numerical',
    icon: '∑',
    color: '#4f46e5',
    blurb: 'Find the numeric pattern',
  },
  logical: {
    slug: 'logical',
    name: 'Logical Reasoning',
    short: 'Logical',
    icon: '∴',
    color: '#7c3aed',
    blurb: 'Syllogisms and deduction',
  },
  verbal: {
    slug: 'verbal',
    name: 'Verbal Reasoning',
    short: 'Verbal',
    icon: '≡',
    color: '#d97706',
    blurb: 'Word analogies and relations',
  },
  memory: {
    slug: 'memory',
    name: 'Working Memory',
    short: 'Memory',
    icon: '⧉',
    color: '#e11d48',
    blurb: 'Timed recall challenges',
  },
};

export const DOMAIN_LIST: DomainMeta[] = TEST_SLUGS.map((slug) => DOMAIN_META[slug]);

/** 10% / 16% alpha tints of a domain color for tile backgrounds (light / dark). */
export function tint(hex: string, alpha = 0.12): string {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
}
