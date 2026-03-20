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

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      if (revealing) return;

      setClickedIndex(selectedIndex);

      setTimeout(() => {
        const newAnswers = answersStr + selectedIndex.toString();

        if (questionIndex >= totalQuestions - 1) {
          // Last question, go to results
          const storageKey = `ciq_start_${testSlug}`;
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          sessionStorage.removeItem(storageKey);
          router.replace(
            `/results/${testSlug}?s=${encodeSeed(seed)}&a=${newAnswers}&t=${elapsed}`
          );
        } else {
          // Next question
          router.replace(
            `/test/${testSlug}?s=${encodeSeed(seed)}&q=${questionIndex + 1}&a=${newAnswers}`
          );
        }
        setClickedIndex(null);
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
