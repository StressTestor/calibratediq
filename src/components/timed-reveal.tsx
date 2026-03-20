'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface TimedRevealProps {
  duration: number; // milliseconds to show the stimulus
  children: ReactNode; // The stimulus content
  onRevealComplete: () => void; // Called when the stimulus is hidden
}

type RevealState = 'ready' | 'revealing' | 'hidden';

export function TimedReveal({ duration, children, onRevealComplete }: TimedRevealProps) {
  const [state, setState] = useState<RevealState>('ready');
  const [countdown, setCountdown] = useState(Math.ceil(duration / 1000));
  const onCompleteRef = useRef(onRevealComplete);
  onCompleteRef.current = onRevealComplete;

  // ready -> revealing -> hidden
  useEffect(() => {
    // Show "Ready" for 500ms, then start revealing
    const readyTimer = setTimeout(() => {
      setState('revealing');
    }, 500);
    return () => clearTimeout(readyTimer);
  }, []);

  // Countdown during revealing phase
  useEffect(() => {
    if (state !== 'revealing') return;

    const totalSeconds = Math.ceil(duration / 1000);
    setCountdown(totalSeconds);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Hide after duration
    const hideTimer = setTimeout(() => {
      setState('hidden');
      onCompleteRef.current();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, [state, duration]);

  if (state === 'ready') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-sm font-medium uppercase tracking-widest text-teal-500 animate-pulse">
          Get ready
        </div>
      </div>
    );
  }

  if (state === 'hidden') {
    return null;
  }

  // revealing
  return (
    <div className="relative">
      {/* Countdown overlay */}
      <div className="absolute top-0 right-0 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-bl-lg bg-neutral-100 dark:bg-neutral-800 border-b border-l border-neutral-200 dark:border-neutral-700">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Memorize
        </span>
        <span className="text-sm font-mono font-semibold text-teal-500 tabular-nums min-w-[1ch] text-center">
          {countdown}
        </span>
      </div>

      {/* Stimulus content */}
      <div
        className={`transition-opacity duration-300 ${
          countdown === 0 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
