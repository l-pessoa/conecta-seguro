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
  try {
    await db.from('participants').upsert({ code }, { onConflict: 'code', ignoreDuplicates: true });
    const rows = events.map((e) => ({ participant_code: code, type: e.type, ref: e.ref, at: e.at }));
    const { error } = await db
      .from('journey_events')
      .upsert(rows, { onConflict: 'participant_code,type,ref,at', ignoreDuplicates: true });
    if (error) throw error;
    return ok({ saved: rows.length });
  } catch (e) {
    console.error('[api/evento]', e);
    return fail('servidor', 500);
  }
}
