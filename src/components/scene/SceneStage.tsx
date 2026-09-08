'use client';

import { useState } from 'react';
import type { Scene } from '@/lib/types';
import { advanceLine, initialSceneState, selectChoice } from '@/engine/sceneMachine';
import { pacingFor } from '@/engine/pacing';
import { ParallaxBackground } from './ParallaxBackground';
import { WalkingCharacter } from './WalkingCharacter';
import { DialogueBox } from './DialogueBox';
import { ChoiceList } from './ChoiceList';
import { FeedbackPanel } from './FeedbackPanel';

interface SceneStageProps {
  scene: Scene;
  onComplete: (sceneId: string) => void;
}

/** Renderiza uma cena. Passe `key={scene.id}` no chamador pra reiniciar o estado a cada troca. */
export function SceneStage({ scene, onComplete }: SceneStageProps) {
  const [state, setState] = useState(initialSceneState);

  const selectedChoice = state.selectedChoiceId
    ? scene.choices.find((c) => c.id === state.selectedChoiceId) ?? null
    : null;

  const pace = pacingFor(selectedChoice?.quality ?? null);

  return (
    <div className="scene-stage">
      <ParallaxBackground env={scene.env} pace={pace} />
      <WalkingCharacter pace={pace} />

      <div className="scene-content">
        {state.phase === 'setup' && (
          <DialogueBox
            line={scene.setup[state.lineIndex]}
            onAdvance={() => setState((s) => advanceLine(s, scene.setup.length))}
          />
        )}

        {state.phase === 'decision' && (
          <ChoiceList
            prompt={scene.prompt}
            choices={scene.choices}
            onSelect={(choiceId) => setState((s) => selectChoice(s, choiceId))}
          />
        )}

        {state.phase === 'feedback' && selectedChoice && (
          <FeedbackPanel
            choice={selectedChoice}
            principle={scene.principle}
            continueLabel={scene.next ? 'Continuar' : 'Concluir módulo'}
            onContinue={() => onComplete(scene.id)}
          />
        )}
      </div>
    </div>
  );
}
