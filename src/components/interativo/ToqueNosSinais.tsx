'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageSim, type MockMensagem } from './MessageSim';
import { Explicacao } from './Explicacao';
import { contarTrechos } from './markup';
import './ix.css';
import s from './ToqueNosSinais.module.css';

/** Mesmo formato de `Ponto` em src/content/types.ts (id, t, porque, sinal). */
export interface PontoToque {
  id: string;
  t: string;
  porque: string;
  sinal: boolean;
  area?: { x: number; y: number; w: number; h: number };
}

export interface ToqueNosSinaisProps {
  mock: MockMensagem;
  /** um ponto por [[trecho]], na ordem em que aparecem (from, depois body) */
  pontos: PontoToque[];
  /** chamado uma vez: ao achar todos os sinais ou ao conferir */
  onConcluir?: (r: { achados: number; total: number; ids: string[] }) => void;
  chave?: string | number;
}

export function ToqueNosSinais({ mock, pontos, onConcluir, chave }: ToqueNosSinaisProps) {
  const [tocados, setTocados] = useState<number[]>([]);
  const [ativo, setAtivo] = useState<number | null>(null);
  const [conferido, setConferido] = useState(false);
  const fim = useRef(false);

  useEffect(() => { setTocados([]); setAtivo(null); setConferido(false); fim.current = false; }, [chave, mock.body]);

  const n = Math.min(pontos.length, contarTrechos(mock.from, mock.body));
  const sinais = useMemo(() => pontos.map((p, i) => (p.sinal ? i : -1)).filter((i) => i >= 0 && i < n), [pontos, n]);
  const neutros = useMemo(() => pontos.map((p, i) => (!p.sinal ? i : -1)).filter((i) => i >= 0 && i < n), [pontos, n]);
  const achados = sinais.filter((i) => tocados.includes(i));
  const perdidos = conferido ? sinais.filter((i) => !tocados.includes(i)) : [];
  const todos = achados.length === sinais.length && sinais.length > 0;

  const concluir = () => {
    if (fim.current) return;
    fim.current = true;
    setConferido(true);
    onConcluir?.({ achados: achados.length, total: sinais.length, ids: achados.map((i) => pontos[i].id) });
  };

  useEffect(() => {
    if (todos && !fim.current) {
      const t = setTimeout(concluir, 900);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const tocar = (i: number) => {
    if (!pontos[i]) return;
    setTocados((a) => (a.includes(i) ? a : [...a, i]));
    setAtivo(i);
  };

  const trancado = conferido;
  const p = ativo !== null ? pontos[ativo] : null;

  return (
    <div className={`ix ${s.raiz}`}>
      <MessageSim
        mock={mock}
        state={trancado ? 'locked' : 'idle'}
        foundParts={tocados}
        missedParts={perdidos}
        neutralParts={neutros}
        onPartTap={tocar}
        chave={chave}
      />
      {!trancado && (
        <div className={s.barra}>
          <p className={s.contador} aria-live="polite">
            <strong>{achados.length}</strong> de {sinais.length} sinais
          </p>
          <div className={s.pontos} aria-hidden="true">
            {sinais.map((i) => <i key={i} className={tocados.includes(i) ? s.cheio : ''} />)}
          </div>
          <button type="button" className={s.conferir} onClick={concluir}>Conferir</button>
        </div>
      )}
      {p && !conferido && <Explicacao key={ativo} tipo={p.sinal ? 'sinal' : 'neutro'} titulo={p.t} texto={p.porque} />}
      {conferido && (
        <div className={s.lista}>
          {sinais.map((i) => (
            <Explicacao key={i} tipo={tocados.includes(i) ? 'sinal' : 'perdido'} titulo={pontos[i].t} texto={pontos[i].porque} />
          ))}
          {neutros.map((i) => (
            <Explicacao key={i} tipo="neutro" titulo={pontos[i].t} texto={pontos[i].porque} />
          ))}
        </div>
      )}
    </div>
  );
}
