import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TEST_SLUGS, TestSlug } from '@/lib/tests/types';
import { DOMAIN_META, tint } from '@/lib/tests/domain-meta';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'All Six IQ Tests',
  description:
    'Six cognitive domain tests on CalibratedIQ: pattern recognition, spatial reasoning, number sequences, logical reasoning, verbal reasoning, and working memory. 30 questions each, scored on a normal-distribution IQ scale.',
  alternates: {
    canonical: 'https://calibratediq.org/tests',
  },
  openGraph: {
    title: 'All Six IQ Tests - CalibratedIQ',
    description:
      'Six cognitive domain tests, each scored on a normal-distribution IQ scale.',
    url: 'https://calibratediq.org/tests',
  },
};

// Page-specific copy (longer descriptions + learn links). Icon/color/name come
// from the shared DOMAIN_META so the palette matches the homepage and radar.
const TEST_INFO: Record<TestSlug, {
  description: string;
  learnMoreUrl: string;
  minutes: string;
}> = {
  matrix: {
    description: 'Identify the missing piece in visual pattern matrices. Based on Raven\'s Progressive Matrices methodology.',
    learnMoreUrl: '/learn/ravens-progressive-matrices',
    minutes: '~15 min',
  },
  spatial: {
    description: 'Mental rotation, cube net folding, and 3D wireframe comparison.',
    learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
    minutes: '~12 min',
  },
  numerical: {
    description: 'Find the pattern in number sequences using arithmetic, geometric, and polynomial rules.',
    learnMoreUrl: '/learn/how-iq-is-calculated',
    minutes: '~12 min',
  },
  logical: {
    description: 'Deductive reasoning with syllogisms, conditionals, and quantifier logic.',
    learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
    minutes: '~12 min',
  },
  verbal: {
    description: 'Word analogies testing vocabulary depth and relationship recognition.',
    learnMoreUrl: '/learn/what-is-iq',
    minutes: '~10 min',
  },
  memory: {
    description: 'Timed recall of digit sequences, grid patterns, and multi-element stimuli.',
    learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
    minutes: '~8 min',
  },
};

function TestCard({ slug }: { slug: TestSlug }) {
  const meta = DOMAIN_META[slug];
  const info = TEST_INFO[slug];
  return (
    <div className="cq-card p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span
          className="cq-tile"
          style={{ backgroundColor: tint(meta.color), color: meta.color }}
        >
          {meta.icon}
        </span>
        <span className="text-xs font-medium text-muted tabular-nums">
          30 Q &middot; {info.minutes}
        </span>
      </div>
      <h2 className="text-base font-semibold mb-2">{meta.name}</h2>
      <p className="text-sm text-muted mb-4 flex-1 leading-relaxed">
        {info.description}
      </p>
      <div className="flex items-center justify-between pt-1">
        <Link
          href={`/test/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary dark:text-primary-light hover:underline"
        >
          Start test &rarr;
        </Link>
        <Link
          href={info.learnMoreUrl}
          className="text-xs text-muted hover:text-text dark:hover:text-text-dark transition-colors"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

export default function TestsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="cq-badge mb-4">Six cognitive domains</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Choose your test
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
          Each test runs 30 questions and is scored on a normal-distribution IQ
          scale. New here? Start with Pattern Recognition. Complete any three
          for a weighted composite.
        </p>
      </div>

      {/* Ad */}
      <div className="flex justify-center mb-10">
        <AdPlaceholder zone="banner" />
      </div>

      {/* Test cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {TEST_SLUGS.slice(0, 3).map((slug) => (
          <TestCard key={slug} slug={slug} />
        ))}
      </div>

      {/* Mid-grid ad */}
      <div className="flex justify-center mb-10">
        <AdPlaceholder zone="banner" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {TEST_SLUGS.slice(3).map((slug) => (
          <TestCard key={slug} slug={slug} />
        ))}
      </div>

      {/* Composite CTA */}
      <div className="cq-card p-6 sm:p-8 text-center mb-8">
        <span className="cq-badge mb-3">After 3 tests</span>
        <h2 className="text-lg font-bold tracking-tight mb-2">Composite IQ score</h2>
        <p className="text-sm text-muted mb-4 leading-relaxed max-w-xl mx-auto">
          After three or more completed tests, your domain scores are weighted
          into a single composite IQ with a radar chart of your cognitive
          profile.
        </p>
        <Link
          href="/composite"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary dark:text-primary-light hover:underline"
        >
          View composite score &rarr;
        </Link>
      </div>

      {/* Bottom ad */}
      <div className="flex justify-center">
        <AdPlaceholder zone="native" />
      </div>
    </div>
  );
}
