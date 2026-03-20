import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { TEST_SLUGS, TestSlug } from '@/lib/tests/types';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Choose Your Test',
  description:
    '6 scientifically-grounded cognitive assessments: pattern recognition, spatial reasoning, number sequences, logical reasoning, verbal reasoning, and working memory.',
  alternates: {
    canonical: 'https://calibratediq.org/tests',
  },
  openGraph: {
    title: 'Choose Your Test - CalibratedIQ',
    description:
      '6 scientifically-grounded cognitive assessments measuring different facets of intelligence.',
    url: 'https://calibratediq.org/tests',
  },
};

// Static test metadata to avoid async imports in a server component
const TEST_INFO: Record<TestSlug, {
  name: string;
  description: string;
  icon: string;
  learnMoreUrl: string;
  implemented: boolean;
}> = {
  matrix: {
    name: 'Pattern Recognition',
    description: 'Identify the missing piece in visual pattern matrices. Based on Raven\'s Progressive Matrices methodology.',
    icon: '\u25E7',
    learnMoreUrl: '/learn/ravens-progressive-matrices',
    implemented: true,
  },
  spatial: {
    name: 'Spatial Reasoning',
    description: 'Mental rotation, cube net folding, and 3D wireframe comparison.',
    icon: '\u2B21',
    learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
    implemented: false,
  },
  numerical: {
    name: 'Number Sequences',
    description: 'Find the pattern in number sequences using arithmetic, geometric, and polynomial rules.',
    icon: '\u2211',
    learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
    implemented: false,
  },
  logical: {
    name: 'Logical Reasoning',
    description: 'Deductive reasoning with syllogisms, conditionals, and quantifier logic.',
    icon: '\u2234',
    learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
    implemented: false,
  },
  verbal: {
    name: 'Verbal Reasoning',
    description: 'Word analogies testing vocabulary depth and relationship recognition.',
    icon: '\u2261',
    learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
    implemented: false,
  },
  memory: {
    name: 'Working Memory',
    description: 'Timed recall of digit sequences, grid patterns, and multi-element stimuli.',
    icon: '\u29C9',
    learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
    implemented: false,
  },
};

export default function TestsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          choose your test
        </h1>
        <p className="text-sm text-muted">
          6 scientifically-grounded cognitive assessments
        </p>
      </div>

      {/* Ad */}
      <div className="flex justify-center mb-8">
        <AdPlaceholder zone="banner" />
      </div>

      {/* Test cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {TEST_SLUGS.map((slug) => {
          const info = TEST_INFO[slug];
          return (
            <div
              key={slug}
              className="border border-border dark:border-border-dark rounded-lg p-5 flex flex-col"
            >
              <div className="text-3xl mb-3">{info.icon}</div>
              <h2 className="text-base font-semibold mb-2">{info.name}</h2>
              <p className="text-sm text-muted mb-4 flex-1">
                {info.description}
              </p>
              <div className="flex items-center justify-between">
                {info.implemented ? (
                  <Link
                    href={`/test/${slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline"
                  >
                    Start test &rarr;
                  </Link>
                ) : (
                  <span className="inline-flex items-center text-sm font-medium text-muted">
                    Coming soon
                  </span>
                )}
                <Link
                  href={info.learnMoreUrl}
                  className="text-xs text-muted hover:text-text dark:hover:text-text-dark transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composite CTA */}
      <div className="text-center border border-border dark:border-border-dark rounded-lg p-6 mb-8">
        <p className="text-sm text-muted">
          Complete 3 or more tests to get your composite IQ score
        </p>
      </div>

      {/* Bottom ad */}
      <div className="flex justify-center">
        <AdPlaceholder zone="native" />
      </div>
    </div>
  );
}
