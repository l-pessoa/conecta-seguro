'use client';

import { useEffect, useState } from 'react';
import type { Scene } from '@/lib/types';
import { advanceLine, initialSceneState, selectChoice } from '@/engine/sceneMachine';
import { pacingFor, type Pace } from '@/engine/pacing';
import { WalkingCharacter } from './WalkingCharacter';
import { DialogueBox } from './DialogueBox';
import { ChoiceList } from './ChoiceList';
import { FeedbackPanel } from './FeedbackPanel';

interface SceneStageProps {
  scene: Scene;
  onComplete: (sceneId: string) => void;
  onPaceChange?: (pace: Pace) => void;
}

/** Renderiza o primeiro plano de uma cena. O fundo (ParallaxBackground) fica a cargo da página. */
export function SceneStage({ scene, onComplete, onPaceChange }: SceneStageProps) {
  const [state, setState] = useState(initialSceneState);

  const selectedChoice = state.selectedChoiceId
    ? scene.choices.find((c) => c.id === state.selectedChoiceId) ?? null
    : null;

  const pace = pacingFor(selectedChoice?.quality ?? null);

  useEffect(() => {
    onPaceChange?.(pace);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pace.label]);

  return (
    <div className="scene-stage">
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
