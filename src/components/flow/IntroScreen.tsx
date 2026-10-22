'use client';

import Link from 'next/link';
import { useConsentGuard } from '@/lib/guard';
import { FlowFrame } from './FlowFrame';
import type { IntroQuiz } from '@/content/types';

/** Tela de abertura de pre e pos. */
export function IntroScreen({ intro, next, back, close }: { intro: IntroQuiz; next: string; back: string; close: string }) {
  const ok = useConsentGuard();
  if (!ok) return null;
  return (
    <FlowFrame mood="calmo" back={back} close={close} actions={<Link className="btn btn--block" href={next}>{intro.botao}</Link>}>
      <h1>{intro.titulo}</h1>
      <p className="lede">{intro.corpo}</p>
    </FlowFrame>
  );
}
