'use client';

import React, { useState } from 'react';
import { calculatePercentile, getClassification, IQ_FLOOR, IQ_CEILING } from '@/lib/scoring';
import { BellCurve } from '@/components/bell-curve';

export function PercentileCalculator(): React.ReactNode {
  const [iqInput, setIqInput] = useState<string>('100');

  const iq = Math.max(IQ_FLOOR, Math.min(IQ_CEILING, parseInt(iqInput, 10) || 100));
  const percentile = calculatePercentile(iq);
  const classification = getClassification(iq);
  const mensaQualified = iq >= 130;
  const higherThan = Math.round(percentile * 10) / 10;

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 p-6">
      <h3 className="text-base font-semibold mb-4">IQ percentile calculator</h3>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <label htmlFor="iq-input" className="text-sm text-muted whitespace-nowrap">
          Enter IQ score:
        </label>
        <input
          id="iq-input"
          type="number"
          min={IQ_FLOOR}
          max={IQ_CEILING}
          value={iqInput}
          onChange={(e) => setIqInput(e.target.value)}
          className="w-24 px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {iqInput && !isNaN(parseInt(iqInput, 10)) && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
              <div className="text-xs text-muted uppercase tracking-wider mb-1">Percentile</div>
              <div className="text-2xl font-bold text-primary">{percentile}th</div>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
              <div className="text-xs text-muted uppercase tracking-wider mb-1">Classification</div>
              <div className="text-lg font-semibold">{classification}</div>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
              <div className="text-xs text-muted uppercase tracking-wider mb-1">Higher than</div>
              <div className="text-2xl font-bold text-primary">{higherThan}%</div>
              <div className="text-xs text-muted">of the population</div>
            </div>
          </div>

          <p className="text-sm text-muted">
            An IQ of {iq} places you in the {percentile}th percentile. This means you scored higher
            than approximately {higherThan}% of the population on a standardized IQ test.
          </p>

          {mensaQualified && (
            <div className="rounded-lg border border-teal-300 dark:border-teal-700 bg-teal-50 dark:bg-teal-900/30 p-4 text-sm text-muted">
              <strong className="text-text dark:text-text-dark">Mensa qualification:</strong>{' '}
              A score of {iq} places you at or above the 98th percentile, which meets the threshold
              for{' '}
              <a
                href="https://www.mensa.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-text dark:hover:text-text-dark transition-colors"
              >
                Mensa International
              </a>{' '}
              membership. Mensa accepts individuals who score in the top 2% on a recognized,
              supervised intelligence test.
            </div>
          )}

          <div className="flex justify-center mt-4">
            <BellCurve iq={iq} percentile={percentile} />
          </div>
        </div>
      )}
    </div>
  );
}
