import type { Consentimento, IntroQuiz } from './types';

/** TEXTO PROVISORIO: depende da avaliacao de etica/orientador (publico menor de 18 anos). */
export const consent: Consentimento = {
  titulo: 'Antes de começar',
  corpo: [
    'Você não precisa dizer seu nome. Vai receber um código só seu, para ligar suas respostas a você sem revelar quem você é.',
    'Suas respostas podem entrar, de forma anônima, num trabalho da universidade sobre segurança digital.',
    'Você pode parar quando quiser.',
  ],
  checkbox: 'Entendi e quero continuar',
  botao: 'Começar',
  provisorio: true,
};

export const introPre: IntroQuiz = {
  titulo: 'Antes da jornada',
  corpo: '6 situações rápidas, só para ver o que você já sabe. Não vale nota. Se não souber, tudo bem: marque "Não sei".',
  botao: 'Começar',
};

export const introPos: IntroQuiz = {
  titulo: 'Última etapa',
  corpo: '6 situações novas, parecidas com as do início, mas com cenários diferentes. Sem nota e sem ranking.',
  botao: 'Começar',
};
