import type { ChoiceQuality } from '@/lib/types';

export type PaceLabel = 'calmo' | 'neutro' | 'acelerado';

export interface Pace {
  duration: string;
  label: PaceLabel;
}

const PACE_BY_QUALITY: Record<ChoiceQuality, Pace> = {
  melhor: { duration: '2.4s', label: 'calmo' },
  aceitavel: { duration: '1.4s', label: 'neutro' },
  arriscado: { duration: '0.6s', label: 'acelerado' },
};

const DEFAULT_PACE: Pace = { duration: '1.4s', label: 'neutro' };

export function pacingFor(quality: ChoiceQuality | null): Pace {
  return quality ? PACE_BY_QUALITY[quality] : DEFAULT_PACE;
}
