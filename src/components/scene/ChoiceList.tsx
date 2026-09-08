'use client';

import type { Choice } from '@/lib/types';

interface ChoiceListProps {
  prompt: string;
  choices: Choice[];
  onSelect: (choiceId: string) => void;
}

export function ChoiceList({ prompt, choices, onSelect }: ChoiceListProps) {
  return (
    <div className="choice-list">
      <p className="choice-prompt">{prompt}</p>
      <div className="choice-options">
        {choices.map((choice) => (
          <button key={choice.id} type="button" className="choice-button" onClick={() => onSelect(choice.id)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
