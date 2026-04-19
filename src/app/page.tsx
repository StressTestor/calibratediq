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
        <p className="text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed mb-5">
          Six cognitive tests on a normal-distribution IQ scale (mean 100, SD
          15). Complete one for a domain score, three or more for a composite
          IQ and cognitive profile.
        </p>
        <p className="text-xs text-muted tracking-wide">
          <span className="font-medium">Free</span>
          <span className="mx-2 opacity-40">&middot;</span>
          <span className="font-medium">No signup</span>
          <span className="mx-2 opacity-40">&middot;</span>
          <span className="font-medium">Results stored locally</span>
        </p>
      </div>

      {/* Info sections */}
      <div className="grid gap-8 mb-12">
        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            Test Battery
          </h2>
          <p className="text-sm leading-relaxed">
            Six independent tests of 30 questions each, covering pattern
            recognition, spatial reasoning, number sequences, logical
            reasoning, verbal reasoning, and working memory. Every test returns
            a calibrated IQ score and percentile rank.
          </p>
        </div>

        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            Composite Scoring
          </h2>
          <p className="text-sm leading-relaxed">
            After three or more tests,{' '}
            <Link href="/composite" className="underline hover:text-text dark:hover:text-text-dark">
              /composite
            </Link>{' '}
            combines your domain scores into a weighted IQ and renders a radar
            chart of your cognitive profile. Scores persist across sessions, so
            additional tests refine the estimate over time.
          </p>
        </div>

        <div className="border border-border dark:border-border-dark rounded-lg p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">
            Privacy &amp; Integrity
          </h2>
          <p className="text-sm leading-relaxed">
            Results are written to your browser&apos;s localStorage only. No
            account, no email, no server-side database. Share links are
            HMAC-signed; modifying the URL invalidates the result, so reported
            scores cannot be forged.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center mb-12">
        <Link
          href="/test/matrix"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors shadow-sm"
        >
          Begin Test
        </Link>
        <p className="mt-3 text-xs text-muted">
          Pattern recognition, 30 questions, approximately 15 minutes.
        </p>
      </div>

      {/* Choose your test */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold tracking-tight mb-1 text-center">
          All Six Tests
        </h2>
        <p className="text-xs text-muted text-center mb-4">
          30 questions per test. Take them in any order.
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
      <div className="border border-border dark:border-border-dark rounded-lg p-6 mb-6 text-center">
        <h2 className="text-base font-semibold mb-1.5">Composite IQ Score</h2>
        <p className="text-sm text-muted mb-4 leading-relaxed">
          Complete any three tests to receive a weighted composite IQ and a
          radar chart comparing your domain scores.
        </p>
        <Link
          href="/composite"
          className="inline-flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline"
        >
          View Composite Score &rarr;
        </Link>
      </div>

      {/* Learn callout */}
      <div className="border border-border dark:border-border-dark rounded-lg p-6 mb-12 text-center">
        <h2 className="text-base font-semibold mb-1.5">Research &amp; Methodology</h2>
        <p className="text-sm text-muted mb-4 leading-relaxed">
          Plain-language reference material covering IQ calculation, scale
          interpretation, test accuracy, and the research behind each cognitive
          domain.
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline"
        >
          Read the Guides &rarr;
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border dark:border-border-dark pt-6 mb-8">
        <p className="text-xs text-muted leading-relaxed">
          CalibratedIQ is an independent project and is not affiliated with
          Mensa International. For official testing, visit{' '}
          <a
            href="https://www.mensa.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-text dark:hover:text-text-dark transition-colors"
          >
            mensa.org
          </a>
          . These assessments draw on established psychometric methodology;
          scores are provided for educational and entertainment purposes, not
          clinical diagnosis.
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
