import { describe, expect, it } from 'vitest';
import { modules, scenesById } from '@/content/modules';

describe('integridade do conteudo', () => {
  it('cada modulo tem exatamente 2 cenas essenciais', () => {
    for (const mod of modules) {
      expect(mod.scenes.length, `modulo ${mod.id}`).toBe(2);
    }
  });

  it('cada cena tem exatamente uma opcao "melhor"', () => {
    for (const mod of modules) {
      for (const scene of mod.scenes) {
        const best = scene.choices.filter((c) => c.quality === 'melhor');
        expect(best.length, `cena ${scene.id}`).toBe(1);
      }
    }
  });

  it('cada cena tem 4 alternativas, todas com feedback', () => {
    for (const mod of modules) {
      for (const scene of mod.scenes) {
        expect(scene.choices.length, `cena ${scene.id}`).toBe(4);
        for (const choice of scene.choices) {
          expect(choice.feedback.length, `${scene.id} / ${choice.id}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('todo "next" aponta para uma cena existente ou null', () => {
    for (const mod of modules) {
      for (const scene of mod.scenes) {
        if (scene.next === null) continue;
        expect(scenesById[scene.next], `cena ${scene.id} -> ${scene.next}`).toBeDefined();
      }
    }
  });

  it('a ultima cena de cada modulo tem next null', () => {
    for (const mod of modules) {
      const last = mod.scenes[mod.scenes.length - 1];
      expect(last.next, `modulo ${mod.id}`).toBeNull();
    }
  });

  it('todo modulo tem um aprofundamento com titulo e corpo', () => {
    for (const mod of modules) {
      expect(mod.deepDive.title.length, `modulo ${mod.id}`).toBeGreaterThan(0);
      expect(mod.deepDive.body.length, `modulo ${mod.id}`).toBeGreaterThan(0);
    }
  });
});
