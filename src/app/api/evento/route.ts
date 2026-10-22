import { getSupabase } from '@/lib/server/supabase';
import { fail, ok, parseBody } from '@/lib/server/http';
import { eventoSchema } from '@/lib/server/schemas';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const parsed = await parseBody(req, eventoSchema);
  if ('error' in parsed) return parsed.error;
  const { code, events } = parsed.data;

  const db = getSupabase();
  if (!db) return ok({ saved: 0 });
  // Reenvio da fila nao duplica (o banco ignora evento repetido).
  const { data, error } = await db.rpc('cs_registrar_eventos', { p_code: code, p_events: events });
  if (error) {
    console.error('[api/evento]', error.message);
    return fail('servidor', 500);
  }
  return ok({ saved: data as number });
}
