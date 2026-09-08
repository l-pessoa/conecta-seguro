import type { EnvironmentId } from '@/lib/types';

export interface EnvironmentDef {
  id: EnvironmentId;
  label: string;
  /** Placeholder ate as artes pixel art chegarem (ver docs/PENDENCIAS.md B1). */
  gradient: string;
  accent: string;
}

export const environments: Record<EnvironmentId, EnvironmentDef> = {
  caverna: {
    id: 'caverna',
    label: 'Caverna',
    gradient: 'linear-gradient(180deg, #0a0e2a 0%, #131a3d 55%, #0d3b4f 100%)',
    accent: '#38f2ff',
  },
  'cidade-m2': {
    id: 'cidade-m2',
    label: 'Cidade — amanhecer',
    gradient: 'linear-gradient(180deg, #12082b 0%, #2a1150 55%, #4a1750 100%)',
    accent: '#ff5fe0',
  },
  planicie: {
    id: 'planicie',
    label: 'Planície',
    gradient: 'linear-gradient(180deg, #05041a 0%, #170f3d 55%, #2a1b4d 100%)',
    accent: '#8a6bff',
  },
  subaquatico: {
    id: 'subaquatico',
    label: 'Subaquático',
    gradient: 'linear-gradient(180deg, #021024 0%, #062a3f 55%, #08405c 100%)',
    accent: '#2de0c8',
  },
  'cidade-m5': {
    id: 'cidade-m5',
    label: 'Cidade — presença',
    gradient: 'linear-gradient(180deg, #1a0a2e 0%, #3a1258 55%, #5c1a5c 100%)',
    accent: '#ff4fd8',
  },
  mirante: {
    id: 'mirante',
    label: 'Mirante — amanhecer',
    gradient: 'linear-gradient(180deg, #150c30 0%, #6a2d5c 45%, #d97a3f 100%)',
    accent: '#ffb347',
  },
};
