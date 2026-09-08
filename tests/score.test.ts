import { describe, expect, it } from 'vitest';
import { scoreQuiz } from '@/lib/quizScore';
import { formA } from '@/content/quiz';

describe('correcao do quiz', () => {
  it('conta acertos e erros corretamente', () => {
    const answers = formA.map((item) => ({ itemId: item.id, optionId: item.correct }));
    const result = scoreQuiz('pre', formA, answers);

    expect(result.total).toBe(12);
    expect(result.correct).toBe(12);
  });

  it('resposta errada nao conta como acerto', () => {
    const item = formA[0];
    const wrongOption = item.options.find((o) => o.id !== item.correct)!;
    const result = scoreQuiz('pre', [item], [{ itemId: item.id, optionId: wrongOption.id }]);

    expect(result.correct).toBe(0);
    expect(result.byCompetency[item.competency]).toEqual({ total: 1, correct: 0 });
  });

  it('item sem resposta conta como erro, nao quebra', () => {
    const result = scoreQuiz('pre', formA, []);
    expect(result.correct).toBe(0);
    expect(result.total).toBe(12);
  });

  it('agrupa por competencia', () => {
    const answers = formA.map((item) => ({ itemId: item.id, optionId: item.correct }));
    const result = scoreQuiz('pre', formA, answers);
    const competencies = Object.keys(result.byCompetency);
    expect(competencies.length).toBe(12);
  });
});
