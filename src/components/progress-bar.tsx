import React from 'react';

interface ProgressBarProps {
  current: number; // 1-30
  total: number;   // 30
}

export function ProgressBar({ current, total }: ProgressBarProps): React.ReactNode {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-medium text-muted">
          Question <span className="tabular-nums text-text dark:text-text-dark">{current}</span> of {total}
        </span>
      </div>
      <div className="w-full h-2 bg-surface-2 dark:bg-surface-2-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-primary dark:bg-primary-light rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
