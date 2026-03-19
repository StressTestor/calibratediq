'use client';

import React, { Suspense, useState, useCallback, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { generatePuzzle } from '@/lib/puzzle-generator';
import { generateSeed, encodeSeed, decodeSeed } from '@/lib/prng';
import { encodeAnswers } from '@/lib/scoring';
import { TOTAL_QUESTIONS } from '@/lib/constants';
import { PuzzleGrid } from '@/components/puzzle-renderer';
import { AnswerOptions } from '@/components/answer-options';
import { ProgressBar } from '@/components/progress-bar';
import { Timer } from '@/components/timer';
import { AdPlaceholder } from '@/components/ad-placeholder';

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
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
      router.replace(`/test?s=${encoded}&q=0&a=`);
    }
    setInitialized(true);
  }, [seedParam, router]);

  // Track start time
  useEffect(() => {
    const stored = sessionStorage.getItem('ciq_start');
    if (stored) {
      startTimeRef.current = parseInt(stored, 10);
    } else {
      const now = Date.now();
      startTimeRef.current = now;
      sessionStorage.setItem('ciq_start', now.toString());
    }
  }, []);

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      const newAnswers = answersStr + selectedIndex.toString();

      if (questionIndex >= TOTAL_QUESTIONS - 1) {
        // Last question, go to results
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        sessionStorage.removeItem('ciq_start');
        router.replace(
          `/results?s=${encodeSeed(seed)}&a=${newAnswers}&t=${elapsed}`
        );
      } else {
        // Next question
        router.replace(
          `/test?s=${encodeSeed(seed)}&q=${questionIndex + 1}&a=${newAnswers}`
        );
      }
    },
    [answersStr, questionIndex, seed, router]
  );

  // Don't render until we have a seed
  if (!seedParam || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-muted">Generating test...</p>
      </div>
    );
  }

  const puzzle = generatePuzzle(seed, questionIndex);
  const showAd = questionIndex > 0 && questionIndex % 5 === 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Progress and timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 mr-4">
          <ProgressBar current={questionIndex + 1} total={TOTAL_QUESTIONS} />
        </div>
        <Timer startTime={startTimeRef.current} running={true} />
      </div>

      {/* Difficulty label */}
      <div className="mb-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {puzzle.difficulty}
        </span>
      </div>

      {/* Puzzle grid */}
      <div className="flex justify-center mb-8">
        <PuzzleGrid grid={puzzle.grid} gridSize={puzzle.gridSize} />
      </div>

      {/* Instructions */}
      <p className="text-sm text-muted text-center mb-6">
        Select the pattern that completes the matrix.
      </p>

      {/* Answer options */}
      <div className="flex justify-center mb-8">
        <AnswerOptions
          options={puzzle.options}
          onSelect={handleAnswer}
        />
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

export default function TestPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-sm text-muted">Loading test...</p>
        </div>
      }
    >
      <TestContent />
    </Suspense>
  );
}
