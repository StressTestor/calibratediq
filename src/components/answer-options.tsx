'use client';

import React, { useState } from 'react';
import { type CellState } from '@/lib/constants';
import { CellRenderer } from '@/components/puzzle-renderer';

interface AnswerOptionsProps {
  options: CellState[];
  onSelect: (index: number) => void;
  disabled?: boolean;
  selectedIndex?: number | null;
}

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

export function AnswerOptions({
  options,
  onSelect,
  disabled = false,
  selectedIndex = null,
}: AnswerOptionsProps): React.ReactNode {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  function handleClick(index: number) {
    if (disabled) return;

    setClickedIndex(index);

    // Brief highlight before firing callback
    setTimeout(() => {
      onSelect(index);
      setClickedIndex(null);
    }, 150);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg">
      {options.map((option, i) => {
        const isSelected = selectedIndex === i;
        const isClicked = clickedIndex === i;

        let borderClass =
          'border-2 border-neutral-200 dark:border-neutral-700';

        if (isClicked || isSelected) {
          borderClass = 'border-2 border-teal-500 dark:border-teal-400';
        }

        const hoverClass =
          !disabled
            ? 'hover:border-neutral-400 dark:hover:border-neutral-500 cursor-pointer'
            : 'opacity-60 cursor-default';

        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => handleClick(i)}
            className={`relative flex items-center justify-center rounded-lg p-2 transition-colors duration-100 bg-white dark:bg-neutral-900 ${borderClass} ${hoverClass}`}
            style={{ aspectRatio: '1 / 1' }}
          >
            <span className="absolute top-1 left-2 text-xs font-medium text-neutral-400 dark:text-neutral-500 select-none">
              {LABELS[i]}
            </span>
            <CellRenderer cell={option} size={80} />
          </button>
        );
      })}
    </div>
  );
}
