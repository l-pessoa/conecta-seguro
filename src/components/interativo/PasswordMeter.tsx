'use client';
import { estimarSenha, rotuloDoNivel, TENTATIVAS_POR_SEGUNDO, type Nivel } from './estimarSenha';
import { IconAlert, IconCheck, IconDash } from './icones';
import './ix.css';
import s from './PasswordMeter.module.css';

export interface PasswordMeterProps {
  /** senha digitada: estima na hora, no aparelho */
  value?: string;
  /** alternativa sem senha: forca qualitativa 0..4 vinda do conteudo (nao mostra tempo) */
  nivel?: Nivel;
  /** esconde a nota de premissa */
  semNota?: boolean;
}

const TOM = ['risco', 'risco', 'meio', 'bom', 'bom'] as const;

export function PasswordMeter({ value = '', nivel, semNota = false }: PasswordMeterProps) {
  const est = nivel === undefined ? estimarSenha(value) : null;
  const n: Nivel | null = nivel ?? est?.nivel ?? null;

  if (n === null) {
    return (
      <div className={`ix ${s.raiz}`}>
        <div className={s.trilha} aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <i key={i} />)}</div>
        <p className={s.vazio}>Digite para ver o tempo estimado.</p>
      </div>
    );
  }
  const Icone = n >= 3 ? IconCheck : n === 2 ? IconDash : IconAlert;
  const rotulo = est?.rotulo ?? rotuloDoNivel(n);

  return (
    <div className={`ix ${s.raiz} ${s[TOM[n]]}`}>
      <div className={s.trilha} role="meter" aria-valuemin={0} aria-valuemax={4} aria-valuenow={n} aria-label="Força da senha">
        {[0, 1, 2, 3, 4].map((i) => <i key={i} className={i <= n ? s.cheio : ''} style={{ ['--i' as string]: i }} />)}
      </div>
      <div className={s.linha} role="status" aria-live="polite">
        <span key={rotulo} className={s.selo}><Icone width={16} height={16} />{rotulo}</span>
        {est && (
          <p className={s.tempo}>
            Quebraria em <strong key={est.tempo} className={s.valor}>{est.tempo}</strong>
          </p>
        )}
      </div>
      {est && <p className={s.dica}>{est.dica}</p>}
      {est && !semNota && (
        <p className={s.nota}>
          Estimativa didática: considera um ataque de {(TENTATIVAS_POR_SEGUNDO / 1e9).toFixed(0)} bilhões de tentativas por
          segundo, o pior caso. Não é garantia.
        </p>
      )}
    </div>
  );
}
