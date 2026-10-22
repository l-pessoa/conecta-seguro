'use client';
import { useState } from 'react';
import { CENAS, type ArtId, type Slot } from './ilustracoes';
import { IconCheck, IconDash } from './icones';
import './ix.css';
import s from './HotspotScene.module.css';

export interface Hotspot { id: string; label: string }

export interface HotspotSceneProps {
  art: ArtId;
  hotspots: Hotspot[];
  foundIds?: string[];
  missedIds?: string[];
  /** ids marcados como neutros (ficam com cor suave ao achar) */
  neutralIds?: string[];
  onTap?: (id: string) => void;
  /** texto alternativo longo da ilustracao (leitor de tela) */
  descricao?: string;
  /** mostra a lista de pontos como botoes visiveis (default: so para leitor de tela e teclado) */
  mostrarLegenda?: boolean;
  /** sem pontos pulsando (ilustracao so para olhar) */
  desligado?: boolean;
}

function posicionar(hotspots: Hotspot[], slots: Slot[]): { h: Hotspot; slot: Slot | null }[] {
  const usados = new Set<string>();
  const porId = hotspots.map((h) => {
    const sl = slots.find((x) => x.id === h.id);
    if (sl) usados.add(sl.id);
    return { h, slot: sl ?? null };
  });
  const livres = slots.filter((x) => !usados.has(x.id));
  return porId.map((p) => (p.slot ? p : { h: p.h, slot: livres.shift() ?? null }));
}

/** retangulo com cantos em degrau de 4 px */
function passo(x: number, y: number, w: number, h: number): string {
  const c = 4;
  const p: [number, number][] = [[x + c, y], [x + w - c, y], [x + w - c, y + c], [x + w, y + c], [x + w, y + h - c], [x + w - c, y + h - c], [x + w - c, y + h], [x + c, y + h], [x + c, y + h - c], [x, y + h - c], [x, y + c], [x + c, y + c]];
  return p.map((q) => q.join(',')).join(' ');
}

export function HotspotScene({
  art, hotspots, foundIds = [], missedIds = [], neutralIds = [], onTap, descricao,
  mostrarLegenda = false, desligado = false,
}: HotspotSceneProps) {
  const cena = CENAS[art];
  const [foco, setFoco] = useState<string | null>(null);
  const itens = posicionar(hotspots, cena.slots);

  return (
    <figure className={`ix ${s.raiz}`}>
      <svg
        viewBox="0 0 320 240" className={s.svg} role="img" aria-label={descricao ?? cena.titulo}
        shapeRendering="crispEdges"
      >
        <g transform="scale(4)"><cena.Draw /></g>
        {itens.map(({ h, slot }) => {
          if (!slot) return null;
          const achado = foundIds.includes(h.id);
          const perdido = missedIds.includes(h.id) && !achado;
          const neutro = neutralIds.includes(h.id);
          const r = Math.max(slot.r, 24);
          const bx = slot.x - slot.r, by = slot.y - slot.r, lado = slot.r * 2;
          return (
            <g key={h.id} className={s.ponto}>
              {!achado && !perdido && !desligado && (
                <g className={s.dica}>
                  <rect x={slot.x - 6} y={slot.y - 6} width="12" height="12" className={s.dicaQ} />
                  <rect x={slot.x - 2} y={slot.y - 2} width="4" height="4" className={s.dicaP} />
                </g>
              )}
              {achado && (
                <g className={s.achado}>
                  <polygon points={passo(bx, by, lado, lado)} className={neutro ? s.aroNeutro : s.aroAchado} />
                  {!neutro && (
                    <g transform={`translate(${bx + lado - 12},${by - 4}) scale(4)`}>
                      <rect x="0" y="0" width="6" height="6" className={s.seloQ} />
                      <path d="M1 3h1v1h1v-1h1v-1h1v-1h-1v1h-1v1h-1v-1h-1z" className={s.seloCheck} transform="translate(0,0)" />
                    </g>
                  )}
                </g>
              )}
              {perdido && <polygon points={passo(bx, by, lado, lado)} className={s.aroPerdido} />}
              {foco === h.id && <polygon points={passo(bx - 4, by - 4, lado + 8, lado + 8)} className={s.aroFoco} />}
              <rect x={slot.x - r} y={slot.y - r} width={r * 2} height={r * 2} className={s.alvo} onClick={() => onTap?.(h.id)} />
            </g>
          );
        })}
      </svg>
      <div className={mostrarLegenda ? s.legenda : 'ix-sr'} role="group" aria-label="Pontos da ilustração">
        {hotspots.map((h) => {
          const achado = foundIds.includes(h.id);
          const perdido = missedIds.includes(h.id) && !achado;
          return (
            <button
              key={h.id} type="button" className={s.chip}
              aria-pressed={achado}
              onClick={() => onTap?.(h.id)}
              onFocus={() => setFoco(h.id)} onBlur={() => setFoco(null)}
            >
              {achado && <IconCheck width={16} height={16} />}
              {perdido && <IconDash width={16} height={16} />}
              {h.label}
              {perdido && <span className="ix-sr"> (passou despercebido)</span>}
            </button>
          );
        })}
      </div>
    </figure>
  );
}
