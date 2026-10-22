'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Check } from '@nsmr/pixelart-react';
import { quiz } from '@/content/modules';
import { useJourney } from '@/lib/journey';
import { FlowFrame } from '@/components/flow/FlowFrame';
import { getOrCreateParticipant } from '@/lib/participant';
import { sendOrQueue } from '@/lib/syncQueue';
import type { QuizAnswer, QuizAnswerId, QuizPhase } from '@/lib/types';

const BASE = { pre: '/diagnostico', post: '/avaliacao' } as const;

/** Uma pergunta por tela. Pre e pos usam o mesmo layout e NUNCA mostram se acertou. */
export function QuizScreen({ phase, n }: { phase: QuizPhase; n: number }) {
  const router = useRouter();
  const { ready, state, answerQuiz, finishQuiz } = useJourney();
  const items = quiz[phase];
  const item = items[n - 1];
  const picked = item ? state[phase][item.id] : undefined;

  useEffect(() => {
    if (!item) router.replace(BASE[phase]);
  }, [item, phase, router]);
  if (!item || !ready) return null;

  const isLast = n === items.length;

  function pick(id: QuizAnswerId) {
    answerQuiz(phase, item.id, id);
    try { navigator.vibrate?.(8); } catch { /* sem vibracao */ }
  }

  function next() {
    if (!isLast) {
      router.push(`${BASE[phase]}/${n + 1}`);
      return;
    }
    const code = getOrCreateParticipant(null).code;
    const answers: QuizAnswer[] = items.map((it) => ({ itemId: it.id, optionId: state[phase][it.id] ?? 'nao_sei' }));
    answers[n - 1] = { itemId: item.id, optionId: picked ?? 'nao_sei' };
    void sendOrQueue('/api/quiz', { code, form: phase === 'pre' ? 'A' : 'B', phase, answers });
    finishQuiz(phase);
    router.push(phase === 'pre' ? '/modulos' : '/resultado');
  }

  return (
    <FlowFrame
      mood="neutro"
      back={n === 1 ? BASE[phase] : `${BASE[phase]}/${n - 1}`}
      close={phase === 'pre' ? '/' : '/modulos'}
      progress={{ total: items.length, at: n - 1 }}
      label={`${n} de ${items.length}`}
      actions={
        <button className="btn btn--block" type="button" disabled={!picked} onClick={next}>
          {isLast ? 'Terminar' : 'Continuar'}
        </button>
      }
    >
      <p className="qcard">{item.situacao}</p>
      <h1 className="q">{item.pergunta}</h1>
      <div className="qopts" role="radiogroup" aria-label="Alternativas">
        {item.opcoes.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={picked === o.id}
            className="qopt"
            onClick={() => pick(o.id)}
          >
            <span className="radio">{picked === o.id && <Check size={14} />}</span>
            <span>{o.t}</span>
          </button>
        ))}
        <button type="button" role="radio" aria-checked={picked === 'nao_sei'} className="qopt qopt--unsure" onClick={() => pick('nao_sei')}>
          <span className="radio">{picked === 'nao_sei' && <Check size={14} />}</span>
          <span>Não sei</span>
        </button>
      </div>
    </FlowFrame>
  );
}
