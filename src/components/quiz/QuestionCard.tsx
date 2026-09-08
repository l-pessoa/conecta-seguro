'use client';

import type { QuizItem, QuizOptionId } from '@/lib/types';

interface QuestionCardProps {
  item: QuizItem;
  index: number;
  total: number;
  selected: QuizOptionId | null;
  onSelect: (optionId: QuizOptionId) => void;
}

export function QuestionCard({ item, index, total, selected, onSelect }: QuestionCardProps) {
  return (
    <div className="quiz-card panel">
      <span className="quiz-progress">
        {index + 1} de {total}
      </span>
      <p className="quiz-situation">{item.situation}</p>
      <p className="quiz-prompt">{item.prompt}</p>
      <div className="quiz-options">
        {item.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`quiz-option ${selected === option.id ? 'quiz-option--selected' : ''}`.trim()}
            onClick={() => onSelect(option.id)}
          >
            <span className="quiz-option-letter">{option.id}</span>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
