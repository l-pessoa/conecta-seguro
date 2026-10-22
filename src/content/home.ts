import type { Home } from './types';

export const home: Home = {
  titulo: 'Pare, pense, escolha.',
  subtitulo: 'Uma jornada rápida para decidir melhor no que chega pelo celular.',
  gancho: {
    from: 'Nova mensagem',
    body: 'Vaga rápida! Só hoje: presente surpresa pra quem clicar antes que acabe.',
    pergunta: 'O que você faria?',
    acoes: ['Clicar logo', 'Parar e olhar'],
    revelacao: 'Nem precisa responder agora. É esse tipo de decisão que a gente treina aqui, sem pressão.',
  },
  fatos: ['6 módulos curtos', 'Sem nota e sem ranking', 'Pelo celular, no seu ritmo'],
  temas: [
    { id: 'senhas', titulo: 'Senhas' },
    { id: 'links', titulo: 'Links' },
    { id: 'golpes', titulo: 'Golpes' },
    { id: 'privacidade', titulo: 'Privacidade' },
    { id: 'redes', titulo: 'Redes' },
    { id: 'estranho', titulo: 'Algo estranho' },
  ],
  comoFunciona: {
    titulo: 'Você decide, a gente explica.',
    passos: [
      'Você vê uma situação do dia a dia e escolhe o que faria.',
      'Logo depois vem o porquê de cada opção, nunca uma bronca.',
      'Cada módulo termina com 3 ações práticas para levar.',
    ],
  },
  privacidade: [
    'Você não precisa dizer seu nome.',
    'Não tem nota nem ranking.',
    'Você pode parar quando quiser e voltar de onde parou.',
  ],
  faq: [
    { p: 'Quanto tempo leva?', r: 'Uns 3 minutos por módulo. Dá para fazer em mais de uma vez; o app lembra onde você parou.' },
    { p: 'Tem nota?', r: 'Não. Nada aqui é prova. As situações do início e do fim servem para ver o que você já sabe e o que ficou.' },
    { p: 'Preciso me identificar?', r: 'Não. Você recebe um código só seu, que não revela quem você é.' },
    { p: 'Posso pular?', r: 'Pode. Toda cena tem "Pular" e os módulos abrem em qualquer ordem.' },
  ],
  cta: 'Começar a jornada',
};
