import './ix.css';
import s from './Brilho.module.css';

export interface BrilhoProps {
  /** lado em px (padrao 16; use multiplos de 7 para pixels nitidos: 14, 21, 28) */
  tamanho?: number;
  /** cor CSS (padrao: cor do modulo --mc ou --m1) */
  cor?: string;
  /** atraso da cintilada em ms, para varios brilhos nao piscarem juntos */
  atraso?: number;
  className?: string;
}

/** grade 7x7 de estrela de 4 pontas */
const PIXELS: [number, number, number, number][] = [
  [3, 0, 1, 7], [0, 3, 7, 1], [2, 2, 3, 3],
];

/** Estrelinha pixel de 4 pontas que cintila (steps). Decorativa; so transform e opacity. */
export function Brilho({ tamanho = 14, cor = 'var(--mc, var(--m1, #ffcd75))', atraso = 0, className = '' }: BrilhoProps) {
  return (
    <span
      className={`ix ${s.raiz} ${className}`}
      aria-hidden="true"
      style={{ width: tamanho, height: tamanho, color: cor, animationDelay: `${atraso}ms` }}
    >
      <svg viewBox="0 0 7 7" width="100%" height="100%" shapeRendering="crispEdges" focusable="false">
        {PIXELS.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} fill="currentColor" />)}
      </svg>
    </span>
  );
}
