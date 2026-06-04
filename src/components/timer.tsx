'use client';

import React, { useState, useEffect } from 'react';

interface TimerProps {
  startTime: number; // Date.now() when test started
  running: boolean;
}

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function Timer({ startTime, running }: TimerProps): React.ReactNode {
  const [elapsed, setElapsed] = useState(() => Date.now() - startTime);

  useEffect(() => {
    if (!running) return;

    // Sync immediately
    setElapsed(Date.now() - startTime);

    const id = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(id);
  }, [startTime, running]);

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-2 dark:bg-surface-2-dark text-xs font-mono tabular-nums text-muted select-none">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="8" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 6.2V9l2 1.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 2h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      {formatElapsed(elapsed)}
    </span>
  );
}
