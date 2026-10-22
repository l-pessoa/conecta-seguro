'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check } from '@nsmr/pixelart-react';
import { consent } from '@/content/modules';
import { useJourney } from '@/lib/journey';
import { getOrCreateParticipant, recordConsent } from '@/lib/participant';
import { sendOrQueue } from '@/lib/syncQueue';
import { FlowFrame } from './FlowFrame';

/** Assentimento (texto provisorio ate o OK do orientador). Gera o codigo anonimo. */
export function ConsentScreen() {
  const router = useRouter();
  const { ready, state, setConsent } = useJourney();
  const [ok, setOk] = useState(false);

  function go() {
    const p = getOrCreateParticipant(new URLSearchParams(window.location.search).get('t'));
    const updated = recordConsent() ?? p;
    setConsent();
    void sendOrQueue('/api/participante', { code: updated.code, sessionTag: updated.sessionTag, consentAt: updated.consentAt });
    router.push(state.preDone ? '/modulos' : '/diagnostico');
  }

  if (!ready) return null;
  return (
    <FlowFrame
      mood="calmo"
      back="/"
      close="/"
      actions={
        <>
          <button className="btn btn--block" type="button" disabled={!ok} onClick={go}>{consent.botao}</button>
          {!ok && <p className="note" style={{ textAlign: 'center' }}>Marque a caixa acima para continuar.</p>}
        </>
      }
    >
      <h1>{consent.titulo}</h1>
      <ul className="facts">
        {consent.corpo.map((t) => (
          <li key={t}><Check className="ico" aria-hidden="true" /><span>{t}</span></li>
        ))}
      </ul>
      <label className="check">
        <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
        {consent.checkbox}
      </label>
    </FlowFrame>
  );
}
