'use client';
import { useSyncExternalStore } from 'react';

const Q = '(prefers-reduced-motion: reduce)';

function subscribe(cb: () => void) {
  const m = window.matchMedia(Q);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
}

/** true quando a pessoa pediu menos movimento. No servidor retorna false. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(Q).matches,
    () => false,
  );
}
