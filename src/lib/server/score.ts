// Correcao pura (sem rede, sem segredo): recebe o gabarito como parametro,
// assim da pra testar sem tocar no arquivo secreto. Roda so no servidor.

export type OptionId = 'A' | 'B' | 'C' | 'D';
export type AnswerValue = OptionId | 'nao_sei';
export type Gabarito = Record<string, { correct: OptionId; competency: string }>;
export interface Answer {
  itemId: string;
  optionId: AnswerValue;
}
export interface ScoreResult {
  total: number; // itens da forma (sem resposta conta como erro)
  correct: number;
  unsure: number; // quantos "nao sei"
  byCompetency: Record<string, { total: number; correct: number }>;
}

export function scoreAnswers(gabarito: Gabarito, answers: Answer[]): ScoreResult {
  const byCompetency: ScoreResult['byCompetency'] = {};
  let correct = 0;
  let unsure = 0;

  for (const [itemId, key] of Object.entries(gabarito)) {
    const answer = answers.find((a) => a.itemId === itemId);
    const isCorrect = answer?.optionId === key.correct;
    if (isCorrect) correct += 1;
    if (answer?.optionId === 'nao_sei') unsure += 1;

    const bucket = byCompetency[key.competency] ?? { total: 0, correct: 0 };
    bucket.total += 1;
    if (isCorrect) bucket.correct += 1;
    byCompetency[key.competency] = bucket;
  }

  return { total: Object.keys(gabarito).length, correct, unsure, byCompetency };
}
