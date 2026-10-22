/**
 * Tipos do conteudo do ConectaSeguro v2.
 * Dono: `conteudo`. Consumidores: `front` (telas), `interacoes` (componentes interativos),
 * `backend` (gabarito do quiz, que NUNCA entra aqui: ver src/lib/server/gabarito.ts).
 * Texto de tela: [[trecho]] dentro de `from`/`body` vira trecho tocavel.
 */

export type ModuloId = 1 | 2 | 3 | 4 | 5 | 6;

/** Qualidade pedagogica de uma opcao. Rotulos: Boa escolha, Da pra melhorar, Arriscado, Exagero. */
export type Qualidade = 'melhor' | 'aceitavel' | 'arriscado' | 'exagero';

export const ROTULO_QUALIDADE: Record<Qualidade, string> = {
  melhor: 'Boa escolha',
  aceitavel: 'Dá pra melhorar',
  arriscado: 'Arriscado',
  exagero: 'Exagero',
};

/** Tela simulada: chat, aviso, notificacao, SMS, formulario, post. HTML real, nao imagem. */
export interface Mensagem {
  from: string;
  /** hora de exibicao, ex '14:07' ou 'agora' (opcional; o design pode inventar) */
  time?: string;
  /** corpo, <=140 car; [[trecho]] = tocavel (link do aviso ou sinal) */
  body: string;
  /** rotulo de um campo de formulario simulado (ex 'Senha') */
  campo?: string;
  /** frase de contexto abaixo do mock (ex 'Voce esta mesmo esperando uma encomenda.') */
  legenda?: string;
  /** texto do trecho [[...]] que e o "link" da mensagem (nao deve ser tocado para verificar) */
  link?: string;
}

/** Opcao de uma cena de decisao. */
export interface Opcao {
  /** 'a' | 'b' | 'c'. A posicao da melhor varia entre cenas (testado). */
  id: 'a' | 'b' | 'c';
  /** texto da opcao, <=70 car */
  t: string;
  /** nota entre parenteses curta, ex 'nome + ano' */
  hint?: string;
  q: Qualidade;
  /** porque, <=150 car; existe em TODAS as opcoes, inclusive a melhor */
  porque: string;
  /** so no tipo 'medidor': forca qualitativa 0 (muito fraca) a 4 (forte), revelada apos a resposta */
  forca?: 0 | 1 | 2 | 3 | 4;
}

/** Ponto de toque: trecho do mock (tipo 'sinal') ou area da ilustracao (tipo 'ilustracao'). */
export interface Ponto {
  id: string;
  /** rotulo curto; no tipo 'sinal' e IGUAL ao texto do [[trecho]] correspondente */
  t: string;
  /** explicacao mostrada ao tocar, <=150 car */
  porque: string;
  /** true = sinal de alerta; false = elemento neutro ("Sem problema"), tocar nele nao e erro */
  sinal: boolean;
  /** so em 'ilustracao': retangulo em % da ilustracao (0-100) */
  area?: { x: number; y: number; w: number; h: number };
}

/** Interacoes (campo `tipo`). */
export type TipoCena =
  | 'escolha' // mock + 3 opcoes
  | 'mensagem' // igual a escolha, mas o mock e apresentado como conversa que chega (animacao de chat)
  | 'medidor' // escolha de senhas; cada opcao tem `forca` e o medidor aparece apos responder
  | 'sinal' // toque nos trechos [[...]] do mock
  | 'ilustracao'; // toque em pontos de uma ilustracao interativa

/** Ids das ilustracoes interativas (desenhadas por `interacoes`). */
export type IlustracaoId = 'mesa';

interface CenaBase {
  /** ex 'm1-c1' */
  id: string;
  modulo: ModuloId;
  /** verbo do lema que a cena treina (ex 'CRIAR') */
  verbo: string;
  /** tatica nomeada (inoculacao), quando houver */
  tatica?: string;
  /** <=70 car */
  pergunta: string;
  /** apos responder, <=90 car */
  regra: string;
  /** 1 linha, <=120 car, dentro do feedback */
  saibaMais?: string;
}

export interface CenaEscolha extends CenaBase {
  tipo: 'escolha' | 'mensagem' | 'medidor';
  mock: Mensagem;
  /** exatamente 3 */
  opcoes: Opcao[];
}

export interface CenaSinal extends CenaBase {
  tipo: 'sinal';
  mock: Mensagem;
  /** um ponto por [[trecho]] do mock (inclui exatamente 1 neutro) */
  pontos: Ponto[];
}

export interface CenaIlustracao extends CenaBase {
  tipo: 'ilustracao';
  ilustracao: IlustracaoId;
  /** texto acessivel da ilustracao e contexto (leitor de tela) */
  descricao: string;
  /** legenda curta acima da ilustracao */
  mock: Mensagem;
  pontos: Ponto[];
}

export type Cena = CenaEscolha | CenaSinal | CenaIlustracao;

export interface Modulo {
  id: ModuloId;
  /** <=28 car */
  titulo: string;
  /** 1 linha para o mapa de modulos */
  linha: string;
  /** exatamente 3 verbos em maiusculas */
  lema: [string, string, string];
  /** <=110 car */
  gancho: string;
  /** Regra-resumo do modulo; aparece no cartao "Retomada" do modulo seguinte */
  retomada: string;
  /** exatamente 3 */
  cenas: Cena[];
  /** "Na prática", 3 itens <=60 car */
  pratica: [string, string, string];
}

/* ---------------- Quiz (pre = Forma A, pos = Forma B) ---------------- */

export type OpcaoQuizId = 'A' | 'B' | 'C' | 'D';

export interface OpcaoQuiz {
  id: OpcaoQuizId;
  t: string;
}

/** Item do quiz SEM resposta correta. A correcao vive em src/lib/server/gabarito.ts. */
export interface ItemQuiz {
  /** ex 'a-m1-1' (forma, modulo, ordem) */
  id: string;
  modulo: ModuloId;
  competencia: string;
  situacao: string;
  pergunta: string;
  /** 4 opcoes. A interface do app acrescenta o botao "Não sei" (nao faz parte dos dados). */
  opcoes: OpcaoQuiz[];
}

export type FormaQuiz = ItemQuiz[];

/* ---------------- Telas fora dos modulos ---------------- */

export interface Home {
  titulo: string;
  subtitulo: string;
  /** hook interativo da landing */
  gancho: { from: string; body: string; pergunta: string; acoes: [string, string]; revelacao: string };
  fatos: string[];
  temas: { id: string; titulo: string }[];
  comoFunciona: { titulo: string; passos: string[] };
  privacidade: string[];
  faq: { p: string; r: string }[];
  cta: string;
}

export interface Consentimento {
  titulo: string;
  corpo: string[];
  checkbox: string;
  botao: string;
  /** TODO: texto provisorio, depende do orientador (publico menor de 18) */
  provisorio: true;
}

export interface IntroQuiz {
  titulo: string;
  corpo: string;
  botao: string;
}

export interface Resultado {
  titulo: string;
  frase: string;
  /** o que a pessoa fez: montado pelo app a partir de {n} modulos e {n} situacoes */
  oQueFez: string[];
  /** rotulos por nivel de revisao de cada modulo (sem numero) */
  niveis: { forte: string; evoluiu: string; rever: string };
  aviso: string;
  /** plano de acao: 1 acao por modulo */
  plano: { modulo: ModuloId; acao: string }[];
  /** botao opcional: explicacoes das situacoes do pos */
  verExplicacoes: string;
  ajuda: { texto: string; rotuloLink: string; url: string };
}
