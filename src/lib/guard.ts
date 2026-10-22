'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useJourney } from './journey';

/** Telas depois da entrada exigem o assentimento. Sem ele, volta para /entrar. Devolve true quando pode renderizar. */
export function useConsentGuard(): boolean {
  const router = useRouter();
  const { ready, state } = useJourney();
  useEffect(() => {
    if (ready && !state.consent) router.replace('/entrar');
  }, [ready, state.consent, router]);
  return ready && state.consent;
}
