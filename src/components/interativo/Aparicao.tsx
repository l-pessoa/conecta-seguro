'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { Brilho } from './Brilho';
import './ix.css';
import s from './Aparicao.module.css';

export interface AparicaoProps {
  children: ReactNode;
  /** brilho periodico sutil (reflexo + estrelinhas) para caixas importantes */
  destaque?: boolean;
  /** burst de quadradinhos nas bordas ao aparecer (padrao true) */
  burst?: boolean;
  /** cores CSS do burst (padrao: cor do modulo e tinta) */
  cores?: string[];
  /** atraso da entrada em ms (para escalonar varios) */
  atraso?: number;
  /** fracao visivel para disparar (0 a 1) */
  limite?: number;
  className?: string;
}

interface Faisca { x: number; y: number; dx: number; dy: number; estrela: boolean; cor: string; d: number }

// 8 pontos no perimetro (em %) e a direcao de saida de cada um
const PONTOS: [number, number, number, number][] = [
  [0, 0, -1, -1], [50, 0, 0, -1], [100, 0, 1, -1], [100, 50, 1, 0],
  [100, 100, 1, 1], [50, 100, 0, 1], [0, 100, -1, 1], [0, 50, -1, 0],
];

/**
 * Entra em passos quando aparece na tela (IntersectionObserver) e solta um burst curto de
 * quadradinhos/estrelinhas das bordas. O burst e limitado para nunca passar da viewport
 * (sem rolagem horizontal). Reduced-motion: so um fade simples, sem burst nem brilho.
 */
export function Aparicao({ children, destaque = false, burst = true, cores, atraso = 0, limite = 0.2, className = '' }: AparicaoProps) {
  const reduzido = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [faiscas, setFaiscas] = useState<Faisca[]>([]);
  const paleta = cores ?? ['var(--mc, var(--m1, #ffcd75))', 'var(--ink, #f6efff)'];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisivel(true); return; }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setVisivel(true); io.disconnect(); }
    }, { threshold: limite });
    io.observe(el);
    return () => io.disconnect();
  }, [limite]);

  useEffect(() => {
    if (!visivel || !burst || reduzido) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const folga = { l: Math.max(0, r.left - 4), r: Math.max(0, window.innerWidth - r.right - 4) };
    const lista: Faisca[] = PONTOS.map(([x, y, vx, vy], i) => {
      const dist = 12 + (i % 3) * 5;
      let dx = vx * dist;
      if (dx < 0) dx = -Math.min(-dx, folga.l);
      if (dx > 0) dx = Math.min(dx, folga.r);
      return { x, y, dx, dy: vy * dist, estrela: i % 2 === 1, cor: paleta[i % paleta.length], d: (i % 4) * 40 };
    });
    setFaiscas(lista);
    const t = setTimeout(() => setFaiscas([]), 1200 + atraso);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visivel, burst, reduzido]);

  return (
    <div
      ref={ref}
      className={`ix ${s.raiz} ${visivel ? s.on : s.espera} ${className}`}
      style={{ animationDelay: `${atraso}ms` }}
    >
      {children}
      {faiscas.length > 0 && (
        <span className={s.burst} aria-hidden="true">
          {faiscas.map((f, i) => (
            <i
              key={i}
              className={f.estrela ? s.estrela : s.quad}
              style={{
                left: `${f.x}%`, top: `${f.y}%`, background: f.cor,
                ['--dx' as string]: `${f.dx}px`, ['--dy' as string]: `${f.dy}px`,
                animationDelay: `${atraso + f.d}ms`,
              } as CSSProperties}
            />
          ))}
        </span>
      )}
      {destaque && !reduzido && visivel && (
        <span className={s.destaque} aria-hidden="true">
          <span className={s.reflexo}><i /></span>
          <Brilho tamanho={14} className={s.estrelaA} atraso={600} />
          <Brilho tamanho={14} className={s.estrelaB} atraso={1500} />
        </span>
      )}
    </div>
  );
}
