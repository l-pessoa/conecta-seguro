'use client';

import { motion, useReducedMotion } from 'motion/react';
import { stepped } from '@/lib/steps';

/** Transicao entre rotas: a tela nova entra deslizando de leve. Template remonta a cada navegacao. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: stepped(5) }}
    >
      {children}
    </motion.div>
  );
}
