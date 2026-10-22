import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Projeto Supabase do ConectaSeguro. A chave publishable e publica por design:
// as tabelas sao trancadas (RLS sem policy) e a unica porta de escrita sao as funcoes
// cs_* do supabase/schema.sql, que validam tudo e corrigem o quiz com o gabarito do banco.
// Variaveis de ambiente sobrescrevem estes valores (ex.: outro projeto para testes).
const URL_PADRAO = 'https://rotswylqsjollmwpnaxr.supabase.co';
const CHAVE_PUBLICA_PADRAO = 'sb_publishable_q0Jtl-a3uDZnXZbs7OTpXw_fqY2tZAs';

let client: SupabaseClient | null | undefined;

/** Devolve o cliente Supabase, ou null se SUPABASE_DESLIGADO=1 (ex.: testes locais sem gravar). */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  if (process.env.SUPABASE_DESLIGADO === '1') {
    client = null;
    return null;
  }
  const url = process.env.SUPABASE_URL || URL_PADRAO;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || CHAVE_PUBLICA_PADRAO;
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
