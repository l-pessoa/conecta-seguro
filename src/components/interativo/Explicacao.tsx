'use client';
import { IconAlert, IconCheck, IconDash } from './icones';
import './ix.css';
import s from './Explicacao.module.css';

export type TipoExplicacao = 'sinal' | 'neutro' | 'perdido';

const ROTULO: Record<TipoExplicacao, string> = {
  sinal: 'Sinal de alerta',
  neutro: 'Sem problema',
  perdido: 'Passou despercebido',
};

export interface ExplicacaoProps {
  tipo: TipoExplicacao;
  titulo?: string;
  texto: string;
}

/** Cartao curto que sobe ao tocar num ponto. role=status para leitor de tela. */
export function Explicacao({ tipo, titulo, texto }: ExplicacaoProps) {
  const Icone = tipo === 'sinal' ? IconCheck : tipo === 'neutro' ? IconDash : IconAlert;
  return (
    <div className={`ix ${s.raiz} ${s[tipo]}`} role="status">
      <span className={s.icone}><Icone width={18} height={18} /></span>
      <div>
        <p className={s.rotulo}>{ROTULO[tipo]}{titulo ? `: ${titulo}` : ''}</p>
        <p className={s.texto}>{texto}</p>
      </div>
    </div>
  );
}
