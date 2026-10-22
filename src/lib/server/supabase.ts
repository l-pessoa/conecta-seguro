import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Projeto Supabase do ConectaSeguro. A chave publishable e publica por design:
// as tabelas sao trancadas (RLS sem policy) e a unica porta de escrita sao as funcoes
// cs_* do supabase/schema.sql, que validam tudo e corrigem o quiz com o gabarito do banco.
// Fixos no codigo de proposito: nenhuma variavel de ambiente pode apontar o site para outro lugar.
const SUPABASE_URL = 'https://rotswylqsjollmwpnaxr.supabase.co';
const SUPABASE_CHAVE_PUBLICA = 'sb_publishable_q0Jtl-a3uDZnXZbs7OTpXw_fqY2tZAs';

let client: SupabaseClient | null | undefined;

/** Devolve o cliente Supabase, ou null se SUPABASE_DESLIGADO=1 (ex.: testes locais sem gravar). */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  client =
    process.env.SUPABASE_DESLIGADO === '1'
      ? null
      : createClient(SUPABASE_URL, SUPABASE_CHAVE_PUBLICA, { auth: { persistSession: false } });
  return client;
}
