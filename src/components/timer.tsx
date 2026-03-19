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
    <span className="text-sm text-neutral-400 dark:text-neutral-500 tabular-nums font-mono select-none">
      {formatElapsed(elapsed)}
    </span>
  );
}
