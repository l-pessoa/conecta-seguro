/** Tipos de infraestrutura do app. Tipos de conteudo vivem em src/content/types.ts. */
import type { Qualidade } from '@/content/types';

export type QuizPhase = 'pre' | 'post';
/** Resposta de quiz enviada ao servidor. "nao_sei" e o botao proprio da interface. */
export type QuizAnswerId = 'A' | 'B' | 'C' | 'D' | 'nao_sei';

export interface QuizAnswer {
  itemId: string;
  optionId: QuizAnswerId;
}

export interface Participant {
  code: string;
  createdAt: string;
  consentAt: string | null;
  sessionTag: string | null;
}

/** O que a pessoa fez em uma cena de modulo (feedback pedagogico, nao nota). */
export interface SceneAnswer {
  /** opcao escolhida (escolha/mensagem/medidor) */
  pick?: 'a' | 'b' | 'c';
  /** ids dos pontos tocados (sinal/ilustracao) */
  found?: string[];
  /** terminou a cena (respondeu ou pediu para revelar) */
  done: boolean;
  /** pulou sem responder */
  skipped?: boolean;
  /** qualidade da escolha, quando houver */
  q?: Qualidade;
}
