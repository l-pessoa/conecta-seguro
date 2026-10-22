import type { Modulo } from '../types';

export const module5: Modulo = {
  id: 5,
  titulo: 'Redes sociais',
  linha: 'Pense em quem vê e no que você constrói.',
  lema: ['PENSAR', 'REPRESENTAR', 'CUIDAR'],
  gancho: 'Cada post é um pedacinho de como os outros te veem. Dá pra escolher com calma.',
  retomada: 'Post público tem público de verdade. Perfil novo de conhecido? Confirme por outro canal.',
  cenas: [
    {
      id: 'm5-c1',
      modulo: 5,
      verbo: 'PENSAR',
      tipo: 'escolha',
      mock: {
        from: 'Rascunho · Público',
        body: 'Foto da festa + "📍 Casa do Vitor. Vou ficar até tarde!" Quem pode ver: qualquer pessoa.',
      },
      pergunta: 'O que mais vale pensar antes de postar?',
      opcoes: [
        {
          id: 'a',
          t: 'Quem, além dos amigos, vai ver isso e o que revela',
          q: 'melhor',
          porque: 'Qualquer pessoa pode ver onde você está e até quando. Pense no público real, não só nos amigos.',
        },
        {
          id: 'b',
          t: 'Se a foto ficou bem iluminada, nítida e com boa composição',
          q: 'aceitavel',
          porque: 'Qualidade importa pouco aqui. O que mais pesa é quem vê e o que o post conta.',
        },
        {
          id: 'c',
          t: 'Se os amigos vão curtir a legenda',
          q: 'aceitavel',
          porque: 'Os amigos são só parte do público. Post público alcança bem mais gente.',
        },
      ],
      regra: 'Post público tem público de verdade: pense em quem pode ver.',
      saibaMais: 'Dá para postar depois, quando você já saiu do lugar.',
    },
    {
      id: 'm5-c2',
      modulo: 5,
      verbo: 'REPRESENTAR',
      tipo: 'escolha',
      mock: { from: 'Seu perfil', body: 'Você apagou um post ontem. Hoje alguém manda no grupo um print dele.' },
      pergunta: 'O que isso mostra?',
      opcoes: [
        {
          id: 'a',
          t: 'Que apagar resolve: depois que eu apago o post, ele some de vez',
          q: 'arriscado',
          porque: 'Quem viu pode ter salvo ou printado antes. Apagar ajuda, mas não garante.',
        },
        {
          id: 'b',
          t: 'Que apagar ajuda, mas o melhor é pensar antes de postar',
          q: 'melhor',
          porque: 'Não existe botão de voltar total. Pensar antes é o que realmente protege.',
        },
        {
          id: 'c',
          t: 'Que é melhor não postar mais nada',
          q: 'exagero',
          porque: 'Postar não é o problema. O hábito de pensar antes já faz diferença.',
        },
      ],
      regra: 'O que você posta continua representando você, mesmo depois de apagar.',
      saibaMais: 'Se alguém repostou algo seu sem querer, peça para apagar e denuncie na rede.',
    },
    {
      id: 'm5-c3',
      modulo: 5,
      verbo: 'CUIDAR',
      tatica: '"é um conhecido"',
      tipo: 'mensagem',
      mock: {
        from: 'Bia (perfil novo)',
        time: '20:12',
        body: 'Perdi meu antigo acesso! Segue esse perfil novo e me manda teu número pra eu te adicionar.',
        legenda: 'Fotos da Bia · 3 amigos em comum',
      },
      pergunta: 'Como ter certeza de que é a Bia?',
      opcoes: [
        {
          id: 'a',
          t: 'Comparo as fotos e os amigos em comum com o perfil antigo',
          q: 'aceitavel',
          porque: 'Fotos e amigos em comum podem ser copiados. Tudo isso fica dentro do perfil suspeito.',
        },
        {
          id: 'b',
          t: 'Chamo de vídeo pelo perfil novo',
          q: 'aceitavel',
          porque: 'Ajuda, mas continua dentro do perfil suspeito. Melhor confirmar fora dele.',
        },
        {
          id: 'c',
          t: 'Falo com ela por um contato que eu já tinha',
          q: 'melhor',
          porque: 'Confirmar por um canal que você já conhecia não depende do perfil novo.',
        },
      ],
      regra: 'Perfil novo de conhecido? Confirme por um contato que você já tinha.',
      saibaMais: 'Se for golpe, avise a Bia e denuncie o perfil: você ajuda outras pessoas.',
    },
  ],
  pratica: [
    'Post público tem público de verdade.',
    'Apagar ajuda, mas não desfaz: pense antes.',
    'Perfil novo de conhecido? Confirme por outro contato.',
  ],
};
