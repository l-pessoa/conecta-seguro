'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';
import './ix.css';
import s from './PixelParticles.module.css';

export interface PixelParticlesProps {
  /** pouco: 12 no celular, 20 no desktop. medio: 24 e 40. */
  densidade?: 'pouco' | 'medio';
  /** sobe, desce ou ambos (cada particula escolhe um sentido) */
  direcao?: 'sobe' | 'desce' | 'ambos';
  /** cores CSS; padrao: --m1..--m6 do tema */
  cores?: string[];
  className?: string;
}

const CORES_PADRAO = ['var(--m1, #ffcd75)', 'var(--m2, #41d6e8)', 'var(--m3, #ff6fa8)', 'var(--m4, #ff8a3d)', 'var(--m5, #b79cff)', 'var(--m6, #5b8cff)'];
const TAMANHOS = [2, 4, 4, 6];

/** numero pseudoaleatorio deterministico em [0,1): igual no servidor e no cliente */
function rnd(i: number, k: number): number {
  let x = Math.imul(i * 374761393 + k * 668265263 + 1, 1274126177);
  x ^= x >>> 13;
  x = Math.imul(x, 1103515245);
  x ^= x >>> 16;
  return (x >>> 0) % 1000 / 1000;
}

/**
 * Camada de fundo com quadradinhos subindo e descendo devagar, deriva lateral e piscar em steps().
 * Coloque dentro de um pai com `position: relative` (a camada e absolute inset 0, pointer-events none).
 * So transform e opacity. Pausa com a aba oculta. Sem nada em reduced-motion.
 */
export function PixelParticles({ densidade = 'pouco', direcao = 'ambos', cores = CORES_PADRAO, className = '' }: PixelParticlesProps) {
  const reduzido = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const total = densidade === 'medio' ? 40 : 20;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const f = () => el.setAttribute('data-pausado', String(document.hidden));
    f();
    document.addEventListener('visibilitychange', f);
    return () => document.removeEventListener('visibilitychange', f);
  }, [reduzido]);

  if (reduzido) return null;

  return (
    <div ref={ref} className={`ix ${s.camada} ${densidade === 'medio' ? s.medio : s.pouco} ${className}`} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const sobe = direcao === 'sobe' ? true : direcao === 'desce' ? false : i % 2 === 0;
        const dist = 70 + Math.round(rnd(i, 3) * 130);
        const estilo = {
          ['--x' as string]: `${Math.round(rnd(i, 1) * 100)}%`,
          ['--y' as string]: `${Math.round(rnd(i, 2) * 100)}%`,
          ['--s' as string]: `${TAMANHOS[Math.floor(rnd(i, 4) * TAMANHOS.length)]}px`,
          ['--dy' as string]: `${sobe ? -dist : dist}px`,
          ['--dx' as string]: `${Math.round((rnd(i, 5) - 0.5) * 48)}px`,
          ['--d' as string]: `${10 + Math.round(rnd(i, 6) * 12)}s`,
          ['--b' as string]: `${(1.6 + rnd(i, 7) * 2.4).toFixed(1)}s`,
          ['--delay' as string]: `-${Math.round(rnd(i, 8) * 20)}s`,
          ['--o' as string]: (0.22 + rnd(i, 9) * 0.28).toFixed(2),
          ['--c' as string]: cores[i % cores.length],
        } as React.CSSProperties;
        return <span key={i} className={s.p} style={estilo} />;
      })}
    </div>
  );
}
