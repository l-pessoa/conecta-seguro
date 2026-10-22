import { describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { formA, formB } from '@/content/quiz';
import { ITEMS_PER_MODULE, MODULE_IDS } from '@/content/quiz/blueprint';
import { GABARITO } from '@/lib/server/gabarito';
import type { FormaQuiz } from '@/content/types';

const formas: [string, 'A' | 'B', FormaQuiz][] = [
  ['A (pre)', 'A', formA],
  ['B (pos)', 'B', formB],
];

function porModulo(items: FormaQuiz) {
  const map = new Map<number, FormaQuiz>();
  for (const item of items) map.set(item.modulo, [...(map.get(item.modulo) ?? []), item]);
  return map;
}

const media = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

describe('formas do quiz', () => {
  it('cada forma tem 12 itens, 2 por modulo, 4 opcoes A-D', () => {
    for (const [nome, , form] of formas) {
      expect(form.length, nome).toBe(12);
      const m = porModulo(form);
      for (const id of MODULE_IDS) expect(m.get(id)?.length, `${nome} modulo ${id}`).toBe(ITEMS_PER_MODULE);
      for (const item of form) expect(item.opcoes.map((o) => o.id), item.id).toEqual(['A', 'B', 'C', 'D']);
    }
  });

  it('o conteudo do quiz NAO carrega a resposta correta', () => {
    for (const [, , form] of formas) {
      for (const item of form) {
        expect(Object.keys(item).sort(), item.id).toEqual(['competencia', 'id', 'modulo', 'opcoes', 'pergunta', 'situacao']);
      }
    }
  });

  it('forma B e par isomorfico da A: mesma competencia, mesma ordem por modulo', () => {
    const a = porModulo(formA);
    const b = porModulo(formB);
    for (const id of MODULE_IDS) {
      for (let i = 0; i < ITEMS_PER_MODULE; i++) {
        expect(b.get(id)?.[i].competencia, `modulo ${id} item ${i}`).toBe(a.get(id)?.[i].competencia);
      }
    }
  });

  it('nenhum item da B repete a situacao da A', () => {
    const sa = new Set(formA.map((i) => i.situacao));
    for (const item of formB) expect(sa.has(item.situacao), item.id).toBe(false);
  });

  it('texto enxuto: situacao ate 150 car, alternativas ate 90 car', () => {
    for (const [, , form] of formas) {
      for (const item of form) {
        expect(item.situacao.length, item.id).toBeLessThanOrEqual(150);
        for (const o of item.opcoes) expect(o.t.length, `${item.id}/${o.id}`).toBeLessThanOrEqual(90);
      }
    }
  });
});

describe('gabarito (servidor)', () => {
  it('tem exatamente os ids de cada forma, com competencia igual a do item', () => {
    for (const [nome, chave, form] of formas) {
      expect(Object.keys(GABARITO[chave]).sort(), nome).toEqual(form.map((i) => i.id).sort());
      for (const item of form) {
        expect(GABARITO[chave][item.id].competency, item.id).toBe(item.competencia);
        expect(GABARITO[chave][item.id].conceito.length, item.id).toBeGreaterThan(0);
      }
    }
  });

  it('as corretas ficam 3 A, 3 B, 3 C, 3 D em cada forma', () => {
    for (const [nome, chave] of formas) {
      const cont = { A: 0, B: 0, C: 0, D: 0 };
      for (const e of Object.values(GABARITO[chave])) cont[e.correct] += 1;
      expect(cont, nome).toEqual({ A: 3, B: 3, C: 3, D: 3 });
    }
  });

  it('em cada par A<->B a correta fica em posicao diferente', () => {
    for (const a of formA) {
      const b = formB.find((x) => x.modulo === a.modulo && formA.filter((y) => y.modulo === a.modulo).indexOf(a) === formB.filter((y) => y.modulo === a.modulo).indexOf(x))!;
      expect(GABARITO.A[a.id].correct, `${a.id} x ${b.id}`).not.toBe(GABARITO.B[b.id].correct);
    }
  });

  it('a correta nao e sempre a mais longa e tem tamanho parecido com as erradas', () => {
    for (const [nome, chave, form] of formas) {
      let maisLonga = 0;
      for (const item of form) {
        const certa = GABARITO[chave][item.id].correct;
        const tam = item.opcoes.map((o) => o.t.length);
        const tamCerta = item.opcoes.find((o) => o.id === certa)!.t.length;
        const erradas = item.opcoes.filter((o) => o.id !== certa).map((o) => o.t.length);
        if (tamCerta >= Math.max(...tam)) maisLonga += 1;
        const razao = tamCerta / media(erradas);
        expect(razao, `${item.id} razao ${razao.toFixed(2)}`).toBeGreaterThanOrEqual(0.8);
        expect(razao, `${item.id} razao ${razao.toFixed(2)}`).toBeLessThanOrEqual(1.2);
      }
      expect(maisLonga, `${nome}: correta e a mais longa em ${maisLonga} de 12`).toBeLessThanOrEqual(4);
    }
  });

  it('a correta tambem nao e a mais curta em mais de 4 itens por forma', () => {
    for (const [nome, chave, form] of formas) {
      let maisCurta = 0;
      for (const item of form) {
        const certa = GABARITO[chave][item.id].correct;
        const tam = item.opcoes.map((o) => o.t.length);
        if (item.opcoes.find((o) => o.id === certa)!.t.length <= Math.min(...tam)) maisCurta += 1;
      }
      expect(maisCurta, `${nome}: correta e a mais curta em ${maisCurta} de 12`).toBeLessThanOrEqual(4);
    }
  });
});

describe('pistas que entregam a resposta', () => {
  const VOCAB = /oficial|verific|confirm|canal|recurso|segur/i;
  // dois verbos de acao ligados por "e": " e " seguido de verbo conjugado ou infinitivo
  const DOIS_VERBOS = /\b\p{L}{3,}\b[^,.;:]*\se\s+\p{L}{3,}(?:o|ei|ar|er|ir)\b/iu;
  const ABSOLUTO = /\b(nunca|sempre)\b/i;

  function itens() {
    return formas.flatMap(([, chave, form]) =>
      form.map((item) => {
        const certa = GABARITO[chave][item.id].correct;
        return {
          id: item.id,
          certa: item.opcoes.find((o) => o.id === certa)!.t,
          erradas: item.opcoes.filter((o) => o.id !== certa).map((o) => o.t),
        };
      }),
    );
  }

  it('a correta nao e a unica com vocabulario de seguranca', () => {
    for (const { id, certa, erradas } of itens()) {
      if (VOCAB.test(certa)) expect(erradas.some((t) => VOCAB.test(t)), id).toBe(true);
    }
  });

  it('a correta nao e a unica com dois verbos de acao ligados por "e"', () => {
    for (const { id, certa, erradas } of itens()) {
      if (DOIS_VERBOS.test(certa)) expect(erradas.some((t) => DOIS_VERBOS.test(t)), id).toBe(true);
    }
  });

  it('expressoes de assinatura da correta tambem aparecem nas erradas (ou em nenhuma)', () => {
    const ASSINATURA = /sem o link|por conta própria|que já (tenho|uso|tinha)|direto no (app|site)/i;
    for (const { id, certa, erradas } of itens()) {
      if (ASSINATURA.test(certa)) expect(erradas.some((t) => ASSINATURA.test(t)), id).toBe(true);
    }
  });

  it('nao ha "nunca/sempre" so nas erradas', () => {
    for (const { id, certa, erradas } of itens()) {
      if (!ABSOLUTO.test(certa)) expect(erradas.some((t) => ABSOLUTO.test(t)), id).toBe(false);
    }
  });

  it('enunciados neutros: nada de "mais completa", "mais segura" ou "melhor pratica"', () => {
    for (const [, , form] of formas) {
      for (const item of form) expect(item.pergunta, item.id).not.toMatch(/mais completa|mais segura|melhor pr[aá]tica|mais adequad/i);
    }
  });
});

describe('gabarito do banco (supabase/schema.sql)', () => {
  it('bate exatamente com src/lib/server/gabarito.ts', async () => {
    const { readFileSync } = await import('node:fs');
    const sql = readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8');
    const linhas = [...sql.matchAll(/\('([AB])','([a-z0-9-]+)','([A-D])','([^']+)'\)/g)];
    const doBanco = Object.fromEntries(linhas.map(([, f, id, c, comp]) => [`${f}:${id}`, `${c}|${comp}`]));
    const doCodigo = Object.fromEntries(
      (['A', 'B'] as const).flatMap((f) =>
        Object.entries(GABARITO[f]).map(([id, e]) => [`${f}:${id}`, `${e.correct}|${e.competency}`]),
      ),
    );
    expect(doBanco).toEqual(doCodigo);
  });
});
