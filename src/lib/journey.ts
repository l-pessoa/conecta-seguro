'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';
import type { QuizAnswerId, QuizPhase, SceneAnswer } from '@/lib/types';

const KEY = 'conectaseguro.v2.journey';

export interface JourneyState {
  v: 2;
  consent: boolean;
  /** respostas por id de cena ('m1-c1') */
  scenes: Record<string, SceneAnswer>;
  /** modulos concluidos (chegaram ao fecho) */
  done: number[];
  pre: Record<string, QuizAnswerId>;
  post: Record<string, QuizAnswerId>;
  preDone: boolean;
  postDone: boolean;
}

const INITIAL: JourneyState = { v: 2, consent: false, scenes: {}, done: [], pre: {}, post: {}, preDone: false, postDone: false };

let state: JourneyState = INITIAL;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  const saved = readStorage<Partial<JourneyState> | null>(KEY, null);
  if (saved && saved.v === 2) state = { ...INITIAL, ...saved } as JourneyState;
}

function set(next: JourneyState) {
  state = next;
  writeStorage(KEY, next);
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  load();
  return state;
}

const noop = () => () => {};

/** true so depois da hidratacao: evita piscar conteudo do servidor antes de ler o armazenamento. */
export function useReady() {
  return useSyncExternalStore(noop, () => true, () => false);
}

export function useJourney() {
  const s = useSyncExternalStore(subscribe, getSnapshot, () => INITIAL);
  const ready = useReady();

  const setConsent = useCallback(() => set({ ...state, consent: true }), []);
  const answerScene = useCallback(
    (id: string, a: SceneAnswer) => set({ ...state, scenes: { ...state.scenes, [id]: a } }),
    [],
  );
  const finishModule = useCallback(
    (id: number) => (state.done.includes(id) ? undefined : set({ ...state, done: [...state.done, id] })),
    [],
  );
  const answerQuiz = useCallback(
    (phase: QuizPhase, itemId: string, opt: QuizAnswerId) =>
      set({ ...state, [phase]: { ...state[phase], [itemId]: opt } }),
    [],
  );
  const finishQuiz = useCallback(
    (phase: QuizPhase) => set({ ...state, [phase === 'pre' ? 'preDone' : 'postDone']: true }),
    [],
  );
  const reset = useCallback(() => set({ ...INITIAL }), []);

  return { ready, state: s, setConsent, answerScene, finishModule, answerQuiz, finishQuiz, reset };
}

export function moduleStatus(s: JourneyState, moduleId: number, sceneIds: string[]): 'novo' | 'andamento' | 'feito' {
  if (s.done.includes(moduleId)) return 'feito';
  return sceneIds.some((id) => s.scenes[id]) ? 'andamento' : 'novo';
}

/** Passo (0 a 4) onde o modulo deve abrir: retoma de onde parou. Modulo feito reabre na capa. */
export function resumeStep(s: JourneyState, moduleId: number, sceneIds: string[]): number {
  if (s.done.includes(moduleId)) return 0;
  const idx = sceneIds.findIndex((id) => !s.scenes[id]?.done);
  if (idx === -1) return 4;
  return idx === 0 && !s.scenes[sceneIds[0]] ? 0 : idx + 1;
}
