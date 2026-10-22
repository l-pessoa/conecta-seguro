'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowLeft, Check, Close } from '@nsmr/pixelart-react';

export type Mood = 'calmo' | 'alerta' | 'alivio' | 'neutro';

interface FlowFrameProps {
  back?: string | null;
  close?: string;
  progress?: { total: number; at: number };
  label?: string;
  /** lista lateral (desktop): titulo e passos */
  aside?: { title: string; steps: string[]; at: number; lema?: string; art?: React.ReactNode };
  mood?: Mood;
  /** modulo (1 a 6): define a cor de destaque da tela */
  mod?: number;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/** Moldura de toda tela do fluxo: barra (voltar, progresso, sair), tela, acoes fixas no rodape, fundo vivo. */
export function FlowFrame({ back, close = '/modulos', progress, label, aside, mood = 'calmo', mod, actions, children }: FlowFrameProps) {
  const screen = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    screen.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={`flow${aside ? ' has-aside' : ''}`} data-mood={mood} style={mod ? ({ ['--mc']: `var(--m${mod})` } as React.CSSProperties) : undefined}>
      <div className="mood" aria-hidden="true">
        <i className="m-calmo" />
        <i className="m-alerta" />
        <i className="m-alivio" />
      </div>

      <div className="bar">
        <div className="bar-in">
          {back ? (
            <Link className="iconbtn" href={back} aria-label="Voltar"><ArrowLeft size={22} /></Link>
          ) : (
            <span className="iconbtn" aria-disabled="true"><ArrowLeft size={22} /></span>
          )}
          <div
            className={`prog${(progress?.total ?? 0) > 8 ? ' many' : ''}`}
            role="progressbar"
            aria-label="Progresso"
            aria-valuemin={0}
            aria-valuemax={progress?.total ?? 1}
            aria-valuenow={progress?.at ?? 0}
          >
            {progress && Array.from({ length: progress.total }, (_, i) => (
              <i key={i} className={i < progress.at ? 'done' : i === progress.at ? 'now' : ''} />
            ))}
          </div>
          {label && <span className="prog-label">{label}</span>}
          <Link className="iconbtn" href={close} aria-label="Sair para o mapa de módulos"><Close size={22} /></Link>
        </div>
      </div>

      <div className="stage">
        <aside className="aside" aria-hidden="true">
          {aside && (
            <>
              <h2>{aside.title}</h2>
              <ol>
                {aside.steps.map((s, i) => (
                  <li key={s} className={i < aside.at ? 'done' : i === aside.at ? 'now' : ''}>
                    <span className="dot">{i < aside.at && <Check size={12} />}</span>
                    {s}
                  </li>
                ))}
              </ol>
              {aside.lema && <p className="aside-lema">{aside.lema}</p>}
              {aside.art && <div className="aside-art">{aside.art}</div>}
            </>
          )}
        </aside>
        <div className="screen" ref={screen} tabIndex={-1}>
          {children}
        </div>
      </div>

      <div className="actions">
        <div className="actions-in">{actions}</div>
      </div>
    </div>
  );
}
