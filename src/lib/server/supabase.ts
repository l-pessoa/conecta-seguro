import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Projeto Supabase do ConectaSeguro. A chave publishable e publica por design:
// as tabelas sao trancadas (RLS sem policy) e a unica porta de escrita sao as funcoes
// cs_* do supabase/schema.sql, que validam tudo e corrigem o quiz com o gabarito do banco.
// Fixos no codigo de proposito: nenhuma variavel de ambiente pode apontar o site para outro lugar.
const SUPABASE_URL = 'https://rotswylqsjollmwpnaxr.supabase.co';
const SUPABASE_CHAVE_PUBLICA = 'sb_publishable_q0Jtl-a3uDZnXZbs7OTpXw_fqY2tZAs';

let client: SupabaseClient | null | undefined;

/**
 * Devolve o cliente Supabase, ou null quando nao deve gravar.
 * So grava rodando na Vercel (VERCEL=1): testes no computador (npm run dev/start, prints,
 * auditorias automaticas) nao criam "alunos" falsos no banco da coleta.
 * Para testar a gravacao localmente de proposito: SUPABASE_GRAVAR_LOCAL=1.
 */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const naVercel = process.env.VERCEL === '1';
  const gravarLocal = process.env.SUPABASE_GRAVAR_LOCAL === '1';
  client =
    naVercel || gravarLocal
      ? createClient(SUPABASE_URL, SUPABASE_CHAVE_PUBLICA, { auth: { persistSession: false } })
      : null;
  return client;
}
