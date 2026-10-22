'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight } from '@nsmr/pixelart-react';
import type { Modulo } from '@/content/types';

const TONES = ['cm--accent', 'cm--dark', 'cm--soft', '', 'cm--soft', 'cm--accent'];

function Card({ m, i, n, progress, reduce }: { m: Modulo; i: number; n: number; progress: MotionValue<number>; reduce: boolean }) {
  const scale = useTransform(progress, [i / n, 1], [1, Math.max(0.86, 1 - (n - 1 - i) * 0.025)]);
  return (
    <li style={{ ['--k' as string]: i }}>
      <motion.div style={reduce ? undefined : { scale }}>
        <Link href="/entrar" className={`card-mod ${TONES[i]}`}>
          <span>
            <span className="n">{m.id}</span>
          </span>
          <span>
            <h3>{m.titulo}</h3>
            <span className="lema">{m.lema.join(' · ').toLowerCase().replace(/^./, (c) => c.toUpperCase())}</span>
            <p>{m.linha}</p>
            <span className="go">Abrir <ArrowRight aria-hidden="true" /></span>
          </span>
        </Link>
      </motion.div>
    </li>
  );
}

/** Cards de modulo que se empilham ao rolar (sticky + escala ligada ao scroll). */
export function ModuleStack({ modulos }: { modulos: Modulo[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.2', 'end end'] });
  return (
    <ol className="stack" ref={ref}>
      {modulos.map((m, i) => (
        <Card key={m.id} m={m} i={i} n={modulos.length} progress={scrollYProgress} reduce={reduce} />
      ))}
    </ol>
  );
}
