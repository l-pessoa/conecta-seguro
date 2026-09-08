'use client';

import { useState } from 'react';
import type { QuizAnswer, QuizItem, QuizOptionId, QuizPhase, QuizResult } from '@/lib/types';
import { scoreQuiz } from '@/lib/quizScore';
import { readStorage, writeStorage } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { QuestionCard } from './QuestionCard';
import { OpenQuestions } from './OpenQuestions';

interface QuizRunnerProps {
  phase: QuizPhase;
  items: QuizItem[];
  onComplete: (result: QuizResult) => void;
}

export function QuizRunner({ phase, items, onComplete }: QuizRunnerProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showOpenQuestions, setShowOpenQuestions] = useState(false);
  const [openAnswers, setOpenAnswers] = useState<string[]>(['', '', '']);

  const currentItem = items[index];
  const currentAnswer = answers.find((a) => a.itemId === currentItem?.id)?.optionId ?? null;
  const isLast = index === items.length - 1;

  function selectOption(optionId: QuizOptionId) {
    setAnswers((prev) => {
      const rest = prev.filter((a) => a.itemId !== currentItem.id);
      return [...rest, { itemId: currentItem.id, optionId }];
    });
  }

  function goNext() {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    if (phase === 'post') {
      setShowOpenQuestions(true);
      return;
    }
    finish();
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function finish() {
    const result = scoreQuiz(phase, items, answers);
    writeStorage(`conectaseguro.quiz.${phase}`, result);
    if (phase === 'post') {
      writeStorage('conectaseguro.openAnswers', openAnswers);
    }
    onComplete(result);
  }

  if (showOpenQuestions) {
    return (
      <OpenQuestions
        answers={openAnswers}
        onChange={(i, value) => setOpenAnswers((prev) => prev.map((a, idx) => (idx === i ? value : a)))}
        onSubmit={finish}
      />
    );
  }

  return (
    <div className="quiz-runner">
      <QuestionCard
        item={currentItem}
        index={index}
        total={items.length}
        selected={currentAnswer}
        onSelect={selectOption}
      />
      <div className="quiz-actions">
        {index > 0 ? (
          <Button variant="ghost" onClick={goBack}>
            Voltar
          </Button>
        ) : (
          <span />
        )}
        <Button variant="ghost" onClick={goNext}>
          Pular
        </Button>
        {currentAnswer && <Button onClick={goNext}>{isLast ? 'Continuar' : 'Próxima'}</Button>}
      </div>
    </div>
  );
}

export function readQuizResult(phase: QuizPhase): QuizResult | null {
  return readStorage<QuizResult | null>(`conectaseguro.quiz.${phase}`, null);
}
