'use client';

import type { DialogueLine } from '@/lib/types';

interface DialogueBoxProps {
  line: DialogueLine;
  onAdvance: () => void;
}

export function DialogueBox({ line, onAdvance }: DialogueBoxProps) {
  return (
    <button type="button" className="dialogue-box" onClick={onAdvance}>
      {line.speaker && <span className="dialogue-speaker">{line.speaker}</span>}
      <p className="dialogue-text">{line.text}</p>
      <span className="dialogue-hint">toque para continuar</span>
    </button>
  );
}
