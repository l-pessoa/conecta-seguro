'use client';

import { Alert, Check, InfoBox, Minus } from '@nsmr/pixelart-react';
import { motion, useReducedMotion } from 'motion/react';
import { stepped } from '@/lib/steps';
import type { Opcao } from '@/content/types';

const ICON = { melhor: Check, aceitavel: Minus, arriscado: Alert, exagero: InfoBox } as const;

/** 3 opcoes grandes. Ao escolher: trava, a escolhida ganha a cor da qualidade e a melhor e marcada. */
export function ChoiceList({ opcoes, picked, onPick }: { opcoes: Opcao[]; picked?: 'a' | 'b' | 'c'; onPick: (o: Opcao) => void }) {
  const reduce = useReducedMotion();
  const answered = Boolean(picked);
  return (
    <div className="opts" role="group" aria-label="Opções">
      {opcoes.map((o, i) => {
        const isPicked = picked === o.id;
        const isBest = answered && o.q === 'melhor';
        const Icon = ICON[o.q];
        return (
          <motion.button
            key={o.id}
            type="button"
            disabled={answered}
            className={`opt${isPicked ? ` picked q-${o.q}` : ''}${isBest && !isPicked ? ' best' : ''}${answered && !isPicked && !isBest ? ' dim' : ''}`}
            onClick={() => onPick(o)}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.12, duration: 0.4, ease: stepped(5) }}
            
          >
            <span>
              {o.t}
              {o.hint && <small className="note"> ({o.hint})</small>}
            </span>
            {isPicked && <span className="tag"><Icon size={16} aria-hidden="true" /></span>}
            {isBest && !isPicked && <span className="tag"><Check size={16} aria-hidden="true" />Mais segura</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
