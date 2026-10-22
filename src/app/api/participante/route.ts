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
  // cs_registrar_participante devolve true se o codigo e novo no banco.
  const registrar = async (code: string) => {
    const { data, error } = await db!.rpc('cs_registrar_participante', {
      p_code: code,
      p_session_tag: sessionTag ?? null,
      p_consent_at: consentAt ?? null,
    });
    if (error) throw error;
    return data as boolean;
  };
  try {
    if (given) {
      // Codigo ja existe no navegador: so registra (ou completa) no banco.
      if (!db) return ok({ code: given, saved: false });
      await registrar(given);
      return ok({ code: given, saved: true });
    }

    // Sem codigo: o servidor sorteia um (tenta de novo se ja existir).
    for (let i = 0; i < 5; i++) {
      const code = newCode();
      if (!db) return ok({ code, saved: false });
      if (await registrar(code)) return ok({ code, saved: true });
    }
    return fail('servidor', 500);
  } catch (e) {
    console.error('[api/participante]', e);
    return fail('servidor', 500);
  }
}
