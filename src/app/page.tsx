import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'CalibratedIQ - Free IQ Test Based on Raven\'s Progressive Matrices',
  description:
    'Take a free IQ test online based on Raven\'s Progressive Matrices. 30 pattern recognition puzzles measuring fluid intelligence. Get your IQ score, percentile rank, and shareable results instantly.',
  openGraph: {
    title: 'CalibratedIQ - Free IQ Test',
    description:
      'Free online IQ test based on Raven\'s Progressive Matrices. 30 pattern recognition puzzles, instant scoring, and shareable results.',
    url: 'https://calibratediq.org',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Calibrated IQ Test',
    description: 'A free, scientifically-grounded IQ assessment based on Raven\'s Progressive Matrices methodology. 30 progressive matrix puzzles measuring fluid intelligence through pattern recognition.',
    educationalLevel: 'All levels',
    about: {
      '@type': 'Thing',
      name: 'Fluid Intelligence',
      description: 'The ability to reason and solve novel problems independent of previously acquired knowledge',
    },
    provider: {
      '@type': 'Organization',
      name: 'CalibratedIQ',
      url: 'https://calibratediq.org',
    },
    numberOfQuestions: 30,
    timeRequired: 'PT15M',
    isAccessibleForFree: true,
    inLanguage: 'en',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Calibrated IQ Test
        </h1>
        <p className="text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
          A free, scientifically-grounded assessment based on Raven&apos;s
          Progressive Matrices methodology
        </p>
      </div>

      {/* Info sections */}
      <div className="grid gap-8 mb-12">
        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            What this test measures
          </h2>
          <p className="text-sm leading-relaxed">
            Fluid intelligence (gf) through abstract pattern recognition.
            Each puzzle presents a matrix of geometric patterns with one
            missing element. You identify the rule governing the pattern
            and select the correct missing piece.
          </p>
        </div>

        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            How long it takes
          </h2>
          <p className="text-sm leading-relaxed">
            Approximately 15 minutes. There is no strict time limit, but
            the test records your completion time. Most people finish
            within 10 to 20 minutes.
          </p>
        </div>

        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            How it works
          </h2>
          <p className="text-sm leading-relaxed">
            30 progressive matrix puzzles across 3 difficulty levels: easy
            (questions 1-10), medium (11-22), and hard (23-30). Difficulty
            increases through the test as patterns involve more simultaneous
            transformations.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center mb-12">
        <Link
          href="/test/matrix"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
        >
          Begin Test
        </Link>
        <Link
          href="/tests"
          className="mt-4 text-sm text-muted hover:text-text dark:hover:text-text-dark underline underline-offset-2 transition-colors"
        >
          Or try other cognitive tests &rarr;
        </Link>
      </div>

      {/* Choose your test */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold tracking-tight mb-4 text-center">
          choose your test
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <Link
            href="/test/matrix"
            className="border border-border dark:border-border-dark rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
          >
            <span className="text-2xl block mb-1">{'\u25E7'}</span>
            <span className="text-sm font-medium block mb-0.5">Pattern Recognition</span>
            <span className="text-xs text-muted block">Visual matrix puzzles</span>
            <span className="text-xs font-medium text-primary dark:text-primary-light mt-2 block group-hover:underline">
              Start &rarr;
            </span>
          </Link>
          <Link
            href="/test/spatial"
            className="border border-border dark:border-border-dark rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
          >
            <span className="text-2xl block mb-1">{'\u2B21'}</span>
            <span className="text-sm font-medium block mb-0.5">Spatial Reasoning</span>
            <span className="text-xs text-muted block">Mental rotation and folding</span>
            <span className="text-xs font-medium text-primary dark:text-primary-light mt-2 block group-hover:underline">
              Start &rarr;
            </span>
          </Link>
          <Link
            href="/test/numerical"
            className="border border-border dark:border-border-dark rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
          >
            <span className="text-2xl block mb-1">{'\u2211'}</span>
            <span className="text-sm font-medium block mb-0.5">Number Sequences</span>
            <span className="text-xs text-muted block">Find the numeric pattern</span>
            <span className="text-xs font-medium text-primary dark:text-primary-light mt-2 block group-hover:underline">
              Start &rarr;
            </span>
          </Link>
          <Link
            href="/test/logical"
            className="border border-border dark:border-border-dark rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
          >
            <span className="text-2xl block mb-1">{'\u2234'}</span>
            <span className="text-sm font-medium block mb-0.5">Logical Reasoning</span>
            <span className="text-xs text-muted block">Syllogisms and deduction</span>
            <span className="text-xs font-medium text-primary dark:text-primary-light mt-2 block group-hover:underline">
              Start &rarr;
            </span>
          </Link>
          <Link
            href="/test/verbal"
            className="border border-border dark:border-border-dark rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
          >
            <span className="text-2xl block mb-1">{'\u2261'}</span>
            <span className="text-sm font-medium block mb-0.5">Verbal Reasoning</span>
            <span className="text-xs text-muted block">Word analogies and relations</span>
            <span className="text-xs font-medium text-primary dark:text-primary-light mt-2 block group-hover:underline">
              Start &rarr;
            </span>
          </Link>
          <Link
            href="/test/memory"
            className="border border-border dark:border-border-dark rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
          >
            <span className="text-2xl block mb-1">{'\u29C9'}</span>
            <span className="text-sm font-medium block mb-0.5">Working Memory</span>
            <span className="text-xs text-muted block">Timed recall challenges</span>
            <span className="text-xs font-medium text-primary dark:text-primary-light mt-2 block group-hover:underline">
              Start &rarr;
            </span>
          </Link>
        </div>
        <div className="text-center">
          <Link
            href="/tests"
            className="text-sm font-medium text-primary dark:text-primary-light hover:underline"
          >
            Or take them all for your composite IQ score &rarr;
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border dark:border-border-dark pt-6 mb-8">
        <p className="text-xs text-muted leading-relaxed">
          This test is not affiliated with Mensa International. For official
          testing, visit{' '}
          <a
            href="https://www.mensa.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-text dark:hover:text-text-dark transition-colors"
          >
            mensa.org
          </a>
          . This assessment uses the same psychometric methodology (progressive
          matrices) used in standardized intelligence testing.
        </p>
      </div>

      {/* Ad */}
      <div className="flex justify-center">
        <AdPlaceholder zone="banner" />
      </div>
    </div>
    </>
  );
}
