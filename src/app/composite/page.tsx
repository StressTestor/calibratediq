'use client';

import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { decodeSeed } from '@/lib/prng';
import { computeScore, decodeAnswers, calculatePercentile, getClassification } from '@/lib/scoring';
import { BellCurve } from '@/components/bell-curve';
import { RadarChart } from '@/components/radar-chart';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { TEST_SLUGS, TestSlug } from '@/lib/tests/types';
import {
  parseCompositeParams,
  computeCompositeIQ,
  COMPOSITE_LABELS,
  COMPOSITE_WEIGHTS,
  MIN_TESTS_FOR_COMPOSITE,
  type CompositeTestParams,
} from '@/lib/tests/composite';
import { loadResults, clearResults } from '@/lib/results-store';
import { ClearHistoryDialog } from '@/components/clear-history-dialog';

// We need synchronous access to generateQuestion for each test type.
// Import them directly since this page needs all of them.
import matrixTest from '@/lib/tests/matrix';
import spatialTest from '@/lib/tests/spatial';
import numericalTest from '@/lib/tests/numerical';
import logicalTest from '@/lib/tests/logical';
import verbalTest from '@/lib/tests/verbal';
import memoryTest from '@/lib/tests/memory';

const TEST_MODULES: Record<TestSlug, { generateQuestion: (seed: number, idx: number) => { correctIndex: number }; totalQuestions: number }> = {
  matrix: matrixTest,
  spatial: spatialTest,
  numerical: numericalTest,
  logical: logicalTest,
  verbal: verbalTest,
  memory: memoryTest,
};

const TEST_META: Record<TestSlug, { icon: string }> = {
  matrix: { icon: '\u25E7' },
  spatial: { icon: '\u2B21' },
  numerical: { icon: '\u2211' },
  logical: { icon: '\u2234' },
  verbal: { icon: '\u2261' },
  memory: { icon: '\u29C9' },
};

function CompositeContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Source selection: URL params (shared-link case) take precedence over localStorage.
  // If URL has no test params, fall back to local results.
  const parsed = useMemo<Record<TestSlug, CompositeTestParams | null>>(() => {
    const fromUrl = parseCompositeParams(searchParams);
    const hasAnyUrlParam = TEST_SLUGS.some((s) => fromUrl[s] !== null);
    if (hasAnyUrlParam) return fromUrl;

    const local = loadResults();
    const result: Record<TestSlug, CompositeTestParams | null> = {
      matrix: null, spatial: null, numerical: null,
      logical: null, verbal: null, memory: null,
    };
    for (const rec of local) {
      result[rec.testType as TestSlug] = {
        seed: rec.seed,
        answers: rec.answers,
        completedAt: rec.completedAt,
        signature: rec.signature,
      };
    }
    return result;
  }, [searchParams]);

  const hasLocalResults = useMemo(() => {
    const fromUrl = parseCompositeParams(searchParams);
    const urlHasAny = TEST_SLUGS.some((s) => fromUrl[s] !== null);
    return !urlHasAny && loadResults().length > 0;
  }, [searchParams]);

  // Fix 2: verify each test's signature. Only verified slugs count toward the composite.
  const [verifiedSlugs, setVerifiedSlugs] = useState<Set<TestSlug>>(new Set());
  const [verificationDone, setVerificationDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setVerificationDone(false);
    (async () => {
      const next = new Set<TestSlug>();
      await Promise.all(
        TEST_SLUGS.map(async (slug) => {
          const data = parsed[slug];
          if (!data || !data.signature) return; // empty sig never verifies
          try {
            const url = new URL('/api/verify', window.location.origin);
            url.searchParams.set('s', data.seed);
            url.searchParams.set('a', data.answers);
            url.searchParams.set('t', slug);
            url.searchParams.set('ct', data.completedAt);
            url.searchParams.set('sig', data.signature);
            const res = await fetch(url.toString());
            if (res.ok) {
              const j = await res.json();
              if (j?.valid) next.add(slug);
            }
          } catch {
            // network error → unverified (fail-closed)
          }
        })
      );
      if (!cancelled) {
        setVerifiedSlugs(next);
        setVerificationDone(true);
      }
    })();
    return () => { cancelled = true; };
  }, [parsed]);

  function handleClearConfirm() {
    clearResults();
    setConfirmClearOpen(false);
    // Force re-evaluation: simplest approach is a full reload so parsed/testIQs recompute
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  // Compute individual IQ scores for each completed AND verified test.
  const testIQs = useMemo(() => {
    const result: Partial<Record<TestSlug, number>> = {};

    for (const slug of TEST_SLUGS) {
      if (!verifiedSlugs.has(slug)) continue;
      const data = parsed[slug];
      if (!data) continue;

      const mod = TEST_MODULES[slug];
      const seed = decodeSeed(data.seed);
      const userAnswers = decodeAnswers(data.answers);

      // Generate correct answers
      const correctAnswers: number[] = [];
      for (let i = 0; i < mod.totalQuestions; i++) {
        const q = mod.generateQuestion(seed, i);
        correctAnswers.push(q.correctIndex);
      }

      const score = computeScore(userAnswers, correctAnswers);
      result[slug] = score.iq;
    }

    return result;
  }, [parsed, verifiedSlugs]);

  const completedSlugs = TEST_SLUGS.filter((s) => testIQs[s] !== undefined);
  const incompleteSlugs = TEST_SLUGS.filter((s) => testIQs[s] === undefined);
  const hasEnough = completedSlugs.length >= MIN_TESTS_FOR_COMPOSITE;

  const compositeIQ = useMemo(() => computeCompositeIQ(testIQs), [testIQs]);
  const compositePercentile = hasEnough ? calculatePercentile(compositeIQ) : 0;
  const compositeClassification = hasEnough ? getClassification(compositeIQ) : '';

  const resultsUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = hasEnough
    ? `My composite IQ across ${completedSlugs.length} cognitive tests is ${compositeIQ} on CalibratedIQ.org`
    : '';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(resultsUrl)}`;

  function handleCopyLink() {
    navigator.clipboard.writeText(resultsUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Fix 2: while verification is in flight, show spinner rather than briefly
  // rendering the not-enough-tests state with stale counts.
  if (!verificationDone) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-muted">Verifying results...</p>
      </div>
    );
  }

  // Not enough tests
  if (!hasEnough) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            composite IQ score
          </h1>
          <p className="text-sm text-muted">
            Complete at least {MIN_TESTS_FOR_COMPOSITE} tests to see your composite score
          </p>
        </div>

        {completedSlugs.length > 0 && (
          <div className="border border-border dark:border-border-dark rounded-lg p-5 mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-4">
              Completed ({completedSlugs.length} / {MIN_TESTS_FOR_COMPOSITE} minimum)
            </h2>
            {completedSlugs.map((slug) => (
              <div key={slug} className="flex items-center justify-between py-2">
                <span className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{TEST_META[slug].icon}</span>
                  {COMPOSITE_LABELS[slug]}
                </span>
                <span className="text-sm font-medium tabular-nums">IQ {testIQs[slug]}</span>
              </div>
            ))}
          </div>
        )}

        <div className="border border-border dark:border-border-dark rounded-lg p-5 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-4">
            Take more tests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {incompleteSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/test/${slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border dark:border-border-dark hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="text-xl">{TEST_META[slug].icon}</span>
                <span className="text-sm font-medium">{COMPOSITE_LABELS[slug]}</span>
              </Link>
            ))}
          </div>
        </div>

        {hasLocalResults && (
          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={() => setConfirmClearOpen(true)}
              className="text-xs text-muted hover:text-text dark:hover:text-text-dark underline underline-offset-2"
            >
              Clear saved results from this device
            </button>
          </div>
        )}

        <div className="flex justify-center">
          <AdPlaceholder zone="native" />
        </div>

        <ClearHistoryDialog
          open={confirmClearOpen}
          onConfirm={handleClearConfirm}
          onCancel={() => setConfirmClearOpen(false)}
        />
      </div>
    );
  }

  // Full composite results
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-14">
      {/* Top ad */}
      <div className="flex justify-center mb-8">
        <AdPlaceholder zone="banner" />
      </div>

      {/* Composite IQ Score */}
      <div className="text-center mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted mb-2">
          Your composite IQ ({completedSlugs.length} tests)
        </p>
        <p className="text-6xl sm:text-7xl font-bold tracking-tight mb-2">
          {compositeIQ}
        </p>
        <p className="text-lg font-medium text-primary dark:text-primary-light mb-1">
          {compositeClassification}
        </p>
        <p className="text-sm text-muted">
          You scored higher than {compositePercentile}% of the population
        </p>
      </div>

      {/* Radar Chart */}
      <div className="mb-10">
        <RadarChart
          scores={testIQs as Partial<Record<string, number>>}
          labels={COMPOSITE_LABELS as Record<string, string>}
        />
      </div>

      {/* Ad between chart and breakdown */}
      <div className="flex justify-center my-6">
        <AdPlaceholder zone="native" />
      </div>

      {/* Bell Curve */}
      <div className="flex justify-center mb-10">
        <BellCurve iq={compositeIQ} percentile={compositePercentile} />
      </div>

      {/* Individual test scores table */}
      <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-border dark:border-border-dark">
              <th className="text-left px-4 py-2.5 font-medium text-muted">Domain</th>
              <th className="text-right px-4 py-2.5 font-medium text-muted">Weight</th>
              <th className="text-right px-4 py-2.5 font-medium text-muted">IQ</th>
            </tr>
          </thead>
          <tbody>
            {TEST_SLUGS.map((slug) => {
              const iq = testIQs[slug];
              const completed = iq !== undefined;
              return (
                <tr
                  key={slug}
                  className="border-b border-border dark:border-border-dark last:border-b-0"
                >
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-2">
                      <span className="text-base">{TEST_META[slug].icon}</span>
                      {COMPOSITE_LABELS[slug]}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted">
                    {Math.round(COMPOSITE_WEIGHTS[slug] * 100)}%
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {completed ? (
                      <span className="font-medium">{iq}</span>
                    ) : (
                      <Link
                        href={`/test/${slug}`}
                        className="text-primary dark:text-primary-light hover:underline"
                      >
                        Take test
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-neutral-50 dark:bg-neutral-800/50">
              <td className="px-4 py-2.5 font-semibold" colSpan={2}>
                Weighted Composite
              </td>
              <td className="px-4 py-2.5 text-right tabular-nums font-bold text-lg">
                {compositeIQ}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mid ad */}
      <div className="flex justify-center mb-8">
        <AdPlaceholder zone="interstitial" />
      </div>

      {/* Share section */}
      <div className="border border-border dark:border-border-dark rounded-lg p-5 mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-4">
          Share your composite score
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-neutral-800 dark:bg-neutral-700 hover:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg transition-colors"
          >
            Share on X
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-border dark:border-border-dark rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            {copied ? 'Copied' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* Complete more tests */}
      {incompleteSlugs.length > 0 && (
        <div className="border border-border dark:border-border-dark rounded-lg p-5 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-4">
            Complete more tests for better accuracy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {incompleteSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/test/${slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border dark:border-border-dark hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="text-xl">{TEST_META[slug].icon}</span>
                <span className="text-sm font-medium">{COMPOSITE_LABELS[slug]}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Local results management */}
      {hasLocalResults && (
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setConfirmClearOpen(true)}
            className="text-xs text-muted hover:text-text dark:hover:text-text-dark underline underline-offset-2"
          >
            Clear saved results from this device
          </button>
        </div>
      )}

      {/* Bottom ad */}
      <div className="flex justify-center">
        <AdPlaceholder zone="native" />
      </div>

      <ClearHistoryDialog
        open={confirmClearOpen}
        onConfirm={handleClearConfirm}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </div>
  );
}

export default function CompositePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-sm text-muted">Calculating composite score...</p>
        </div>
      }
    >
      <CompositeContent />
    </Suspense>
  );
}
