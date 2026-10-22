import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null | undefined;
let warned = false;

/** Devolve o cliente Supabase, ou null se as chaves nao estiverem no ambiente. */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    if (!warned) {
      console.warn('[backend] SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY ausentes: nada sera salvo.');
      warned = true;
    }
    client = null;
    return null;
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
