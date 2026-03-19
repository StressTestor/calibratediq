'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { generateTest } from '@/lib/puzzle-generator';
import { decodeSeed, encodeSeed, generateSeed } from '@/lib/prng';
import { computeScore, decodeAnswers } from '@/lib/scoring';
import { BellCurve } from '@/components/bell-curve';
import { AdPlaceholder } from '@/components/ad-placeholder';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m} min ${s} sec`;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [challengeCopied, setChallengeCopied] = useState(false);

  const seedParam = searchParams.get('s');
  const answersParam = searchParams.get('a');
  const timeParam = searchParams.get('t');

  const seed = seedParam ? decodeSeed(seedParam) : 0;
  const userAnswers = answersParam ? decodeAnswers(answersParam) : [];
  const timeTaken = timeParam ? parseInt(timeParam, 10) : null;

  const result = useMemo(() => {
    if (!seedParam || !answersParam) return null;

    const puzzles = generateTest(seed);
    const correctAnswers = puzzles.map((p) => p.correctOptionIndex);
    return computeScore(userAnswers, correctAnswers);
  }, [seed, seedParam, answersParam, userAnswers]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-sm text-muted mb-4">
            No test results found.
          </p>
          <Link
            href="/test"
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
          >
            Take the Test
          </Link>
        </div>
      </div>
    );
  }

  const resultsUrl =
    typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `I scored ${result.iq} on CalibratedIQ.org`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(resultsUrl)}`;
  const challengeUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/test`
      : 'https://calibratediq.org/test';

  function handleCopyLink() {
    navigator.clipboard.writeText(resultsUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleCopyChallenge() {
    navigator.clipboard.writeText(challengeUrl).then(() => {
      setChallengeCopied(true);
      setTimeout(() => setChallengeCopied(false), 2000);
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-14">
      {/* Top ad */}
      <div className="flex justify-center mb-8">
        <AdPlaceholder zone="banner" />
      </div>

      {/* IQ Score */}
      <div className="text-center mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted mb-2">
          Your estimated IQ
        </p>
        <p className="text-6xl sm:text-7xl font-bold tracking-tight mb-2">
          {result.iq}
        </p>
        <p className="text-lg font-medium text-primary dark:text-primary-light mb-1">
          {result.classification}
        </p>
        <p className="text-sm text-muted">
          You scored higher than {result.percentile}% of the population
        </p>
        {result.mensaQualified && (
          <p className="text-sm font-medium text-primary dark:text-primary-light mt-2">
            This score would qualify for Mensa membership (top 2%)
          </p>
        )}
      </div>

      {/* Bell Curve */}
      <div className="flex justify-center mb-10">
        <BellCurve iq={result.iq} percentile={result.percentile} />
      </div>

      {/* Breakdown */}
      <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-border dark:border-border-dark">
              <th className="text-left px-4 py-2.5 font-medium text-muted">
                Section
              </th>
              <th className="text-right px-4 py-2.5 font-medium text-muted">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border dark:border-border-dark">
              <td className="px-4 py-2.5">Easy (Q1-10)</td>
              <td className="px-4 py-2.5 text-right tabular-nums">
                {result.easyCorrect} / 10
              </td>
            </tr>
            <tr className="border-b border-border dark:border-border-dark">
              <td className="px-4 py-2.5">Medium (Q11-22)</td>
              <td className="px-4 py-2.5 text-right tabular-nums">
                {result.mediumCorrect} / 12
              </td>
            </tr>
            <tr className="border-b border-border dark:border-border-dark">
              <td className="px-4 py-2.5">Hard (Q23-30)</td>
              <td className="px-4 py-2.5 text-right tabular-nums">
                {result.hardCorrect} / 8
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium">Total</td>
              <td className="px-4 py-2.5 text-right tabular-nums font-medium">
                {result.rawScore} / 30
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Time taken */}
      <div className="text-center text-sm text-muted mb-8">
        Time taken:{' '}
        {timeTaken !== null ? formatTime(timeTaken) : 'Not recorded'}
      </div>

      {/* Mid ad */}
      <div className="flex justify-center mb-8">
        <AdPlaceholder zone="interstitial" />
      </div>

      {/* Share section */}
      <div className="border border-border dark:border-border-dark rounded-lg p-5 mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-4">
          Share your score
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

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <Link
          href="/test"
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
        >
          Take Another Test
        </Link>
        <button
          type="button"
          onClick={handleCopyChallenge}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium border border-border dark:border-border-dark rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          {challengeCopied ? 'Link Copied' : 'Challenge a Friend'}
        </button>
      </div>

      {/* Bottom ad */}
      <div className="flex justify-center">
        <AdPlaceholder zone="native" />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-sm text-muted">Calculating results...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
