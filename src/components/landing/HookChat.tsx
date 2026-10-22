'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { Home } from '@/content/types';

type Step = 'typing' | 'msg' | 'ask';

/** Hook da landing: janela de chat retro que a pessoa responde antes de entrar. Animacao so em CSS (degraus). */
export function HookChat({ gancho, cta }: { gancho: Home['gancho']; cta: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>(reduce ? 'ask' : 'typing');
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    if (reduce) {
      setStep('ask');
      return;
    }
    const t1 = setTimeout(() => setStep('msg'), 900);
    const t2 = setTimeout(() => setStep('ask'), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  return (
    <div className="chat" aria-label="Exemplo de situação">
      <div className="chat-title" aria-hidden="true">
        <span>{gancho.from}</span>
        <span><i /><i /><i /></span>
      </div>
      <div className="chat-body">
        <div aria-live="polite">
          {step === 'typing' && (
            <div className="typing chat-in" aria-hidden="true"><i /><i /><i /></div>
          )}
          {step !== 'typing' && (
            <div className="bubble chat-in">
              {gancho.body}
              <small>14:07</small>
            </div>
          )}
        </div>

        {step === 'ask' && !picked && (
          <div className="chat-in">
            <p className="chat-q">{gancho.pergunta}</p>
            <div className="chat-opts">
              {gancho.acoes.map((a) => (
                <button key={a} type="button" className="chip" onClick={() => setPicked(a)}>{a}</button>
              ))}
            </div>
          </div>
        )}

        {picked && (
          <div className="chat-after" aria-live="polite">
            <div className="bubble bubble--reply chat-in">{picked}</div>
            <div className="chat-reveal chat-in" style={{ animationDelay: reduce ? '0s' : '0.4s' }}>{gancho.revelacao}</div>
            <div className="row">
              <Link className="btn" href="/entrar">{cta}</Link>
              <button type="button" className="btn btn--text" onClick={() => setPicked(null)}>Tentar outra</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
