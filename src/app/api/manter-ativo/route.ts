import { getSupabase } from '@/lib/server/supabase';
import { fail, ok } from '@/lib/server/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Chamada 1x/dia pelo cron da Vercel (vercel.json). O Supabase gratuito pausa o banco
// depois de 7 dias sem acesso; este "oi" diario evita que respostas se percam na coleta.
// Nao le nem grava dados: cs_ping so devolve a hora do banco.
export async function GET() {
  const db = getSupabase();
  if (!db) return ok({ ativo: false });
  const { data, error } = await db.rpc('cs_ping');
  if (error) {
    console.error('[api/manter-ativo]', error.message);
    return fail('servidor', 500);
  }
  return ok({ ativo: true, banco: data });
}
