'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useJourney } from '@/engine/useJourney';

export default function JornadaIndexPage() {
  const router = useRouter();
  const { hydrated, currentScene, journeyComplete } = useJourney();

  useEffect(() => {
    if (!hydrated) return;
    if (journeyComplete) {
      router.replace('/avaliacao');
      return;
    }
    if (currentScene) {
      router.replace(`/jornada/${currentScene.module}`);
    }
  }, [hydrated, currentScene, journeyComplete, router]);

  return null;
}
