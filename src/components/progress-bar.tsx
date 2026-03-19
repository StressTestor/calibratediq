import React from 'react';

interface ProgressBarProps {
  current: number; // 1-30
  total: number;   // 30
}

export function ProgressBar({ current, total }: ProgressBarProps): React.ReactNode {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          Question {current} of {total}
        </span>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-600 dark:bg-teal-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
