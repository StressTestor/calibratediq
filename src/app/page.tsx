import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'CalibratedIQ - Free IQ Tests: Pattern, Spatial, Numerical, Logical, Verbal, Memory',
  description:
    'Six free cognitive tests scored on a real IQ scale (mean 100, SD 15). Take one for a domain score, or take three or more for a composite IQ and radar chart. No signup, results stored locally.',
  openGraph: {
    title: 'CalibratedIQ - Six Free IQ Tests + Composite Score',
    description:
      'Six cognitive domains: pattern recognition, spatial reasoning, number sequences, logical reasoning, verbal reasoning, working memory. Composite IQ after 3 or more tests.',
    url: 'https://calibratediq.org',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CalibratedIQ - Free Cognitive Tests',
    description:
      'Six free IQ tests covering pattern recognition, spatial reasoning, number sequences, logical reasoning, verbal reasoning, and working memory. Each test returns a calibrated IQ and percentile. Three or more tests produce a composite IQ with a radar chart of your cognitive profile.',
    url: 'https://calibratediq.org',
    provider: {
      '@type': 'Organization',
      name: 'CalibratedIQ',
      url: 'https://calibratediq.org',
    },
    hasPart: [
      {
        '@type': 'Quiz',
        name: 'Pattern Recognition',
        url: 'https://calibratediq.org/test/matrix',
        about: 'Fluid intelligence via Raven-style progressive matrices',
        numberOfQuestions: 30,
      },
      {
        '@type': 'Quiz',
        name: 'Spatial Reasoning',
        url: 'https://calibratediq.org/test/spatial',
        about: 'Mental rotation and 3D visualization',
        numberOfQuestions: 30,
      },
      {
        '@type': 'Quiz',
        name: 'Number Sequences',
        url: 'https://calibratediq.org/test/numerical',
        about: 'Numeric pattern recognition',
        numberOfQuestions: 30,
      },
      {
        '@type': 'Quiz',
        name: 'Logical Reasoning',
        url: 'https://calibratediq.org/test/logical',
        about: 'Syllogisms and deductive logic',
        numberOfQuestions: 30,
      },
      {
        '@type': 'Quiz',
        name: 'Verbal Reasoning',
        url: 'https://calibratediq.org/test/verbal',
        about: 'Word analogies and verbal relations',
        numberOfQuestions: 30,
      },
      {
        '@type': 'Quiz',
        name: 'Working Memory',
        url: 'https://calibratediq.org/test/memory',
        about: 'Short-term recall and attention',
        numberOfQuestions: 30,
      },
    ],
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
          Calibrated IQ Tests
        </h1>
        <p className="text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
          Six cognitive tests scored on a real IQ scale. Take one for a domain
          score, or take three or more for a composite IQ and a radar chart of
          your cognitive profile.
        </p>
      </div>

      {/* Info sections */}
      <div className="grid gap-8 mb-12">
        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            What you can take
          </h2>
          <p className="text-sm leading-relaxed">
            Six independent tests, 30 questions each, covering pattern
            recognition, spatial reasoning, number sequences, logical
            reasoning, verbal reasoning, and working memory. Each test returns
            its own IQ score on a normal distribution (mean 100, SD 15) plus a
            percentile rank.
          </p>
        </div>

        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            How the composite works
          </h2>
          <p className="text-sm leading-relaxed">
            Finish any three or more tests and{' '}
            <Link href="/composite" className="underline hover:text-text dark:hover:text-text-dark">
              /composite
            </Link>{' '}
            shows a weighted IQ and a radar chart of your domain profile.
            Results save to your browser, so you can take more tests over time
            and watch your composite stabilize.
          </p>
        </div>

        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            What&apos;s stored
          </h2>
          <p className="text-sm leading-relaxed">
            Results live in your browser&apos;s localStorage only. No account,
            no email, no server database. Share links are HMAC-signed, so
            editing the URL to fake a higher score doesn&apos;t work.
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
        <p className="mt-3 text-xs text-muted">
          Starts with pattern recognition (~15 min). Pick a different test below.
        </p>
      </div>

      {/* Choose your test */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold tracking-tight mb-1 text-center">
          all six tests
        </h2>
        <p className="text-xs text-muted text-center mb-4">
          30 questions each. take them in any order.
        </p>
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
      </div>

      {/* Composite CTA */}
      <div className="border border-border dark:border-border-dark rounded-lg p-5 mb-12 text-center">
        <h2 className="text-base font-semibold mb-1">composite IQ score</h2>
        <p className="text-sm text-muted mb-3 leading-relaxed">
          Finish any three tests to unlock a weighted composite IQ and a radar
          chart comparing your domain scores.
        </p>
        <Link
          href="/composite"
          className="inline-flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline"
        >
          View your composite &rarr;
        </Link>
      </div>

      {/* Learn callout */}
      <div className="border border-border dark:border-border-dark rounded-lg p-5 mb-12 text-center">
        <h2 className="text-base font-semibold mb-1">about IQ testing</h2>
        <p className="text-sm text-muted mb-3 leading-relaxed">
          Plain-english guides to how IQ is calculated, what the scale means,
          how accurate these tests are, and the research behind each cognitive
          domain.
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline"
        >
          Read the guides &rarr;
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border dark:border-border-dark pt-6 mb-8">
        <p className="text-xs text-muted leading-relaxed">
          This site is not affiliated with Mensa International. For official
          testing, visit{' '}
          <a
            href="https://www.mensa.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-text dark:hover:text-text-dark transition-colors"
          >
            mensa.org
          </a>
          . These assessments use established psychometric methodology; scores
          are for entertainment and educational purposes, not clinical
          diagnosis.
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
