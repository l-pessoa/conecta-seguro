'use client';

import { useRouter } from 'next/navigation';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { formA } from '@/content/quiz';

export default function DiagnosticoPage() {
  const router = useRouter();

  return (
    <main className="quiz-page page-shell">
      <header className="quiz-header">
        <h1>Diagnóstico</h1>
        <p>Antes de começar a jornada, responda com o que você faria de verdade.</p>
      </header>
      <QuizRunner phase="pre" items={formA} onComplete={() => router.push('/jornada')} />
    </main>
  );
}
