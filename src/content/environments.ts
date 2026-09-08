import type { EnvironmentId } from '@/lib/types';

export interface BgLayer {
  src: string;
  /** 0 = parado (muito longe), 1 = acompanha o ritmo em cheio (mais perto) */
  speed: number;
  /** true = ladrilha horizontalmente (ceu, fileira de predios); false = cena unica, cobre a tela */
  repeat: boolean;
  /** ajuste de cor pontual, ex: puxar uma cena diurna pro tom noturno do projeto */
  filter?: string;
}

export interface EnvironmentDef {
  id: EnvironmentId;
  label: string;
  baseColor: string;
  layers: BgLayer[];
  accent: string;
}

const b = (path: string) => `/assets/backgrounds/${path}`;

export const environments: Record<EnvironmentId, EnvironmentDef> = {
  hero: {
    id: 'hero',
    label: 'Limiar',
    baseColor: '#100a2e',
    accent: '#38f2ff',
    layers: [
      { src: b('hero/layer-0.png'), speed: 0.04, repeat: false },
      { src: b('hero/layer-1.png'), speed: 0.15, repeat: true },
    ],
  },
  caverna: {
    id: 'caverna',
    label: 'Caverna',
    baseColor: '#0a0e2a',
    accent: '#38f2ff',
    layers: [
      { src: b('caverna/layer-0.png'), speed: 0.15, repeat: true },
      { src: b('caverna/layer-1.png'), speed: 0.4, repeat: true },
    ],
  },
  'cidade-m2': {
    id: 'cidade-m2',
    label: 'Cidade — amanhecer',
    baseColor: '#12082b',
    accent: '#ff5fe0',
    layers: [
      { src: b('cidade-m2/layer-0.png'), speed: 0.1, repeat: true },
      { src: b('cidade-m2/layer-1.png'), speed: 0.3, repeat: true },
      { src: b('cidade-m2/layer-2.png'), speed: 0.55, repeat: true },
    ],
  },
  planicie: {
    id: 'planicie',
    label: 'Planície',
    baseColor: '#05041a',
    accent: '#8a6bff',
    layers: [
      {
        src: b('planicie/layer-0.png'),
        speed: 0.12,
        repeat: true,
        filter: 'brightness(0.55) saturate(1.3) hue-rotate(220deg)',
      },
    ],
  },
  subaquatico: {
    id: 'subaquatico',
    label: 'Subaquático',
    baseColor: '#021024',
    accent: '#2de0c8',
    layers: [
      { src: b('subaquatico/layer-0.png'), speed: 0.12, repeat: true, filter: 'brightness(0.7)' },
      { src: b('subaquatico/layer-1.png'), speed: 0.4, repeat: true, filter: 'brightness(0.75)' },
    ],
  },
  'cidade-m5': {
    id: 'cidade-m5',
    label: 'Cidade — presença',
    baseColor: '#1a0a2e',
    accent: '#ff4fd8',
    layers: [
      { src: b('cidade-m5/layer-0.png'), speed: 0.1, repeat: true },
      { src: b('cidade-m5/layer-1.png'), speed: 0.3, repeat: true },
      { src: b('cidade-m5/layer-2.png'), speed: 0.55, repeat: true },
    ],
  },
  mirante: {
    id: 'mirante',
    label: 'Mirante — amanhecer',
    baseColor: '#150c30',
    accent: '#ffb347',
    layers: [
      { src: b('mirante/layer-0.png'), speed: 0.04, repeat: true },
      { src: b('mirante/layer-1.png'), speed: 0.2, repeat: true },
      { src: b('mirante/layer-2.png'), speed: 0.4, repeat: true },
    ],
  },
};
