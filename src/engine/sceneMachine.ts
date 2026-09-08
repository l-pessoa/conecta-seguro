export type ScenePhase = 'setup' | 'decision' | 'feedback';

export interface SceneRuntimeState {
  phase: ScenePhase;
  lineIndex: number;
  selectedChoiceId: string | null;
}

export const initialSceneState: SceneRuntimeState = {
  phase: 'setup',
  lineIndex: 0,
  selectedChoiceId: null,
};

export function advanceLine(state: SceneRuntimeState, totalLines: number): SceneRuntimeState {
  if (state.lineIndex + 1 < totalLines) {
    return { ...state, lineIndex: state.lineIndex + 1 };
  }
  return { ...state, phase: 'decision' };
}

export function selectChoice(state: SceneRuntimeState, choiceId: string): SceneRuntimeState {
  return { ...state, phase: 'feedback', selectedChoiceId: choiceId };
}

export function resetScene(): SceneRuntimeState {
  return initialSceneState;
}
