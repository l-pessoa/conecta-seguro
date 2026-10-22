import { randomInt } from 'node:crypto';
import { getSupabase } from '@/lib/server/supabase';
import { fail, ok, parseBody } from '@/lib/server/http';
import { participanteSchema } from '@/lib/server/schemas';

export const runtime = 'nodejs';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem I, O, 0, 1 (confundem)
const newCode = () => 'CS-' + Array.from({ length: 5 }, () => CHARS[randomInt(CHARS.length)]).join('');

export async function POST(req: Request) {
  const parsed = await parseBody(req, participanteSchema);
  if ('error' in parsed) return parsed.error;
  const { code: given, sessionTag, consentAt } = parsed.data;

  const db = getSupabase();
  try {
    if (given) {
      // Codigo ja existe no navegador: so registra (ou atualiza) no banco.
      let saved = false;
      if (db) {
        const row: Record<string, unknown> = { code: given };
        if (sessionTag !== undefined) row.session_tag = sessionTag;
        if (consentAt !== undefined) row.consent_at = consentAt;
        const { error } = await db.from('participants').upsert(row, { onConflict: 'code' });
        if (error) throw error;
        saved = true;
      }
      return ok({ code: given, saved });
    }

    // Sem codigo: o servidor sorteia um (tenta de novo se repetir).
    for (let i = 0; i < 5; i++) {
      const code = newCode();
      if (!db) return ok({ code, saved: false });
      const { error } = await db
        .from('participants')
        .insert({ code, session_tag: sessionTag ?? null, consent_at: consentAt ?? null });
      if (!error) return ok({ code, saved: true });
      if (error.code !== '23505') throw error; // 23505 = codigo repetido
    }
    return fail('servidor', 500);
  } catch (e) {
    console.error('[api/participante]', e);
    return fail('servidor', 500);
  }
}
