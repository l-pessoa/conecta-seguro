'use client';

import { useState } from 'react';
import { Button } from './Button';

interface ConsentGateProps {
  onAccept: () => void;
}

export function ConsentGate({ onAccept }: ConsentGateProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="consent-gate">
      <div className="consent-card panel">
        <h2>Antes de começar</h2>
        <p>
          Essa experiência não pede seu nome nem nenhum dado pessoal — você vai receber um código
          só seu, gerado agora, pra identificar suas respostas sem identificar você.
        </p>
        <p>
          Suas respostas do diagnóstico e da avaliação final podem ser usadas, de forma anônima,
          num trabalho acadêmico sobre educação em segurança digital. Nada do que você escrever nas
          perguntas abertas será associado ao seu nome.
        </p>
        <p>Você pode parar a qualquer momento — nada aqui é obrigatório.</p>
        <label className="consent-check">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          Entendi e quero continuar
        </label>
        <Button onClick={onAccept} disabled={!checked}>
          Começar
        </Button>
      </div>
    </div>
  );
}
