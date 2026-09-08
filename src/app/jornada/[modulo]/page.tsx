'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useJourney } from '@/engine/useJourney';
import { modulesById, nextModuleId } from '@/content/modules';
import { SceneStage } from '@/components/scene/SceneStage';
import { DeepDiveSheet } from '@/components/scene/DeepDiveSheet';
import { ProgressTrail } from '@/components/ui/ProgressTrail';
import { Button } from '@/components/ui/Button';
import type { ModuleId } from '@/lib/types';

export default function ModulePage() {
  const params = useParams<{ modulo: string }>();
  const router = useRouter();
  const { hydrated, currentScene, completedModules, journeyComplete, completeScene } = useJourney();
  const [finishedModuleId, setFinishedModuleId] = useState<ModuleId | null>(null);

  const routeModuleId = Number(params.modulo) as ModuleId;

  useEffect(() => {
    if (!hydrated || finishedModuleId) return;
    if (currentScene && currentScene.module !== routeModuleId) {
      router.replace(`/jornada/${currentScene.module}`);
    }
  }, [hydrated, currentScene, routeModuleId, finishedModuleId, router]);

  if (!hydrated) return null;

  if (finishedModuleId) {
    const mod = modulesById[finishedModuleId];
    const next = nextModuleId(finishedModuleId);

    return (
      <main className="module-summary">
        <h2>Módulo concluído</h2>
        <p>{mod.title}</p>
        <DeepDiveSheet deepDive={mod.deepDive} />
        {mod.closing && (
          <div className="module-closing panel">
            <h3>Se desconfiar de um acesso</h3>
            <ol>
              {mod.closing.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>
        )}
        <Button onClick={() => router.push(journeyComplete || !next ? '/avaliacao' : `/jornada/${next}`)}>
          {journeyComplete || !next ? 'Ir pra avaliação final' : 'Continuar'}
        </Button>
      </main>
    );
  }

  if (!currentScene || currentScene.module !== routeModuleId) return null;

  const mod = modulesById[routeModuleId];

  return (
    <main className="module-page">
      <ProgressTrail completedModules={completedModules} currentModule={routeModuleId} />
      <header className="module-header">
        <h1>{mod.title}</h1>
        <span>{mod.logic}</span>
      </header>
      <SceneStage
        key={currentScene.id}
        scene={currentScene}
        onComplete={(sceneId) => {
          const scene = currentScene;
          completeScene(sceneId);
          if (!scene.next) setFinishedModuleId(scene.module);
        }}
      />
    </main>
  );
}
