import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { BellCurve } from '@/components/bell-curve';
import { DOMAIN_LIST, tint } from '@/lib/tests/domain-meta';

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

const FEATURES = [
  {
    title: 'Calibrated scoring',
    body: 'Raw scores map to IQ through the inverse normal CDF, the same normal distribution (mean 100, SD 15) that standardized tests use. Not a personality quiz.',
    icon: (
      <path
        d="M3 17 C 8 17 9 6 13 6 C 17 6 18 17 23 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: 'Composite profile',
    body: 'Finish three or more domains and your scores combine into a weighted composite IQ, with a radar chart showing where you are strong and where you are not.',
    icon: (
      <path
        d="M13 3 L21 8 L18 18 L8 18 L5 8 Z M13 3 L13 18 M5 8 L21 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Private by design',
    body: 'No account, no email, no server-side database. Results live in your browser. Share links are HMAC-signed, so a score cannot be forged by editing the URL.',
    icon: (
      <path
        d="M13 3 L20 6 V11 C 20 16 17 19 13 21 C 9 19 6 16 6 11 V6 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
];

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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="cq-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-10 sm:pt-20 sm:pb-14">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-8 items-center">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <span className="cq-badge mb-5">Normal-distribution scoring</span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-4">
                Free IQ tests, scored on a real{' '}
                <span className="text-primary dark:text-primary-light">bell curve</span>.
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6">
                Six cognitive tests on a normal-distribution IQ scale (mean 100,
                SD&nbsp;15). Take one for a domain score, or three or more for a
                composite IQ and a profile of your strengths.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-5">
                <Link
                  href="/test/matrix"
                  className="inline-flex items-center justify-center px-7 py-3 text-base font-semibold text-white bg-primary hover:bg-primary-light rounded-xl transition-colors shadow-sm w-full sm:w-auto"
                >
                  Start free test
                </Link>
                <Link
                  href="/tests"
                  className="inline-flex items-center justify-center px-7 py-3 text-base font-medium rounded-xl border border-border dark:border-border-dark hover:bg-surface-2 dark:hover:bg-surface-2-dark transition-colors w-full sm:w-auto"
                >
                  See all six tests
                </Link>
              </div>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-1.5 text-xs text-muted">
                {['Free, forever', 'No signup', 'Results stay on your device'].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-primary dark:text-primary-light" aria-hidden="true">
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Signature visual: the scoring curve */}
            <div className="cq-card p-5 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  How scoring works
                </span>
                <span className="text-xs text-muted">Example</span>
              </div>
              <BellCurve iq={128} percentile={97} />
              <p className="text-xs text-muted leading-relaxed mt-2">
                An IQ of 128 sits at the 97th percentile, higher than 97% of
                people. Every result is placed on this curve; the shaded region
                is your percentile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Why this test */}
        <section className="grid sm:grid-cols-3 gap-4 mb-14">
          {FEATURES.map((f) => (
            <div key={f.title} className="cq-card p-5">
              <span
                className="cq-tile mb-3"
                style={{ backgroundColor: tint('#0f766e'), color: '#0f766e' }}
              >
                <svg viewBox="0 0 26 24" className="h-6 w-6" aria-hidden="true">
                  {f.icon}
                </svg>
              </span>
              <h2 className="text-sm font-semibold mb-1.5">{f.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </section>

        {/* Choose a domain */}
        <section className="mb-14">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-1.5">
              Six cognitive domains
            </h2>
            <p className="text-sm text-muted">
              30 questions each. Take them in any order.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {DOMAIN_LIST.map((d) => (
              <Link
                key={d.slug}
                href={`/test/${d.slug}`}
                className="cq-card-link p-4 sm:p-5 group flex flex-col"
              >
                <span
                  className="cq-tile mb-3"
                  style={{ backgroundColor: tint(d.color), color: d.color }}
                >
                  {d.icon}
                </span>
                <span className="text-sm font-semibold block mb-0.5">{d.name}</span>
                <span className="text-xs text-muted block mb-3 flex-1">{d.blurb}</span>
                <span className="text-xs font-semibold text-primary dark:text-primary-light inline-flex items-center gap-1">
                  Start
                  <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Composite CTA */}
        <section className="cq-card overflow-hidden mb-14">
          <div className="grid sm:grid-cols-[1fr_auto] items-center gap-6 p-6 sm:p-8">
            <div>
              <span className="cq-badge mb-3">After 3 tests</span>
              <h2 className="text-xl font-bold tracking-tight mb-2">
                Build your composite IQ
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-md mb-4">
                Complete any three domains and CalibratedIQ combines them into a
                single weighted IQ, then renders a radar chart of your cognitive
                profile. Scores persist, so each test sharpens the estimate.
              </p>
              <Link
                href="/composite"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary dark:text-primary-light hover:underline"
              >
                View composite score &rarr;
              </Link>
            </div>
            {/* Mini radar motif */}
            <div className="hidden sm:block shrink-0" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="h-32 w-32">
                {[40, 27, 14].map((r) => (
                  <polygon
                    key={r}
                    points={hexPoints(60, 60, r)}
                    fill="none"
                    stroke="currentColor"
                    className="text-border dark:text-border-dark"
                    strokeWidth="1"
                  />
                ))}
                <polygon
                  points={radarPoints(60, 60, [0.85, 0.6, 0.92, 0.5, 0.78, 0.68])}
                  fill="currentColor"
                  className="text-primary/20 dark:text-primary-light/20"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Learn callout */}
        <section className="cq-card p-6 sm:p-8 text-center mb-14">
          <h2 className="text-lg font-bold tracking-tight mb-1.5">
            Research &amp; methodology
          </h2>
          <p className="text-sm text-muted mb-4 leading-relaxed max-w-lg mx-auto">
            Plain-language reference on how IQ is calculated, how to read the
            scale, what these tests can and cannot tell you, and the research
            behind each cognitive domain.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary dark:text-primary-light hover:underline"
          >
            Read the guides &rarr;
          </Link>
        </section>

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

/** Vertices of a regular hexagon, for the composite radar motif. */
function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

/** Radar polygon for six normalized (0-1) domain values. */
function radarPoints(cx: number, cy: number, values: number[]): string {
  const maxR = 40;
  return values
    .map((v, i) => {
      const a = (Math.PI / 180) * (60 * i - 90);
      const r = maxR * v;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    })
    .join(' ');
}
