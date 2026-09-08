'use client';

import { useRouter } from 'next/navigation';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { formB } from '@/content/quiz';

export default function AvaliacaoPage() {
  const router = useRouter();

  return (
    <main className="quiz-page">
      <header className="quiz-header">
        <h1>Avaliação final</h1>
        <p>Situações novas — vamos ver como fica depois da jornada.</p>
      </header>
      <QuizRunner phase="post" items={formB} onComplete={() => router.push('/resultado')} />
    </main>
  );
}
