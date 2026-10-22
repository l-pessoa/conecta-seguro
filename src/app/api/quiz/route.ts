import { getSupabase } from '@/lib/server/supabase';
import { GABARITO } from '@/lib/server/gabarito';
import { scoreAnswers } from '@/lib/server/score';
import { fail, ok, parseBody } from '@/lib/server/http';
import { quizSchema } from '@/lib/server/schemas';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const parsed = await parseBody(req, quizSchema);
  if ('error' in parsed) return parsed.error;
  const { code, form, phase, answers } = parsed.data;

  const key = GABARITO[form];
  const ids = new Set(answers.map((a) => a.itemId));
  if (ids.size !== answers.length || answers.some((a) => !(a.itemId in key))) {
    return fail('invalido', 400);
  }

  const score = scoreAnswers(key, answers);
  const unsure = answers.filter((a) => a.optionId === 'nao_sei').length;

  const db = getSupabase();
  let saved = false;
  if (db) {
    try {
      // Garante que o participante existe (a ordem das requisicoes pode se inverter na fila offline).
      await db.from('participants').upsert({ code }, { onConflict: 'code', ignoreDuplicates: true });
      const { error } = await db.from('quiz_responses').upsert(
        {
          participant_code: code,
          form,
          phase,
          answers,
          score: score.correct,
          total: score.total,
          unsure,
          by_competency: score.byCompetency,
        },
        { onConflict: 'participant_code,phase' }, // reenvio da fila nao duplica
      );
      if (error) throw error;
      saved = true;
    } catch (e) {
      console.error('[api/quiz]', e);
      return fail('servidor', 500);
    }
  }
  // Resposta propositalmente sem acerto/erro: o site nao mostra nota.
  return ok({ saved, answered: answers.length - unsure, unsure });
}
