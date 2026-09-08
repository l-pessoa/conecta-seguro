export type ModuleId = 1 | 2 | 3 | 4 | 5 | 6;

export type EnvironmentId =
  | 'caverna'
  | 'cidade-m2'
  | 'planicie'
  | 'subaquatico'
  | 'cidade-m5'
  | 'mirante';

export type ChoiceQuality = 'melhor' | 'aceitavel' | 'arriscado';

export interface DialogueLine {
  speaker?: string;
  text: string;
}

export interface Choice {
  id: string;
  text: string;
  quality: ChoiceQuality;
  feedback: string;
}

export interface DeepDive {
  title: string;
  body: string;
}

export interface Scene {
  id: string;
  module: ModuleId;
  env: EnvironmentId;
  setup: DialogueLine[];
  prompt: string;
  choices: Choice[];
  principle: string;
  next: string | null;
}

export interface ModuleDefinition {
  id: ModuleId;
  title: string;
  logic: string;
  env: EnvironmentId;
  scenes: Scene[];
  deepDive: DeepDive;
  closing?: string[];
}

export type QuizPhase = 'pre' | 'post';
export type QuizOptionId = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  id: QuizOptionId;
  text: string;
}

export interface QuizItem {
  id: string;
  module: ModuleId;
  situation: string;
  prompt: string;
  options: QuizOption[];
  competency: string;
  /**
   * TEMPORARIO: gabarito viaja com o item enquanto nao existe backend.
   * Precisa migrar para src/lib/server/answers.ts antes de qualquer coleta real
   * (regra 28 do design) - ver docs/PROXIMOS-PASSOS.md.
   */
  correct: QuizOptionId;
}

export interface Participant {
  code: string;
  createdAt: string;
  consentAt: string | null;
  sessionTag: string | null;
}

export type JourneyEventType =
  | 'scene_completed'
  | 'module_completed'
  | 'deepdive_opened'
  | 'journey_completed';

export interface JourneyEvent {
  type: JourneyEventType;
  ref: string;
  at: string;
}

export interface QuizAnswer {
  itemId: string;
  optionId: QuizOptionId;
}

export interface QuizResult {
  phase: QuizPhase;
  total: number;
  correct: number;
  byCompetency: Record<string, { total: number; correct: number }>;
}
