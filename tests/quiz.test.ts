import { describe, expect, it } from 'vitest';
import { formA, formB } from '@/content/quiz';
import { ITEMS_PER_MODULE, MODULE_IDS } from '@/content/quiz/blueprint';

function itemsByModule(items: typeof formA) {
  const map = new Map<number, typeof formA>();
  for (const item of items) {
    map.set(item.module, [...(map.get(item.module) ?? []), item]);
  }
  return map;
}

describe('formularios do quiz', () => {
  it('cada forma tem 12 itens', () => {
    expect(formA.length).toBe(12);
    expect(formB.length).toBe(12);
  });

  it('cada forma tem 2 itens por modulo', () => {
    for (const form of [formA, formB]) {
      const byModule = itemsByModule(form);
      for (const moduleId of MODULE_IDS) {
        expect(byModule.get(moduleId)?.length, `modulo ${moduleId}`).toBe(ITEMS_PER_MODULE);
      }
    }
  });

  it('cada item tem 4 opcoes e uma resposta correta valida', () => {
    for (const form of [formA, formB]) {
      for (const item of form) {
        expect(item.options.length, item.id).toBe(4);
        const ids = item.options.map((o) => o.id);
        expect(ids, item.id).toContain(item.correct);
      }
    }
  });

  it('forma B e par isomorfico da forma A: mesma competencia, mesma ordem por modulo', () => {
    const aByModule = itemsByModule(formA);
    const bByModule = itemsByModule(formB);

    for (const moduleId of MODULE_IDS) {
      const a = aByModule.get(moduleId) ?? [];
      const b = bByModule.get(moduleId) ?? [];
      for (let i = 0; i < ITEMS_PER_MODULE; i++) {
        expect(b[i]?.competency, `modulo ${moduleId} item ${i}`).toBe(a[i]?.competency);
      }
    }
  });

  it('nenhum item da forma B repete o texto de situacao da forma A', () => {
    const situationsA = new Set(formA.map((i) => i.situation));
    for (const item of formB) {
      expect(situationsA.has(item.situation), item.id).toBe(false);
    }
  });
});
