'use client';

import type { DeepDive } from '@/lib/types';

interface DeepDiveSheetProps {
  deepDive: DeepDive;
  onOpen?: () => void;
}

export function DeepDiveSheet({ deepDive, onOpen }: DeepDiveSheetProps) {
  return (
    <details className="deepdive" onToggle={(e) => e.currentTarget.open && onOpen?.()}>
      <summary>Quero entender melhor: {deepDive.title}</summary>
      <p>{deepDive.body}</p>
    </details>
  );
}
