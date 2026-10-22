'use client';

import { Alert, Check, InfoBox, Minus } from '@nsmr/pixelart-react';
import { motion, useReducedMotion } from 'motion/react';
import { stepped } from '@/lib/steps';
import { ROTULO_QUALIDADE, type Qualidade } from '@/content/types';

const ICON = { melhor: Check, aceitavel: Minus, arriscado: Alert, exagero: InfoBox } as const;

/** Feedback na mesma tela: rotulo, porque, Regra e Saiba mais. Entra com mola; sem punicao. */
export function Feedback({ q, porque, regra, saibaMais }: { q: Qualidade; porque: string; regra: string; saibaMais?: string }) {
  const reduce = useReducedMotion();
  const Icon = ICON[q];
  return (
    <section className={`fb fb--${q}`} role="status" aria-live="polite">
      <motion.span
        className="fb-label"
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: stepped(4) }}
      >
        <Icon size={18} aria-hidden="true" />
        {ROTULO_QUALIDADE[q]}
      </motion.span>
      <p className="fb-why">{porque}</p>
      <motion.div
        className="rule"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.35, ease: stepped(4) }}
      >
        <b>Regra</b>
        <p>{regra}</p>
      </motion.div>
      {saibaMais && (
        <details className="more">
          <summary>Saiba mais</summary>
          <p>{saibaMais}</p>
        </details>
      )}
    </section>
  );
}
