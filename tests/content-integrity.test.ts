import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { cenasById, modules } from '@/content/modules';
import { COBERTURA } from '@/content/quiz/cobertura';
import { formA, formB } from '@/content/quiz';
import type { CenaEscolha, CenaSinal, CenaIlustracao } from '@/content/types';

const root = join(__dirname, '..');
const todasAsCenas = modules.flatMap((m) => m.cenas);
const escolhas = todasAsCenas.filter((c): c is CenaEscolha => c.tipo === 'escolha' || c.tipo === 'mensagem' || c.tipo === 'medidor');
const trechos = (s: string) => [...s.matchAll(/\[\[(.+?)\]\]/g)].map((m) => m[1]);
const limpo = (s: string) => s.replace(/\[\[|\]\]/g, '');

describe('estrutura dos modulos', () => {
  it('tem 6 modulos, cada um com 3 cenas, lema de 3 verbos e 3 itens de pratica', () => {
    expect(modules.map((m) => m.id)).toEqual([1, 2, 3, 4, 5, 6]);
    for (const m of modules) {
      expect(m.cenas.length, `modulo ${m.id}`).toBe(3);
      expect(m.lema.length).toBe(3);
      expect(m.pratica.length).toBe(3);
      expect(m.retomada.length, `retomada ${m.id}`).toBeGreaterThan(0);
    }
  });

  it('o verbo de cada cena e o verbo do lema, na ordem', () => {
    for (const m of modules) {
      m.cenas.forEach((c, i) => {
        expect(c.verbo, c.id).toBe(m.lema[i]);
        expect(c.modulo, c.id).toBe(m.id);
        expect(c.id).toBe(`m${m.id}-c${i + 1}`);
      });
    }
  });

  it('ids de cena sao unicos', () => {
    expect(Object.keys(cenasById).length).toBe(18);
  });
});

describe('limites de texto (cabem no celular)', () => {
  it('respeita os limites de caracteres', () => {
    for (const m of modules) {
      expect(m.titulo.length, `titulo ${m.id}`).toBeLessThanOrEqual(28);
      expect(m.gancho.length, `gancho ${m.id}`).toBeLessThanOrEqual(110);
      m.pratica.forEach((p, i) => expect(p.length, `pratica ${m.id}.${i}`).toBeLessThanOrEqual(60));
      for (const c of m.cenas) {
        expect(limpo(c.mock.body).length, `${c.id} body`).toBeLessThanOrEqual(140);
        expect(c.pergunta.length, `${c.id} pergunta`).toBeLessThanOrEqual(70);
        expect(c.regra.length, `${c.id} regra`).toBeLessThanOrEqual(90);
        if (c.saibaMais) expect(c.saibaMais.length, `${c.id} saibaMais`).toBeLessThanOrEqual(120);
        if (c.tipo === 'escolha' || c.tipo === 'mensagem' || c.tipo === 'medidor') {
          for (const o of c.opcoes) {
            expect(o.t.length, `${c.id}/${o.id} t`).toBeLessThanOrEqual(70);
            expect(o.porque.length, `${c.id}/${o.id} porque`).toBeLessThanOrEqual(150);
          }
        } else if ('pontos' in c) {
          for (const p of c.pontos) expect(p.porque.length, `${c.id}/${p.id}`).toBeLessThanOrEqual(150);
        }
      }
    }
  });
});

describe('cenas de escolha', () => {
  it('tem 3 opcoes a/b/c, uma "melhor", todas com porque', () => {
    for (const c of escolhas) {
      expect(c.opcoes.map((o) => o.id), c.id).toEqual(['a', 'b', 'c']);
      expect(c.opcoes.filter((o) => o.q === 'melhor').length, c.id).toBe(1);
      for (const o of c.opcoes) expect(o.porque.trim().length, `${c.id}/${o.id}`).toBeGreaterThan(0);
    }
  });

  it('a posicao da melhor varia: sem 3 iguais seguidas e cada posicao aparece 4 vezes ou mais', () => {
    const chaves = escolhas.map((c) => c.opcoes.find((o) => o.q === 'melhor')!.id);
    expect(chaves.length).toBe(16);
    for (let i = 2; i < chaves.length; i++) {
      expect(!(chaves[i] === chaves[i - 1] && chaves[i] === chaves[i - 2]), `sequencia em ${i}: ${chaves.join('')}`).toBe(true);
    }
    for (const pos of ['a', 'b', 'c']) {
      expect(chaves.filter((k) => k === pos).length, `posicao ${pos}: ${chaves.join('')}`).toBeGreaterThanOrEqual(4);
    }
  });

  it('a melhor nao e a mais longa em mais de 40% das cenas, nem a unica a repetir vocabulario de seguranca', () => {
    const maisLonga = escolhas.filter((c) => c.tipo !== 'medidor').filter((c) => {
      const tam = c.opcoes.map((o) => o.t.length);
      return c.opcoes.find((o) => o.q === 'melhor')!.t.length >= Math.max(...tam);
    });
    expect(maisLonga.length / (escolhas.length - 1)).toBeLessThanOrEqual(0.4);
  });

  it('o medidor tem forca em todas as opcoes e a melhor e a mais forte', () => {
    for (const c of escolhas.filter((x) => x.tipo === 'medidor')) {
      for (const o of c.opcoes) expect(o.forca, `${c.id}/${o.id}`).toBeDefined();
      const melhor = c.opcoes.find((o) => o.q === 'melhor')!;
      expect(melhor.forca).toBe(Math.max(...c.opcoes.map((o) => o.forca!)));
    }
  });

  it('as opcoes "exagero" so existem onde cabem (nunca como a melhor)', () => {
    for (const c of escolhas) {
      for (const o of c.opcoes) if (o.q === 'exagero') expect(o.q).not.toBe('melhor');
    }
    expect(escolhas.some((c) => c.opcoes.some((o) => o.q === 'exagero'))).toBe(true);
  });
});

describe('cenas de toque', () => {
  const sinais = todasAsCenas.filter((c): c is CenaSinal => c.tipo === 'sinal');
  const ilus = todasAsCenas.filter((c): c is CenaIlustracao => c.tipo === 'ilustracao');

  it('um ponto por [[trecho]] do mock, com 1 neutro e 2 ou mais sinais', () => {
    expect(sinais.length).toBeGreaterThan(0);
    for (const c of sinais) {
      const t = [...trechos(c.mock.from), ...trechos(c.mock.body)];
      expect(c.pontos.map((p) => p.t).sort(), c.id).toEqual([...t].sort());
      expect(c.pontos.filter((p) => !p.sinal).length, c.id).toBe(1);
      expect(c.pontos.filter((p) => p.sinal).length, c.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('a ilustracao tem pontos com id unico e area valida (0-100%)', () => {
    expect(ilus.length).toBeGreaterThan(0);
    for (const c of ilus) {
      expect(c.descricao.length).toBeGreaterThan(0);
      expect(new Set(c.pontos.map((p) => p.id)).size, c.id).toBe(c.pontos.length);
      expect(c.pontos.filter((p) => !p.sinal).length, c.id).toBe(1);
      for (const p of c.pontos) {
        const a = p.area!;
        expect(a, `${c.id}/${p.id}`).toBeDefined();
        expect(a.x).toBeGreaterThanOrEqual(0);
        expect(a.y).toBeGreaterThanOrEqual(0);
        expect(a.x + a.w).toBeLessThanOrEqual(100);
        expect(a.y + a.h).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe('alinhamento ensino e avaliacao', () => {
  it('todo item do quiz esta ligado a cena(s) do mesmo modulo', () => {
    for (const item of [...formA, ...formB]) {
      const cenas = COBERTURA[item.id];
      expect(cenas?.length, `item ${item.id}`).toBeGreaterThan(0);
      for (const id of cenas) {
        expect(cenasById[id], `${item.id} -> ${id}`).toBeDefined();
        expect(cenasById[id].modulo, `${item.id} -> ${id}`).toBe(item.modulo);
      }
    }
    expect(Object.keys(COBERTURA).length).toBe(12);
  });
});

describe('nomes proibidos', () => {
  const proibido = /\b(j[uú]lia|laura)/i;
  function arquivos(dir: string): string[] {
    return readdirSync(dir).flatMap((nome) => {
      const p = join(dir, nome);
      return statSync(p).isDirectory() ? arquivos(p) : [p];
    });
  }

  it('nenhum texto de conteudo usa esses nomes', () => {
    const dirs = ['src/content', 'src/components', 'src/app'].map((d) => join(root, d));
    for (const dir of dirs.filter((d) => existsSync(d))) {
      for (const f of arquivos(dir).filter((x) => /\.(ts|tsx|md|txt)$/.test(x))) {
        expect(proibido.test(readFileSync(f, 'utf8')), f).toBe(false);
      }
    }
  });
});
