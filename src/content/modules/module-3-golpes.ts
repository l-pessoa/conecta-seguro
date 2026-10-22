import type { Modulo } from '../types';

export const module3: Modulo = {
  id: 3,
  titulo: 'Golpes e truques',
  linha: 'Conheça o truque antes de cair nele.',
  lema: ['RECONHECER', 'QUESTIONAR', 'CONFIRMAR'],
  gancho: 'Todo golpe usa um truque para você não pensar. Conhecer o truque é a melhor defesa.',
  retomada: 'Pressa + pedido sensível: pare e confirme. Código é só seu.',
  cenas: [
    {
      id: 'm3-c1',
      modulo: 3,
      verbo: 'RECONHECER',
      tatica: 'pressa e medo',
      tipo: 'mensagem',
      mock: {
        from: 'Suporte Aurora',
        time: '11:20',
        body: 'Detectamos um problema na sua conta. Confirme seus dados em 10 minutos ou o acesso será suspenso.',
      },
      pergunta: 'Qual truque está sendo usado aqui?',
      opcoes: [
        {
          id: 'a',
          t: 'Prêmio: promete algo bom pra você clicar e entregar seus dados',
          q: 'aceitavel',
          porque: 'Aqui não tem prêmio, tem ameaça. Mas "você ganhou!" é outro truque comum: vale reconhecer.',
        },
        {
          id: 'b',
          t: 'Amizade: fala como alguém que você conhece',
          q: 'aceitavel',
          porque: 'O tom é formal, não de amigo. Esse truque existe (cena 3), mas não é o principal aqui.',
        },
        {
          id: 'c',
          t: 'Pressa e medo: pouco tempo e ameaça de perder o acesso',
          q: 'melhor',
          porque: 'Prazo curto + ameaça tiram seu tempo de pensar. Quem tem problema real pode esperar você checar.',
        },
      ],
      regra: 'Pressa + pedido sensível: pare e confirme pelo app ou site oficial.',
      saibaMais: 'Urgência não é prova. Problema real continua existindo daqui a alguns minutos.',
    },
    {
      id: 'm3-c2',
      modulo: 3,
      verbo: 'QUESTIONAR',
      tatica: 'autoridade falsa + pedido de segredo',
      tipo: 'mensagem',
      mock: {
        from: 'Suporte (WhatsApp)',
        time: '19:05',
        body: 'Oi! Sou do suporte. Vi uma atividade estranha. Pra confirmar que é você, me manda o código que chegou no seu celular.',
      },
      pergunta: 'O que você faz?',
      opcoes: [
        {
          id: 'a',
          t: 'Mando o código: parece mesmo do suporte',
          q: 'arriscado',
          porque: 'Cargo e tom formal não provam nada. Código de verificação é só seu, nem para o suporte de verdade.',
        },
        {
          id: 'b',
          t: 'Não mando e confiro pelo site ou app oficial',
          q: 'melhor',
          porque: 'Suporte de verdade não pede código por mensagem. Conferir por fora da conversa é o caminho seguro.',
        },
        {
          id: 'c',
          t: 'Peço pra ele provar que é do suporte antes de mandar o código',
          q: 'aceitavel',
          porque: 'Bom instinto, mas quem aplica golpe inventa prova. A checagem tem que vir de fora da conversa.',
        },
      ],
      regra: 'Código de verificação é só seu. Nunca passe, nem para o "suporte".',
      saibaMais: 'Nem metade do código: qualquer parte pode ser o suficiente para entrar na sua conta.',
    },
    {
      id: 'm3-c3',
      modulo: 3,
      verbo: 'CONFIRMAR',
      tatica: '"é um conhecido"',
      tipo: 'mensagem',
      mock: {
        from: 'Rafa (amigo)',
        time: '21:48',
        body: 'Mano, tô tentando recuperar minha conta e o código foi pro seu cel. Me manda aí rapidinho?',
      },
      pergunta: 'O que você faz?',
      opcoes: [
        {
          id: 'a',
          t: 'Não mando e ligo pro Rafa para confirmar',
          q: 'melhor',
          porque: 'Pedido fora do normal, até de amigo, vale confirmar por outro canal. Uma ligação resolve.',
        },
        {
          id: 'b',
          t: 'Pergunto por que o código chegou no meu cel',
          q: 'aceitavel',
          porque: 'Boa dúvida, mas se a conta foi invadida quem responde é o golpista. Confirme fora da conversa.',
        },
        {
          id: 'c',
          t: 'Mando: é o Rafa, eu conheço',
          q: 'arriscado',
          porque: 'A conta do Rafa pode ter sido invadida. O golpe usa pessoas que você conhece.',
        },
      ],
      regra: 'Pediu algo fora do normal, até um amigo? Confirme por outro canal.',
      saibaMais: 'Você não está desconfiando do Rafa: está protegendo vocês dois.',
    },
  ],
  pratica: [
    'Pressa + pedido sensível: pare e confirme.',
    'Código de verificação é só seu. Nunca passe.',
    'Até de amigo, pedido estranho: confirme por outro canal.',
  ],
};
