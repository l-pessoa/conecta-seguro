import { getSupabase } from '@/lib/server/supabase';
import { fail, ok, parseBody } from '@/lib/server/http';
import { quizSchema } from '@/lib/server/schemas';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const parsed = await parseBody(req, quizSchema);
  if ('error' in parsed) return parsed.error;
  const { code, form, phase, answers } = parsed.data;

  if (new Set(answers.map((a) => a.itemId)).size !== answers.length) return fail('invalido', 400);
  const unsure = answers.filter((a) => a.optionId === 'nao_sei').length;

  const db = getSupabase();
  let saved = false;
  if (db) {
    // A correcao acontece no banco (cs_salvar_quiz), com o gabarito que o navegador nunca ve.
    // Reenvio da fila substitui a resposta da mesma fase, sem duplicar.
    const { error } = await db.rpc('cs_salvar_quiz', {
      p_code: code,
      p_form: form,
      p_phase: phase,
      p_answers: answers,
    });
    if (error) {
      console.error('[api/quiz]', error.message);
      // As validacoes do banco levantam "... invalido(s)"; o resto e falha de servidor.
      return /invalid/.test(error.message) ? fail('invalido', 400) : fail('servidor', 500);
    }
    saved = true;
  }
  // Resposta propositalmente sem acerto/erro: o site nao mostra nota.
  return ok({ saved, answered: answers.length - unsure, unsure });
}
