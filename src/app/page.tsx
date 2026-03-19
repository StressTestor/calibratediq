import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'CalibratedIQ - Free IQ Test Based on Raven\'s Progressive Matrices',
  description:
    'A free, scientifically-grounded IQ assessment based on Raven\'s Progressive Matrices methodology. 30 progressive matrix puzzles measuring fluid intelligence through pattern recognition.',
  openGraph: {
    title: 'CalibratedIQ - Free IQ Test',
    description:
      'A free, scientifically-grounded IQ assessment based on Raven\'s Progressive Matrices methodology.',
    url: 'https://calibratediq.org',
  },
};

export default function HomePage() {
  return (
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
      <div className="flex justify-center mb-12">
        <Link
          href="/test"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
        >
          Begin Test
        </Link>
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
  );
}
