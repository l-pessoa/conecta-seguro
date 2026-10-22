'use client';

import Link from 'next/link';
import { Check, ExternalLink } from '@nsmr/pixelart-react';
import { motion, useReducedMotion } from 'motion/react';
import { stepped } from '@/lib/steps';
import { modules, result } from '@/content/modules';
import { useJourney } from '@/lib/journey';
import { useConsentGuard } from '@/lib/guard';
import { Celebrate } from '@/components/interativo';
import { FlowFrame } from './FlowFrame';

type Nivel = 'forte' | 'evoluiu' | 'rever';

/** Resultado sem nota: o que a pessoa fez, nivel por modulo (so pelas escolhas), plano de acao e ajuda. */
export function ResultScreen() {
  const ok = useConsentGuard();
  const reduce = useReducedMotion();
  const { state } = useJourney();
  if (!ok) return null;

  const levels = modules.map((m) => {
    const melhores = m.cenas.filter((c) => state.scenes[c.id]?.q === 'melhor').length;
    const nivel: Nivel = melhores >= 2 ? 'forte' : melhores === 1 ? 'evoluiu' : 'rever';
    return { m, nivel };
  });
  const order: Nivel[] = ['rever', 'evoluiu', 'forte'];
  const plano = [...result.plano].sort((a, b) => {
    const na = levels.find((l) => l.m.id === a.modulo)?.nivel ?? 'forte';
    const nb = levels.find((l) => l.m.id === b.modulo)?.nivel ?? 'forte';
    return order.indexOf(na) - order.indexOf(nb);
  });
  const scenesDone = Object.values(state.scenes).filter((s) => s.done).length;
  const fez = result.oQueFez.map((t) => t.replace('{modulos}', String(state.done.length)).replace('{cenas}', String(scenesDone)));

  return (
    <FlowFrame mood="alivio" back="/modulos" close="/" actions={<Link className="btn btn--block" href="/modulos">Voltar ao mapa</Link>}>
      <Celebrate trigger />
      <div className="sealbox">
        <motion.div
          className="seal"
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: stepped(4) }}
        >
          <Check size={56} aria-hidden="true" />
        </motion.div>
      </div>
      <h1>{result.titulo}</h1>
      <p className="lede">{result.frase}</p>
      <ul className="facts">
        {fez.map((t) => (
          <li key={t}><Check className="ico" aria-hidden="true" /><span>{t}</span></li>
        ))}
      </ul>

      <h2 className="q">Seus temas</h2>
      <ul className="plan">
        {levels.map(({ m, nivel }) => (
          <li key={m.id}>
            <b>{m.titulo}</b>
            <span className="note">{result.niveis[nivel]}</span>
          </li>
        ))}
      </ul>
      <p className="note">{result.aviso}</p>

      <h2 className="q">Seu plano</h2>
      <ul className="plan">
        {plano.map((p) => (
          <li key={p.modulo}>
            <b>{modules.find((m) => m.id === p.modulo)?.titulo}</b>
            <span>{p.acao}</span>
          </li>
        ))}
      </ul>

      <div className="help">
        <p>{result.ajuda.texto}</p>
        <a href={result.ajuda.url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
          {result.ajuda.rotuloLink} <ExternalLink aria-hidden="true" />
        </a>
      </div>
    </FlowFrame>
  );
}
