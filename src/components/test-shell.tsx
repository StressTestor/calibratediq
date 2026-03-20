'use client';

import React, { Suspense, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { generateSeed, encodeSeed, decodeSeed } from '@/lib/prng';
import { encodeAnswers } from '@/lib/scoring';
import { ProgressBar } from '@/components/progress-bar';
import { Timer } from '@/components/timer';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { Question } from '@/lib/tests/types';

interface TestShellProps {
  testSlug: string;
  testName: string;
  questionRenderer: (questionData: unknown, isRevealing?: boolean) => ReactNode;
  optionRenderer: (option: unknown, index: number) => ReactNode;
  generateQuestion: (seed: number, questionIndex: number) => Question;
  totalQuestions: number;
  revealDuration?: number;
}

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

function TestShellContent({
  testSlug,
  testName,
  questionRenderer,
  optionRenderer,
  generateQuestion,
  totalQuestions,
  revealDuration,
}: TestShellProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [interstitial, setInterstitial] = useState<null | 'easy-to-medium' | 'medium-to-hard'>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const pendingNavigationRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Parse URL params
  const seedParam = searchParams.get('s');
  const questionParam = searchParams.get('q');
  const answersParam = searchParams.get('a');

  const seed = seedParam ? decodeSeed(seedParam) : 0;
  const questionIndex = questionParam ? parseInt(questionParam, 10) : 0;
  const answersStr = answersParam ?? '';

  // Initialize seed on mount if not present
  useEffect(() => {
    if (!seedParam) {
      const newSeed = generateSeed();
      const encoded = encodeSeed(newSeed);
      router.replace(`/test/${testSlug}?s=${encoded}&q=0&a=`);
    }
    setInitialized(true);
  }, [seedParam, router, testSlug]);

  // Track start time
  useEffect(() => {
    const storageKey = `ciq_start_${testSlug}`;
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      startTimeRef.current = parseInt(stored, 10);
    } else {
      const now = Date.now();
      startTimeRef.current = now;
      sessionStorage.setItem(storageKey, now.toString());
    }
  }, [testSlug]);

  // Handle reveal duration for memory test
  useEffect(() => {
    if (revealDuration && seedParam && initialized) {
      setRevealing(true);
      const timer = setTimeout(() => setRevealing(false), revealDuration);
      return () => clearTimeout(timer);
    }
  }, [revealDuration, seedParam, initialized, questionIndex]);

  // Auto-advance after interstitial (3 seconds)
  useEffect(() => {
    if (interstitial && pendingNavigationRef.current) {
      const timer = setTimeout(() => {
        const url = pendingNavigationRef.current;
        pendingNavigationRef.current = null;
        setInterstitial(null);
        if (url) router.replace(url);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [interstitial, router]);

  // Auto-redirect after analyzing screen (3 seconds)
  useEffect(() => {
    if (analyzing && pendingNavigationRef.current) {
      const timer = setTimeout(() => {
        const url = pendingNavigationRef.current;
        pendingNavigationRef.current = null;
        setAnalyzing(false);
        if (url) router.replace(url);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [analyzing, router]);

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      if (revealing) return;

      setClickedIndex(selectedIndex);

      setTimeout(() => {
        const newAnswers = answersStr + selectedIndex.toString();

        if (questionIndex >= totalQuestions - 1) {
          // Last question — show analyzing screen before results
          const storageKey = `ciq_start_${testSlug}`;
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          sessionStorage.removeItem(storageKey);
          pendingNavigationRef.current = `/results/${testSlug}?s=${encodeSeed(seed)}&a=${newAnswers}&t=${elapsed}`;
          setClickedIndex(null);
          setAnalyzing(true);
        } else if (questionIndex === 9) {
          // Easy → Medium transition
          pendingNavigationRef.current = `/test/${testSlug}?s=${encodeSeed(seed)}&q=${questionIndex + 1}&a=${newAnswers}`;
          setClickedIndex(null);
          setInterstitial('easy-to-medium');
        } else if (questionIndex === 21) {
          // Medium → Hard transition
          pendingNavigationRef.current = `/test/${testSlug}?s=${encodeSeed(seed)}&q=${questionIndex + 1}&a=${newAnswers}`;
          setClickedIndex(null);
          setInterstitial('medium-to-hard');
        } else {
          // Normal next question
          router.replace(
            `/test/${testSlug}?s=${encodeSeed(seed)}&q=${questionIndex + 1}&a=${newAnswers}`
          );
          setClickedIndex(null);
        }
      }, 150);
    },
    [answersStr, questionIndex, seed, router, totalQuestions, testSlug, revealing]
  );

  // Don't render until we have a seed
  if (!seedParam || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-muted">Generating test...</p>
      </div>
    );
  }

  const question = generateQuestion(seed, questionIndex);
  const showAd = questionIndex > 0 && questionIndex % 5 === 0;

  // Determine difficulty label
  let difficultyLabel = 'easy';
  if (questionIndex >= 22) difficultyLabel = 'hard';
  else if (questionIndex >= 10) difficultyLabel = 'medium';

  // Analyzing screen — shown after last question before redirect
  if (analyzing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
        {/* Progress and timer (frozen) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <ProgressBar current={totalQuestions} total={totalQuestions} />
          </div>
          <Timer startTime={startTimeRef.current} running={false} />
        </div>

        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <p className="text-lg font-medium mb-2 analyzing-pulse">
            Analyzing your responses...
          </p>
          <p className="text-sm text-muted mb-8">
            {totalQuestions} questions completed
          </p>

          {/* Progress bar animation */}
          <div className="w-full max-w-xs h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mb-8">
            <div className="h-full bg-teal-500 dark:bg-teal-400 rounded-full analyzing-bar" />
          </div>

          <div className="my-6">
            <AdPlaceholder zone="banner" />
          </div>
        </div>

        <style jsx>{`
          .analyzing-pulse {
            animation: pulse-opacity 1.5s ease-in-out infinite;
          }
          .analyzing-bar {
            animation: fill-bar 3s ease-out forwards;
          }
          @keyframes pulse-opacity {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes fill-bar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  // Tier transition interstitial
  if (interstitial) {
    const isEasyToMedium = interstitial === 'easy-to-medium';
    const transitionLabel = isEasyToMedium
      ? 'Easy complete \u2014 moving to Medium'
      : 'Medium complete \u2014 moving to Hard';
    const progressCount = isEasyToMedium ? 10 : 22;

    return (
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
        {/* Progress and timer (still visible) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <ProgressBar current={progressCount} total={totalQuestions} />
          </div>
          <Timer startTime={startTimeRef.current} running={true} />
        </div>

        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <p className="text-xs font-medium uppercase tracking-widest text-muted mb-3">
            Difficulty increasing
          </p>
          <p className="text-base font-medium mb-6">
            {transitionLabel}
          </p>

          {/* Countdown bar */}
          <div className="w-full max-w-xs h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mb-8">
            <div className="h-full bg-teal-500 dark:bg-teal-400 rounded-full interstitial-bar" />
          </div>

          <div className="my-6">
            <AdPlaceholder zone="interstitial" />
          </div>
        </div>

        <style jsx>{`
          .interstitial-bar {
            animation: fill-bar 3s linear forwards;
          }
          @keyframes fill-bar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Progress and timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 mr-4">
          <ProgressBar current={questionIndex + 1} total={totalQuestions} />
        </div>
        <Timer startTime={startTimeRef.current} running={true} />
      </div>

      {/* Difficulty label */}
      <div className="mb-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {difficultyLabel}
        </span>
      </div>

      {/* Question content */}
      <div className="flex justify-center mb-8">
        {questionRenderer(question.data, revealing)}
      </div>

      {/* Instructions */}
      <p className="text-sm text-muted text-center mb-6">
        Select the correct answer.
      </p>

      {/* Answer options */}
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg">
          {question.options.map((option, i) => {
            const isClicked = clickedIndex === i;

            let borderClass =
              'border-2 border-neutral-200 dark:border-neutral-700';
            if (isClicked) {
              borderClass = 'border-2 border-teal-500 dark:border-teal-400';
            }

            const hoverClass = !revealing
              ? 'hover:border-neutral-400 dark:hover:border-neutral-500 cursor-pointer'
              : 'opacity-60 cursor-default';

            return (
              <button
                key={i}
                type="button"
                disabled={revealing}
                onClick={() => handleAnswer(i)}
                className={`relative flex items-center justify-center rounded-lg p-2 transition-colors duration-100 bg-white dark:bg-neutral-900 ${borderClass} ${hoverClass}`}
                style={{ aspectRatio: '1 / 1' }}
              >
                <span className="absolute top-1 left-2 text-xs font-medium text-neutral-400 dark:text-neutral-500 select-none">
                  {LABELS[i]}
                </span>
                {optionRenderer(option, i)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ad every 5th question */}
      {showAd && (
        <div className="flex justify-center mt-4">
          <AdPlaceholder zone="native" />
        </div>
      )}
    </div>
  );
}

export function TestShell(props: TestShellProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-sm text-muted">Loading test...</p>
        </div>
      }
    >
      <TestShellContent {...props} />
    </Suspense>
  );
}
