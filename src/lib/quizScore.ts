import type { QuizAnswer, QuizItem, QuizPhase, QuizResult } from './types';

/**
 * TEMPORARIO: correcao roda no cliente enquanto nao existe backend (fase
 * atual = testar front). Antes de qualquer coleta real, isso precisa virar
 * uma chamada a /api/quiz, com o gabarito migrado para src/lib/server/answers.ts
 * (regra 28 do design). Ver docs/PROXIMOS-PASSOS.md.
 */
export function scoreQuiz(phase: QuizPhase, items: QuizItem[], answers: QuizAnswer[]): QuizResult {
  const byCompetency: QuizResult['byCompetency'] = {};
  let correct = 0;

  for (const item of items) {
    const answer = answers.find((a) => a.itemId === item.id);
    const isCorrect = answer?.optionId === item.correct;
    if (isCorrect) correct += 1;

    const bucket = byCompetency[item.competency] ?? { total: 0, correct: 0 };
    bucket.total += 1;
    if (isCorrect) bucket.correct += 1;
    byCompetency[item.competency] = bucket;
  }

  return { phase, total: items.length, correct, byCompetency };
}
