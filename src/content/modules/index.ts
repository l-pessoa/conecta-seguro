import type { ModuleDefinition, ModuleId, Scene } from '@/lib/types';
import { module1 } from './module-1-senhas';
import { module2 } from './module-2-links';
import { module3 } from './module-3-golpes';
import { module4 } from './module-4-privacidade';
import { module5 } from './module-5-redes';
import { module6 } from './module-6-reagir';

export const modules: ModuleDefinition[] = [module1, module2, module3, module4, module5, module6];

export const modulesById: Record<ModuleId, ModuleDefinition> = {
  1: module1,
  2: module2,
  3: module3,
  4: module4,
  5: module5,
  6: module6,
};

export const scenesById: Record<string, Scene> = Object.fromEntries(
  modules.flatMap((m) => m.scenes.map((s) => [s.id, s])),
);

export function firstSceneOf(moduleId: ModuleId): Scene {
  return modulesById[moduleId].scenes[0];
}

export function nextModuleId(moduleId: ModuleId): ModuleId | null {
  const idx = modules.findIndex((m) => m.id === moduleId);
  const next = modules[idx + 1];
  return next ? next.id : null;
}
