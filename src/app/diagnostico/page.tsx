'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { formA } from '@/content/quiz';

export default function DiagnosticoPage() {
  return (
    <Suspense fallback={null}>
      <DiagnosticoContent />
    </Suspense>
  );
}

function DiagnosticoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = searchParams.get('next') === 'modulos' ? '/modulos' : '/jornada';

  return (
    <main className="quiz-page page-shell">
      <header className="quiz-header">
        <h1>Diagnóstico</h1>
        <p>Antes de começar a jornada, responda com o que você faria de verdade. Pode pular o que não quiser responder.</p>
      </header>
      <QuizRunner phase="pre" items={formA} onComplete={() => router.push(destination)} />
    </main>
  );
}
