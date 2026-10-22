'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Check, LockOpen } from '@nsmr/pixelart-react';
import { modules, retomadaPara } from '@/content/modules';
import { useJourney } from '@/lib/journey';
import { useConsentGuard } from '@/lib/guard';
import { getOrCreateParticipant } from '@/lib/participant';
import { sendOrQueue } from '@/lib/syncQueue';
import type { Modulo } from '@/content/types';
import { ModuleArt } from '@/components/interativo';
import { FlowFrame, type Mood } from './FlowFrame';
import { SceneView, moodOf, useScene } from './SceneView';

const lemaOf = (m: Modulo) => m.lema.map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(' · ');
const STEPS = ['Abertura', 'Cena 1', 'Cena 2', 'Cena 3', 'Fecho'];

function Cover({ m }: { m: Modulo }) {
  return (
    <div className="cover" role="img" aria-label={m.lema.join(', ')}>
      <div className="art" aria-hidden="true">
        <ModuleArt module={m.id} size="cover" />
      </div>
      {m.lema.map((w) => (
        <span className="word" key={w}>{w.charAt(0) + w.slice(1).toLowerCase()}.</span>
      ))}
    </div>
  );
}

function Retomada({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" className={`retomada${open ? ' open' : ''}`} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
      <LockOpen size={24} aria-hidden="true" />
      <span>{open ? text : 'Lembra a regra do módulo anterior? Toque para ver.'}</span>
    </button>
  );
}

function SceneStep({ m, passo }: { m: Modulo; passo: number }) {
  const router = useRouter();
  const cena = m.cenas[passo - 1];
  const { saved, save } = useScene(cena);
  const answered = Boolean(saved?.done || saved?.skipped);
  const mood: Mood = moodOf(saved?.q);
  const next = `/modulo/${m.id}/${passo + 1}`;

  return (
    <FlowFrame
      mod={m.id}
      mood={mood}
      back={`/modulo/${m.id}/${passo - 1}`}
      progress={{ total: 5, at: passo }}
      aside={{ title: m.titulo, steps: STEPS, at: passo, lema: lemaOf(m), art: <ModuleArt module={m.id} size="small" /> }}
      actions={
        answered ? (
          <Link className="btn btn--block btn--lg" href={next}>Continuar <ArrowRight className="btn-arrow" aria-hidden="true" /></Link>
        ) : (
          <button type="button" className="btn btn--text" onClick={() => { save({ skipped: true, done: false }); router.push(next); }}>
            Pular
          </button>
        )
      }
    >
      <SceneView key={cena.id} cena={cena} saved={saved} save={save} />
    </FlowFrame>
  );
}

function Closing({ m }: { m: Modulo }) {
  const { finishModule } = useJourney();
  useEffect(() => {
    finishModule(m.id);
    const code = getOrCreateParticipant(null).code;
    void sendOrQueue('/api/evento', { code, events: [{ type: 'modulo', ref: `m${m.id}:fim`, at: new Date().toISOString() }] });
  }, [m.id, finishModule]);
  const nextModule = modules.find((x) => x.id === m.id + 1);
  return (
    <FlowFrame
      mod={m.id}
      mood="alivio"
      back={`/modulo/${m.id}/3`}
      progress={{ total: 5, at: 4 }}
      aside={{ title: m.titulo, steps: STEPS, at: 4, lema: lemaOf(m), art: <ModuleArt module={m.id} size="small" /> }}
      actions={
        nextModule ? (
          <Link className="btn btn--block btn--lg" href={`/modulo/${nextModule.id}/0`}>Próximo módulo <ArrowRight className="btn-arrow" aria-hidden="true" /></Link>
        ) : (
          <Link className="btn btn--block btn--lg" href="/avaliacao">Última etapa <ArrowRight className="btn-arrow" aria-hidden="true" /></Link>
        )
      }
    >
      <Cover m={m} />
      <h2 className="q">Na prática</h2>
      <ul className="prac">
        {m.pratica.map((t) => (
          <li key={t}><Check className="ico" aria-hidden="true" />{t}</li>
        ))}
      </ul>
      <Link className="btn btn--text" style={{ alignSelf: 'flex-start' }} href="/modulos">Ver o mapa de módulos</Link>
    </FlowFrame>
  );
}

export function ModuleScreen({ id, passo }: { id: number; passo: number }) {
  const ok = useConsentGuard();
  const router = useRouter();
  const m = modules.find((x) => x.id === id);
  const bad = !m || passo < 0 || passo > 4 || !Number.isInteger(passo);
  useEffect(() => {
    if (bad) router.replace('/modulos');
  }, [bad, router]);
  if (!ok || bad || !m) return null;

  if (passo === 0) {
    const retomada = retomadaPara(m.id);
    return (
      <FlowFrame
        mod={m.id}
        mood="calmo"
        back="/modulos"
        progress={{ total: 5, at: 0 }}
        aside={{ title: m.titulo, steps: STEPS, at: 0, lema: lemaOf(m), art: <ModuleArt module={m.id} size="small" /> }}
        actions={<Link className="btn btn--block btn--lg" href={`/modulo/${m.id}/1`}>Começar <ArrowRight className="btn-arrow" aria-hidden="true" /></Link>}
      >
        <Cover m={m} />
        <h1>{m.titulo}</h1>
        <p className="lede">{m.gancho}</p>
        {retomada && <Retomada text={retomada} />}
      </FlowFrame>
    );
  }
  if (passo === 4) return <Closing m={m} />;
  return <SceneStep m={m} passo={passo} />;
}
