'use client';

import React, { useEffect } from 'react';

interface ClearHistoryDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ClearHistoryDialog({ open, onConfirm, onCancel }: ClearHistoryDialogProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-history-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        className="max-w-sm w-full bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border-dark p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="clear-history-title" className="text-base font-semibold mb-2">
          Clear all saved results?
        </h2>
        <p className="text-sm text-muted mb-5">
          This removes every test you have completed on this device. You cannot undo this.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-border dark:border-border-dark hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Clear results
          </button>
        </div>
      </div>
    </div>
  );
}
