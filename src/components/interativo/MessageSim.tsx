'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { parseTrechos } from './markup';
import { useReducedMotion } from './useReducedMotion';
import { IconCheck } from './icones';
import './ix.css';
import s from './MessageSim.module.css';

export interface MockMensagem {
  from: string;
  time?: string;
  body: string;
  campo?: string;
  legenda?: string;
  link?: string;
}

export interface MessageSimProps {
  mock: MockMensagem;
  /** idle: trechos tocaveis. locked: so mostra (achados e perdidos continuam marcados). */
  state?: 'idle' | 'locked';
  /** indices (ordem de aparicao, from -> body) ja achados */
  foundParts?: number[];
  /** indices revelados como perdidos (tracejado) */
  missedParts?: number[];
  /** indices neutros (Sem problema): ao tocar ficam em tom suave, sem selo de acerto */
  neutralParts?: number[];
  onPartTap?: (i: number) => void;
  /** anima a chegada (digitando + balao). Padrao true. */
  animar?: boolean;
  /** muda para recomecar a animacao */
  chave?: string | number;
}

export function MessageSim({
  mock, state = 'idle', foundParts = [], missedParts = [], neutralParts = [], onPartTap, animar = true, chave,
}: MessageSimProps) {
  const reduzido = useReducedMotion();
  const [pronto, setPronto] = useState(false);
  const mostrarAnim = animar && !reduzido;

  useEffect(() => {
    if (!mostrarAnim) { setPronto(true); return; }
    setPronto(false);
    const t = setTimeout(() => setPronto(true), 900);
    return () => clearTimeout(t);
  }, [mostrarAnim, chave, mock.body]);

  const de = parseTrechos(mock.from, 0);
  const corpo = parseTrechos(mock.body, de.proximo);
  const bloqueado = state === 'locked';

  const render = (trechos: ReturnType<typeof parseTrechos>['trechos']): ReactNode =>
    trechos.map((t, k) => {
      if (t.parte === undefined) return <span key={k}>{t.texto}</span>;
      const i = t.parte;
      const achado = foundParts.includes(i);
      const perdido = missedParts.includes(i);
      const neutro = neutralParts.includes(i);
      return (
        <button
          key={k}
          type="button"
          className={`${s.parte} ${achado ? (neutro ? s.neutro : s.achado) : ''} ${perdido ? s.perdido : ''}`}
          style={{ ['--d' as string]: `${(i % 4) * 0.45}s` }}
          disabled={bloqueado || achado}
          aria-pressed={achado}
          onClick={() => onPartTap?.(i)}
        >
          {t.texto}
          {achado && !neutro && <span className={s.selo}><IconCheck width={12} height={12} /></span>}
          {perdido && <span className={s.srOnly}> (sinal que passou despercebido)</span>}
        </button>
      );
    });

  const inicial = mock.from.replace(/\[\[|\]\]/g, '').trim().charAt(0).toUpperCase() || '?';

  return (
    <figure className={`ix ${s.raiz}`}>
      <div className={s.cabecalho}>
        <span className={s.avatar} aria-hidden="true">{inicial}</span>
        <span className={s.remetente}>{render(de.trechos)}</span>
        {mock.time && <span className={s.hora}>{mock.time}</span>}
      </div>
      <div className={s.area} aria-live="polite">
        {!pronto ? (
          <div className={`${s.balao} ${s.digitando}`} role="status" aria-label="Digitando">
            <i /><i /><i />
          </div>
        ) : (
          <div className={`${s.balao} ${mostrarAnim ? s.entra : ''}`}>
            <p className={s.texto}>{render(corpo.trechos)}</p>
            {mock.campo && (
              <div className={s.campo}>
                <span className={s.campoRotulo}>{mock.campo}</span>
                <span className={s.campoBox} aria-hidden="true" />
              </div>
            )}
          </div>
        )}
      </div>
      {mock.legenda && <figcaption className={s.legenda}>{mock.legenda}</figcaption>}
    </figure>
  );
}
