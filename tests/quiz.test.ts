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
});
