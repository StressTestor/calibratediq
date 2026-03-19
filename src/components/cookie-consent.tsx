'use client';

import React, { useState, useEffect } from 'react';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function CookieConsent(): React.ReactNode {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    setCookie('cookie_consent', 'accepted', 365);
    setVisible(false);
  }

  function handleDecline() {
    setCookie('cookie_consent', 'declined', 365);
    setVisible(false);
  }

  if (!visible) return <></>;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 shadow-lg">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 flex-1">
          This site uses cookies for analytics and advertising. By continuing, you accept our cookie policy.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDecline}
            type="button"
            className="px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            type="button"
            className="px-3 py-1.5 text-xs rounded bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
