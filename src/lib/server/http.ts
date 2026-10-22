import 'server-only';
import { NextResponse } from 'next/server';
import type { ZodType } from 'zod';

const MAX_BYTES = 20_000;

export const ok = (data: Record<string, unknown> = {}) => NextResponse.json({ ok: true, ...data });
export const fail = (error: 'invalido' | 'grande' | 'servidor', status: number) =>
  NextResponse.json({ ok: false, error }, { status });

/** Le o JSON com limite de tamanho e valida com zod. Devolve dados ou uma resposta de erro. */
export async function parseBody<T>(req: Request, schema: ZodType<T>): Promise<{ data: T } | { error: NextResponse }> {
  const declared = Number(req.headers.get('content-length') ?? 0);
  if (declared > MAX_BYTES) return { error: fail('grande', 413) };
  const text = await req.text();
  if (text.length > MAX_BYTES) return { error: fail('grande', 413) };
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return { error: fail('invalido', 400) };
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) return { error: fail('invalido', 400) };
  return { data: parsed.data };
}
