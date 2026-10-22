import { describe, expect, it } from 'vitest';
import { scoreAnswers, type Gabarito } from '@/lib/server/score';

const key: Gabarito = {
  'x-1': { correct: 'A', competency: 'Senhas' },
  'x-2': { correct: 'C', competency: 'Senhas' },
  'x-3': { correct: 'B', competency: 'Golpes' },
};

describe('correcao no servidor', () => {
  it('conta todos os acertos', () => {
    const r = scoreAnswers(key, [
      { itemId: 'x-1', optionId: 'A' },
      { itemId: 'x-2', optionId: 'C' },
      { itemId: 'x-3', optionId: 'B' },
    ]);
    expect(r.correct).toBe(3);
    expect(r.total).toBe(3);
  });

  it('resposta errada nao conta', () => {
    const r = scoreAnswers(key, [{ itemId: 'x-1', optionId: 'D' }]);
    expect(r.correct).toBe(0);
  });

  it('nao_sei e erro e e contado a parte', () => {
    const r = scoreAnswers(key, [
      { itemId: 'x-1', optionId: 'nao_sei' },
      { itemId: 'x-2', optionId: 'C' },
    ]);
    expect(r.correct).toBe(1);
    expect(r.unsure).toBe(1);
  });

  it('item sem resposta conta como erro e nao quebra', () => {
    const r = scoreAnswers(key, []);
    expect(r).toMatchObject({ correct: 0, total: 3, unsure: 0 });
  });

  it('agrupa por competencia', () => {
    const r = scoreAnswers(key, [
      { itemId: 'x-1', optionId: 'A' },
      { itemId: 'x-3', optionId: 'A' },
    ]);
    expect(r.byCompetency).toEqual({ Senhas: { total: 2, correct: 1 }, Golpes: { total: 1, correct: 0 } });
  });

  it('ignora itemId que nao existe no gabarito', () => {
    const r = scoreAnswers(key, [{ itemId: 'zzz', optionId: 'A' }]);
    expect(r.correct).toBe(0);
  });
});
