import type { Modulo } from '../types';

export const module4: Modulo = {
  id: 4,
  titulo: 'Privacidade',
  linha: 'Decida o que mostrar e para quem.',
  lema: ['PENSAR', 'CONTROLAR', 'COMPARTILHAR'],
  gancho: 'Uma foto mostra mais do que você quer. Dá pra decidir o que mostrar e pra quem.',
  retomada: 'Antes de postar, olhe o fundo. Libere só a permissão que faz sentido.',
  cenas: [
    {
      id: 'm4-c1',
      modulo: 4,
      verbo: 'PENSAR',
      tipo: 'ilustracao',
      ilustracao: 'mesa',
      descricao:
        'Foto de uma mesa: uniforme escolar com o nome da escola, um documento, uma tela de computador com uma conversa e um código de acesso, e um gato dormindo.',
      mock: { from: 'Rascunho de post', body: 'Foto da sua mesa, pronta pra postar.' },
      pergunta: 'Toque no que a foto entrega sem querer.',
      pontos: [
        {
          id: 'uniforme',
          t: 'Uniforme com o nome da escola',
          sinal: true,
          area: { x: 8, y: 40, w: 26, h: 30 },
          porque: 'Mostra onde você está todo dia.',
        },
        {
          id: 'documento',
          t: 'Documento na mesa',
          sinal: true,
          area: { x: 40, y: 58, w: 28, h: 24 },
          porque: 'Documentos têm nome, número e dados que não são para estranhos.',
        },
        {
          id: 'tela',
          t: 'Tela com conversa e código',
          sinal: true,
          area: { x: 60, y: 12, w: 32, h: 34 },
          porque: 'Uma conversa privada e um código de acesso. Quem vê pode ler ou usar.',
        },
        {
          id: 'gato',
          t: 'Seu gato dormindo',
          sinal: false,
          area: { x: 10, y: 8, w: 22, h: 22 },
          porque: 'Isso não é problema. Postar foto é normal; o hábito é olhar o fundo antes.',
        },
      ],
      regra: 'A foto mostra mais do que você quis. Olhe o fundo antes de postar.',
      saibaMais: 'Dá para cortar ou desfocar antes de postar. Foto boa e privacidade combinam.',
    },
    {
      id: 'm4-c2',
      modulo: 4,
      verbo: 'CONTROLAR',
      tipo: 'escolha',
      mock: {
        from: 'App Foto Fácil',
        body: 'Para funcionar, o app pede acesso a: Fotos · Localização · Contatos · Microfone',
      },
      pergunta: 'É um editor de fotos. O que você faz?',
      opcoes: [
        {
          id: 'a',
          t: 'Aceito tudo, senão pode não funcionar',
          q: 'arriscado',
          porque: 'Nem toda permissão é necessária. Aceitar tudo dá ao app mais acesso do que ele precisa.',
        },
        {
          id: 'b',
          t: 'Nego tudo sem olhar',
          q: 'exagero',
          porque: 'Algumas fazem sentido: editor de foto precisa das fotos. O jeito é olhar uma por uma.',
        },
        {
          id: 'c',
          t: 'Libero só "Fotos" e nego o resto',
          q: 'melhor',
          porque: 'Editar foto precisa das fotos. Localização, contatos e microfone não têm a ver com isso.',
        },
      ],
      regra: 'Permissão não é obrigação. Pergunte: o app precisa disso para o que eu quero?',
      saibaMais: 'Dá para mudar depois: Configurações > Apps > Permissões.',
    },
    {
      id: 'm4-c3',
      modulo: 4,
      verbo: 'COMPARTILHAR',
      tipo: 'escolha',
      mock: {
        from: 'Seus stories · semana',
        body: 'Seg: treino na Academia Pro, 6h. Ter: saindo do Colégio Sol, 12h. Qua: sozinho em casa hoje.',
      },
      pergunta: 'Juntos, o que esses 3 posts mostram?',
      opcoes: [
        {
          id: 'a',
          t: 'Minha rotina, onde estudo e quando estou sozinho',
          q: 'melhor',
          porque: 'Cada post parece inofensivo; juntos viram um retrato do seu dia. Vale pensar no conjunto.',
        },
        {
          id: 'b',
          t: 'Nada de mais: cada post, sozinho, é totalmente inofensivo',
          q: 'arriscado',
          porque: 'Sozinhos parecem inofensivos, mas juntos mostram horários e lugares.',
        },
        {
          id: 'c',
          t: 'Que eu deveria parar de postar',
          q: 'exagero',
          porque: 'Postar não é o problema. Escolher o quê, para quem e quando já resolve boa parte.',
        },
      ],
      regra: 'Pense no conjunto, não só no post: lugar, hora e rotina somam.',
      saibaMais: 'Dá para deixar stories só para "Amigos próximos".',
    },
  ],
  pratica: [
    'Olhe o fundo da foto antes de postar.',
    'Libere só a permissão que o app precisa.',
    'Pense no conjunto: lugar, hora e rotina.',
  ],
};
