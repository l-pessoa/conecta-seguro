'use client';

import { useMemo, useState } from 'react';
import { MessageSim, ToqueNosSinais, HotspotScene, Explicacao, PasswordMeter, Celebrate } from '@/components/interativo';
import { useJourney } from '@/lib/journey';
import { getOrCreateParticipant } from '@/lib/participant';
import { sendOrQueue } from '@/lib/syncQueue';
import type { SceneAnswer } from '@/lib/types';
import type { Cena, CenaEscolha, CenaIlustracao, CenaSinal, Opcao, Qualidade } from '@/content/types';
import { ChoiceList } from './ChoiceList';
import { Feedback } from './Feedback';
import type { Mood } from './FlowFrame';

export interface SceneApi {
  mood: Mood;
  /** true quando a cena terminou e "Continuar" pode aparecer */
  done: boolean;
  /** acoes extras do rodape (ex.: Conferir da ilustracao) */
  extra?: React.ReactNode;
}

function moodOf(q?: Qualidade): Mood {
  return q === 'melhor' ? 'alivio' : q === 'arriscado' ? 'alerta' : 'neutro';
}

function track(sceneId: string, ref: string) {
  const code = getOrCreateParticipant(null).code;
  void sendOrQueue('/api/evento', { code, events: [{ type: 'cena', ref: `${sceneId}:${ref}`, at: new Date().toISOString() }] });
}

/** Mostra a cena e devolve o estado para a moldura (humor do fundo e botoes do rodape). */
export function useScene(cena: Cena) {
  const { state, answerScene } = useJourney();
  const saved: SceneAnswer | undefined = state.scenes[cena.id];
  const save = (a: SceneAnswer) => {
    answerScene(cena.id, a);
    // ref = "<escolha>:<qualidade>" para o painel de analise (ex.: "b:melhor", "pulou:").
    track(cena.id, `${a.pick ?? (a.skipped ? 'pulou' : (a.found ?? []).join(',') || 'nenhum')}:${a.q ?? ''}`);
  };
  return { saved, save };
}

/* ---------------------------- escolha / mensagem / medidor ---------------------------- */
export function EscolhaScene({ cena, saved, save }: { cena: CenaEscolha; saved?: SceneAnswer; save: (a: SceneAnswer) => void }) {
  const pickedId = saved?.pick;
  const picked = cena.opcoes.find((o) => o.id === pickedId);
  const [hint, setHint] = useState(false);
  const [fresh, setFresh] = useState(false);

  function choose(o: Opcao) {
    save({ pick: o.id, q: o.q, done: true });
    setFresh(true);
    try { navigator.vibrate?.(o.q === 'melhor' ? [10, 40, 10] : 12); } catch { /* sem vibracao */ }
  }

  const linkIdx = cena.mock.link ? 0 : -1;
  function onPartTap() {
    if (pickedId) return;
    const risky = cena.opcoes.find((o) => o.q === 'arriscado');
    if (risky) choose(risky);
    else setHint(true);
  }

  return (
    <>
      <MessageSim
        mock={cena.mock}
        state={pickedId ? 'locked' : 'idle'}
        onPartTap={linkIdx >= 0 ? onPartTap : undefined}
        animar={cena.tipo === 'mensagem'}
        chave={cena.id}
        foundParts={[]}
      />
      {cena.mock.legenda && <p className="note">{cena.mock.legenda}</p>}
      <h1 className="q">{cena.pergunta}</h1>
      {hint && !pickedId && <p className="scene-hint">O link é o caminho que a mensagem quer. Veja as opções abaixo.</p>}
      <ChoiceList opcoes={cena.opcoes} picked={pickedId} onPick={choose} />
      {picked && cena.tipo === 'medidor' && picked.forca !== undefined && <ForcaReveal opcoes={cena.opcoes} picked={picked} />}
      <Celebrate trigger={fresh && picked?.q === 'melhor'} />
      {picked && <Feedback q={picked.q} porque={picked.porque} regra={cena.regra} saibaMais={cena.saibaMais} />}
    </>
  );
}

/** Medidor qualitativo das 3 senhas, mostrado apos responder. */
function ForcaReveal({ opcoes, picked }: { opcoes: Opcao[]; picked: Opcao }) {
  return (
    <div className="forca" role="group" aria-label="Força das senhas">
      {opcoes.map((o) => (
        <div key={o.id} className={`forca-row${o.id === picked.id ? ' on' : ''}`}>
          <span className="forca-t">{o.t}</span>
          <PasswordMeter nivel={o.forca ?? 0} />
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- toque nos sinais ---------------------------- */
export function SinalScene({ cena, saved, save }: { cena: CenaSinal; saved?: SceneAnswer; save: (a: SceneAnswer) => void }) {
  const total = cena.pontos.filter((p) => p.sinal).length;
  const found = saved?.found ?? [];
  const q: Qualidade = found.length >= total ? 'melhor' : 'aceitavel';

  if (saved?.done) {
    const parts = cena.pontos.map((p, i) => ({ p, i }));
    const foundParts = parts.filter(({ p }) => found.includes(p.id)).map(({ i }) => i);
    const missedParts = parts.filter(({ p }) => p.sinal && !found.includes(p.id)).map(({ i }) => i);
    const neutralParts = parts.filter(({ p }) => !p.sinal).map(({ i }) => i);
    return (
      <>
        <MessageSim mock={cena.mock} state="locked" foundParts={foundParts} missedParts={missedParts} neutralParts={neutralParts} animar={false} />
        <h1 className="q">{cena.pergunta}</h1>
        <div className="hint-list">
          {cena.pontos.map((p) => (
            <Explicacao key={p.id} tipo={!p.sinal ? 'neutro' : found.includes(p.id) ? 'sinal' : 'perdido'} titulo={p.t} texto={p.porque} />
          ))}
        </div>
        <Feedback q={saved.q ?? q} porque={porqueSinal(found.length, total)} regra={cena.regra} saibaMais={cena.saibaMais} />
      </>
    );
  }

  return (
    <>
      <h1 className="q">{cena.pergunta}</h1>
      <ToqueNosSinais
        mock={cena.mock}
        pontos={cena.pontos}
        chave={cena.id}
        onConcluir={(r) => save({ found: r.ids, done: true, q: r.achados >= r.total ? 'melhor' : 'aceitavel' })}
      />
    </>
  );
}

function porqueSinal(achados: number, total: number) {
  if (achados >= total) return `Você achou os ${total} sinais. Juntos, eles contam a história.`;
  if (achados === 0) return 'Nenhum sinal tocado, mas tudo bem: eles estão marcados acima, com o porquê.';
  return `Você achou ${achados} de ${total} sinais. Os que passaram estão marcados acima.`;
}

/* ---------------------------- ilustracao com pontos ---------------------------- */
export function IlustracaoScene({ cena, saved, save }: { cena: CenaIlustracao; saved?: SceneAnswer; save: (a: SceneAnswer) => void }) {
  const [found, setFound] = useState<string[]>(saved?.found ?? []);
  const [active, setActive] = useState<string | null>(null);
  const done = Boolean(saved?.done);
  const total = cena.pontos.filter((p) => p.sinal).length;
  const hotspots = useMemo(() => cena.pontos.map((p) => ({ id: p.id, label: p.t })), [cena.pontos]);
  const neutralIds = cena.pontos.filter((p) => !p.sinal).map((p) => p.id);
  const foundSignals = found.filter((id) => cena.pontos.find((p) => p.id === id)?.sinal);
  const missed = done ? cena.pontos.filter((p) => p.sinal && !found.includes(p.id)).map((p) => p.id) : [];
  const ponto = cena.pontos.find((p) => p.id === active);

  function tap(id: string) {
    if (done) return;
    setActive(id);
    setFound((f) => (f.includes(id) ? f : [...f, id]));
  }
  function conferir() {
    const q: Qualidade = foundSignals.length >= total ? 'melhor' : 'aceitavel';
    save({ found, done: true, q });
  }

  return (
    <>
      {cena.mock.legenda || cena.mock.body ? <p className="note">{cena.mock.from}: {cena.mock.body.replace(/\[\[|\]\]/g, '')}</p> : null}
      <h1 className="q">{cena.pergunta}</h1>
      <HotspotScene
        art={cena.ilustracao}
        hotspots={hotspots}
        foundIds={found}
        missedIds={missed}
        neutralIds={neutralIds}
        onTap={tap}
        descricao={cena.descricao}
        mostrarLegenda
        desligado={done}
      />
      {!done && ponto && <Explicacao key={ponto.id} tipo={ponto.sinal ? 'sinal' : 'neutro'} titulo={ponto.t} texto={ponto.porque} />}
      {!done && (
        <div className="ilus-bar">
          <p aria-live="polite"><strong>{foundSignals.length}</strong> de {total} sinais</p>
          <button type="button" className="btn btn--ghost" disabled={found.length === 0} onClick={conferir}>Conferir</button>
        </div>
      )}
      {done && (
        <>
          <div className="hint-list">
            {cena.pontos.map((p) => (
              <Explicacao key={p.id} tipo={!p.sinal ? 'neutro' : found.includes(p.id) ? 'sinal' : 'perdido'} titulo={p.t} texto={p.porque} />
            ))}
          </div>
          <Feedback q={saved?.q ?? 'aceitavel'} porque={porqueSinal(foundSignals.length, total)} regra={cena.regra} saibaMais={cena.saibaMais} />
        </>
      )}
    </>
  );
}

export function SceneView({ cena, saved, save }: { cena: Cena; saved?: SceneAnswer; save: (a: SceneAnswer) => void }) {
  if (cena.tipo === 'sinal') return <SinalScene cena={cena} saved={saved} save={save} />;
  if (cena.tipo === 'ilustracao') return <IlustracaoScene cena={cena} saved={saved} save={save} />;
  return <EscolhaScene cena={cena} saved={saved} save={save} />;
}

export { moodOf };
