'use client';

import { useCallback, useEffect, useState } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';
import type { ModuleId } from '@/lib/types';
import { firstSceneOf, modules, nextModuleId, scenesById } from '@/content/modules';

const KEY = 'conectaseguro.journey';

interface JourneyState {
  currentSceneId: string;
  completedModules: ModuleId[];
}

function initialState(): JourneyState {
  return { currentSceneId: firstSceneOf(1).id, completedModules: [] };
}

export function useJourney() {
  const [state, setState] = useState<JourneyState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readStorage(KEY, initialState()));
    setHydrated(true);
  }, []);

  const persist = useCallback((next: JourneyState) => {
    setState(next);
    writeStorage(KEY, next);
  }, []);

  const completeScene = useCallback(
    (sceneId: string) => {
      const scene = scenesById[sceneId];
      if (!scene) return;

      if (scene.next) {
        persist({ ...state, currentSceneId: scene.next });
        return;
      }

      const completedModules = state.completedModules.includes(scene.module)
        ? state.completedModules
        : [...state.completedModules, scene.module];
      const next = nextModuleId(scene.module);

      persist({
        currentSceneId: next ? firstSceneOf(next).id : sceneId,
        completedModules,
      });
    },
    [state, persist],
  );

  const currentScene = scenesById[state.currentSceneId];
  const journeyComplete = state.completedModules.length === modules.length;

  return { hydrated, currentScene, completedModules: state.completedModules, journeyComplete, completeScene };
}
