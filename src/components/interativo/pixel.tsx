import type { ReactNode } from 'react';
import s from './pixel.module.css';

/**
 * Toolkit de pixel art em SVG. Unidade de desenho = 1 "pixel" (4 px na tela).
 * Uma arte tem grade 80x60 e e desenhada dentro de <g transform="scale(4)"> (ver <PixelSvg>).
 * Paleta limitada (10 cores, tokens --px-* em pixel.module.css):
 *  k tinta | d cinza-verde escuro | m medio | l claro | w papel | g limao | G limao escuro (sucesso)
 *  r coral (alerta) | y sol | b madeira
 */
export type Cor = 'k' | 'd' | 'm' | 'l' | 'w' | 'g' | 'G' | 'r' | 'y' | 'b';

export const GRADE_W = 80;
export const GRADE_H = 60;

export function R({ x, y, w, h, c }: { x: number; y: number; w: number; h: number; c: Cor }) {
  return <rect x={x} y={y} width={w} height={h} className={s[c]} />;
}

/** caixa com canto em degrau: contorno k de 1 pixel + preenchimento + sombra opcional */
export function Box({ x, y, w, h, c, o = 'k', sombra = false }: { x: number; y: number; w: number; h: number; c: Cor; o?: Cor; sombra?: boolean }) {
  return (
    <g>
      {sombra && <R x={x + 1} y={y + 2} w={w} h={h} c="d" />}
      <R x={x + 1} y={y} w={w - 2} h={h} c={o} />
      <R x={x} y={y + 1} w={w} h={h - 2} c={o} />
      <R x={x + 2} y={y + 1} w={w - 4} h={h - 2} c={c} />
      <R x={x + 1} y={y + 2} w={w - 2} h={h - 4} c={c} />
    </g>
  );
}

/** elipse em degraus (rx, ry em pixels). Com rx=ry vira disco. */
export function Ell({ cx, cy, rx, ry = rx, c, o = 'k' }: { cx: number; cy: number; rx: number; ry?: number; c: Cor; o?: Cor | null }) {
  const linhas: ReactNode[] = [];
  const meia = (r1: number, r2: number, dy: number) => {
    const t = 1 - (dy * dy) / (r2 * r2);
    return t <= 0 ? -1 : Math.round(r1 * Math.sqrt(t));
  };
  for (let dy = -ry; dy <= ry; dy++) {
    const wo = meia(rx, ry + 0.5, dy);
    if (wo < 0) continue;
    if (o) linhas.push(<rect key={`o${dy}`} x={cx - wo} y={cy + dy} width={wo * 2 + 1} height={1} className={s[o]} />);
    const wi = meia(rx - 1, ry - 0.5, dy);
    if (wi >= 0 && Math.abs(dy) < ry) linhas.push(<rect key={`i${dy}`} x={cx - wi} y={cy + dy} width={wi * 2 + 1} height={1} className={s[c]} />);
    else if (!o) linhas.push(<rect key={`f${dy}`} x={cx - wo} y={cy + dy} width={wo * 2 + 1} height={1} className={s[c]} />);
  }
  return <g>{linhas}</g>;
}
export const Disc = ({ cx, cy, r, c, o = 'k' }: { cx: number; cy: number; r: number; c: Cor; o?: Cor | null }) => <Ell cx={cx} cy={cy} rx={r} ry={r} c={c} o={o} />;

/** octogono (placa) com cortes de `corte` pixels */
export function Oct({ x, y, w, h, corte, c, o = 'k' }: { x: number; y: number; w: number; h: number; corte: number; c: Cor; o?: Cor }) {
  const linhas: ReactNode[] = [];
  const inset = (i: number) => (i < corte ? corte - i : i >= h - corte ? i - (h - corte - 1) : 0);
  for (let i = 0; i < h; i++) {
    const a = inset(i);
    linhas.push(<rect key={`o${i}`} x={x + a} y={y + i} width={w - 2 * a} height={1} className={s[o]} />);
    if (i > 0 && i < h - 1) {
      const b = Math.max(a, inset(i - 1), inset(i + 1)) + 1;
      linhas.push(<rect key={`i${i}`} x={x + b} y={y + i} width={w - 2 * b} height={1} className={s[c]} />);
    }
  }
  return <g>{linhas}</g>;
}

/** sprite: linhas de texto; cada caractere e uma cor (ver Cor), '.' = vazio. Runs horizontais viram um rect. */
export function Spr({ x, y, rows }: { x: number; y: number; rows: string[] }) {
  const out: ReactNode[] = [];
  rows.forEach((linha, j) => {
    let i = 0;
    while (i < linha.length) {
      const ch = linha[i];
      if (ch === '.' || ch === ' ') { i++; continue; }
      let k = i;
      while (k + 1 < linha.length && linha[k + 1] === ch) k++;
      out.push(<rect key={`${j}-${i}`} x={x + i} y={y + j} width={k - i + 1} height={1} className={s[ch as Cor]} />);
      i = k + 1;
    }
  });
  return <g>{out}</g>;
}

const LETRAS: Record<string, string[]> = {
  P: ['www', 'w.w', 'www', 'w..', 'w..'],
  A: ['.w.', 'w.w', 'www', 'w.w', 'w.w'],
  R: ['ww.', 'w.w', 'ww.', 'w.w', 'w.w'],
  E: ['www', 'w..', 'ww.', 'w..', 'www'],
  '!': ['k', 'k', 'k', '.', 'k'],
};
/** texto em fonte 3x5 (so P A R E !) */
export function Texto({ x, y, t, cor = 'w' }: { x: number; y: number; t: string; cor?: Cor }) {
  let cx = x;
  return (
    <g>
      {[...t].map((ch, i) => {
        const rows = (LETRAS[ch] ?? []).map((r) => r.replace(/[wk]/g, cor));
        const el = <Spr key={i} x={cx} y={y} rows={rows} />;
        cx += (rows[0]?.length ?? 1) + 1;
        return el;
      })}
    </g>
  );
}

/** Svg de arte: grade 80x60 (ou h maior), desenhada a 4x, nitida. */
export function PixelSvg({ children, h = GRADE_H, className = '', label }: { children: ReactNode; h?: number; className?: string; label?: string }) {
  return (
    <svg
      viewBox={`0 0 ${GRADE_W * 4} ${h * 4}`}
      className={`${s.svg} ${className}`}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g transform="scale(4)">{children}</g>
    </svg>
  );
}
