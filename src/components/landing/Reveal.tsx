'use client';

import { motion, useReducedMotion } from 'motion/react';
import { stepped } from '@/lib/steps';

/** Entrada ao rolar, usada com parcimonia (passos e garantias). */
export function Reveal({ children, delay = 0, as = 'div', className }: { children: React.ReactNode; delay?: number; as?: 'div' | 'li'; className?: string }) {
  const reduce = useReducedMotion();
  const Tag = as === 'li' ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay, ease: stepped(5) }}
    >
      {children}
    </Tag>
  );
}
