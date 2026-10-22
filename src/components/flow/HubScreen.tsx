'use client';

import Link from 'next/link';
import { ArrowRight, Check } from '@nsmr/pixelart-react';
import { modules } from '@/content/modules';
import { moduleStatus, resumeStep, useJourney } from '@/lib/journey';
import { useConsentGuard } from '@/lib/guard';
import { FlowFrame } from './FlowFrame';

const STATUS = { novo: 'Começar', andamento: 'Continuar', feito: 'Feito' } as const;

export function HubScreen() {
  const ok = useConsentGuard();
  const { state, reset } = useJourney();
  if (!ok) return null;
  const done = state.done.length;
  const all = done === modules.length;

  return (
    <FlowFrame mood={all ? 'alivio' : 'calmo'} back="/" close="/">
      <h1>Escolha por onde começar</h1>
      <p className="lede">Vá na ordem ou pule para o que quiser. Seu progresso fica salvo neste aparelho.</p>
      <div>
        <div className="meter" role="img" aria-label={`${done} de ${modules.length} módulos feitos`}>
          {modules.map((m, i) => <i key={m.id} className={i < done ? 'on' : ''} />)}
        </div>
        <p className="note" style={{ marginTop: 8 }}>{done} de {modules.length} módulos feitos</p>
      </div>
      <div className="hub">
        {modules.map((m) => {
          const ids = m.cenas.map((c) => c.id);
          const st = moduleStatus(state, m.id, ids);
          return (
            <Link key={m.id} href={`/modulo/${m.id}/${resumeStep(state, m.id, ids)}`} className={`hubrow ${st === 'feito' ? 'done' : st === 'andamento' ? 'now' : ''}`} style={{ ['--mc' as string]: `var(--m${m.id})` }}>
              <span className="n">{st === 'feito' ? <Check size={22} /> : m.id}</span>
              <span><b>{m.titulo}</b><small>{m.linha}</small></span>
              <span className="st">{STATUS[st]}</span>
            </Link>
          );
        })}
      </div>
      {all && (
        <Link className="btn btn--lg" href={state.postDone ? '/resultado' : '/avaliacao'}>
          {state.postDone ? 'Ver meu resultado' : 'Última etapa'} <ArrowRight aria-hidden="true" />
        </Link>
      )}
      <button type="button" className="btn btn--text" style={{ alignSelf: 'flex-start' }} onClick={() => { if (confirm('Apagar o progresso deste aparelho e recomeçar?')) reset(); }}>
        Recomeçar do zero
      </button>
    </FlowFrame>
  );
}
