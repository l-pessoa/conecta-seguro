'use client';
import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';
import './ix.css';
import s from './Celebrate.module.css';

export interface CelebrateProps {
  /** passa de false para true para disparar */
  trigger: boolean;
  /** quantidade de pecas (padrao 24, max 30) */
  pecas?: number;
}

const CORES = ['var(--ix-p1)', 'var(--ix-p2)', 'var(--ix-p3)', 'var(--ix-p4)', 'var(--ix-p5)', 'var(--ix-p6)'];

/** valores deterministas (sem Math.random: nada de diferenca servidor/cliente) */
function peca(i: number) {
  const ang = ((i * 137.5) % 360) * (Math.PI / 180);
  const dist = 90 + ((i * 53) % 110);
  return {
    dx: Math.round(Math.cos(ang) * dist),
    dy: Math.round(Math.sin(ang) * dist * 0.8 - 70),
    rot: (i * 97) % 540,
    cor: CORES[i % CORES.length],
    forma: i % 3,
    atraso: (i % 6) * 25,
  };
}

/** Confete leve (so transform e opacity). Desligado em reduced-motion. */
export function Celebrate({ trigger, pecas = 24 }: CelebrateProps) {
  const reduzido = useReducedMotion();
  const [vivo, setVivo] = useState(false);

  useEffect(() => {
    if (!trigger || reduzido) { setVivo(false); return; }
    setVivo(true);
    const t = setTimeout(() => setVivo(false), 1800);
    return () => clearTimeout(t);
  }, [trigger, reduzido]);

  if (!vivo) return null;
  const n = Math.min(pecas, 30);
  return (
    <div className={`ix ${s.palco}`} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const p = peca(i);
        return (
          <i
            key={i}
            className={`${s.peca} ${p.forma === 1 ? s.tira : ''}`}
            style={{ ['--dx' as string]: `${p.dx}px`, ['--dy' as string]: `${p.dy}px`, ['--rot' as string]: `${p.rot}deg`, background: p.cor, animationDelay: `${p.atraso}ms` }}
          />
        );
      })}
    </div>
  );
}
