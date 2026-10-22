'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="w" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/** Frase grande que acende palavra a palavra conforme a rolagem. Sem movimento: texto cheio. */
export function ScrubText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });
  const words = text.split(' ');
  return (
    <p className="scrub" ref={ref}>
      {words.map((w, i) =>
        reduce ? (
          <span className="w" key={i}>{w}</span>
        ) : (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1) / words.length + 0.04)]}>
            {w}
          </Word>
        ),
      )}
    </p>
  );
}
