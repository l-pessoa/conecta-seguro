import type { Cena, Modulo, ModuloId } from '../types';
import { module1 } from './module-1-senhas';
import { module2 } from './module-2-links';
import { module3 } from './module-3-golpes';
import { module4 } from './module-4-privacidade';
import { module5 } from './module-5-redes';
import { module6 } from './module-6-reagir';

export const modules: Modulo[] = [module1, module2, module3, module4, module5, module6];

export const modulesById: Record<ModuloId, Modulo> = {
  1: module1,
  2: module2,
  3: module3,
  4: module4,
  5: module5,
  6: module6,
};

export const cenasById: Record<string, Cena> = Object.fromEntries(
  modules.flatMap((m) => m.cenas.map((c) => [c.id, c])),
);

export function nextModuleId(id: ModuloId): ModuloId | null {
  const idx = modules.findIndex((m) => m.id === id);
  return modules[idx + 1]?.id ?? null;
}

/** Regra mostrada no cartao "Retomada" da abertura do modulo `id` (resumo do modulo anterior). */
export function retomadaPara(id: ModuloId): string | null {
  const idx = modules.findIndex((m) => m.id === id);
  return idx > 0 ? modules[idx - 1].retomada : null;
}

export { home } from '../home';
export { consent, introPre, introPos } from '../consent';
export { result } from '../result';
export { quiz, formA, formB, formFor } from '../quiz';
export { ROTULO_QUALIDADE } from '../types';
export type * from '../types';
