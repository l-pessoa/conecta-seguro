import type { Resultado } from './types';

/** Resultado sem nota numerica: o que a pessoa fez + plano de acao + ajuda. */
export const result: Resultado = {
  titulo: 'Jornada concluída',
  frase:
    'Você não precisa saber reconhecer todos os problemas da internet. Precisa saber parar, pensar e escolher o próximo passo.',
  oQueFez: [
    'Você passou por {modulos} de 6 módulos.',
    'Você decidiu em {cenas} situações do dia a dia.',
    'Você respondeu 12 situações no início e 12 no fim.',
  ],
  niveis: {
    forte: 'Você já ia bem nesse tema',
    evoluiu: 'Você evoluiu nesse tema',
    rever: 'Vale rever esse módulo',
  },
  aviso: 'São só 2 situações por tema: veja como uma dica, não como nota.',
  plano: [
    { modulo: 1, acao: 'Troque a senha do seu e-mail por uma frase longa e ligue a verificação em duas etapas.' },
    { modulo: 2, acao: 'Na próxima mensagem com link, abra o app ou site em vez de tocar no link.' },
    { modulo: 3, acao: 'Combine com um amigo: pedido de código ou dinheiro só se confirma por ligação.' },
    { modulo: 4, acao: 'Abra as permissões de um app que você usa e tire o que ele não precisa.' },
    { modulo: 5, acao: 'Antes do próximo post público, olhe o fundo da foto e a marcação de local.' },
    { modulo: 6, acao: 'Se errar: troque a senha pelo app, saia dos aparelhos e peça ajuda.' },
  ],
  verExplicacoes: 'Ver as explicações das 12 situações',
  ajuda: {
    texto: 'Se alguém ameaçar ou chantagear você na internet, fale com um adulto de confiança. A SaferNet atende por chat.',
    rotuloLink: 'Falar com a SaferNet',
    url: 'https://new.safernet.org.br/helpline',
  },
};
