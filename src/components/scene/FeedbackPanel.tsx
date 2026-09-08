'use client';

import type { Choice } from '@/lib/types';
import { Button } from '@/components/ui/Button';

interface FeedbackPanelProps {
  choice: Choice;
  principle: string;
  onContinue: () => void;
  continueLabel: string;
}

export function FeedbackPanel({ choice, principle, onContinue, continueLabel }: FeedbackPanelProps) {
  return (
    <div className={`feedback-panel feedback-panel--${choice.quality}`}>
      <p className="feedback-text">{choice.feedback}</p>
      <p className="feedback-principle">{principle}</p>
      <Button onClick={onContinue}>{continueLabel}</Button>
    </div>
  );
}
