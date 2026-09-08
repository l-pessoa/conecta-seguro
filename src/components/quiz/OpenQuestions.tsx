'use client';

import { Button } from '@/components/ui/Button';

const QUESTIONS = [
  'O que você vai fazer diferente a partir de hoje?',
  'Teve alguma situação que te fez lembrar de algo que você já viveu?',
  'Ficou alguma dúvida que você gostaria de perguntar pra alguém de confiança?',
];

interface OpenQuestionsProps {
  answers: string[];
  onChange: (index: number, value: string) => void;
  onSubmit: () => void;
}

export function OpenQuestions({ answers, onChange, onSubmit }: OpenQuestionsProps) {
  return (
    <div className="open-questions panel">
      <h2>Pra fechar</h2>
      <p className="open-questions-hint">Essas perguntas são opcionais — responda só se quiser.</p>
      {QUESTIONS.map((question, index) => (
        <label key={question} className="open-question">
          {question}
          <textarea
            value={answers[index] ?? ''}
            onChange={(e) => onChange(index, e.target.value)}
            rows={3}
          />
        </label>
      ))}
      <Button onClick={onSubmit}>Ver resultado</Button>
    </div>
  );
}
