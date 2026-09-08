'use client';

import { useEffect, useState } from 'react';
import type { QuizResult } from '@/lib/types';
import { readQuizResult } from '@/components/quiz/QuizRunner';
import { ResultSummary } from '@/components/result/ResultSummary';
import { closingMessage, closingSteps } from '@/content/closing';

export default function ResultadoPage() {
  const [pre, setPre] = useState<QuizResult | null>(null);
  const [post, setPost] = useState<QuizResult | null>(null);

  useEffect(() => {
    setPre(readQuizResult('pre'));
    setPost(readQuizResult('post'));
  }, []);

  return (
    <main className="result-page">
      <h1>Jornada concluída</h1>
      <ol className="closing-steps">
        {closingSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="closing-message">{closingMessage}</p>
      <ResultSummary pre={pre} post={post} />
    </main>
  );
}
