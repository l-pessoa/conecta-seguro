import type { Modulo } from '../types';

export const module6: Modulo = {
  id: 6,
  titulo: 'Algo parece estranho',
  linha: 'Junte tudo: pare, avalie, aja.',
  lema: ['PARAR', 'AVALIAR', 'AGIR'],
  gancho: 'Última parada: use tudo o que você viu. Nem toda mensagem é golpe, e nem todo erro é o fim.',
  retomada: 'Quem pode ver? Apagar não garante sumir. Perfil novo de conhecido: confirme por outro canal.',
  cenas: [
    {
      id: 'm6-c1',
      modulo: 6,
      verbo: 'PARAR',
      tipo: 'mensagem',
      mock: {
        from: 'Número desconhecido',
        time: '15:30',
        body: 'Sua encomenda está parada. Pague uma taxa de R$ 4,90 no link pra liberar. [[Pagar taxa]]',
        link: 'Pagar taxa',
        legenda: 'Você está mesmo esperando uma encomenda.',
      },
      pergunta: 'O que você faz primeiro?',
      opcoes: [
        {
          id: 'a',
          t: 'Pesquiso o número na internet e confio nos comentários',
          q: 'aceitavel',
          porque: 'Comentários ajudam, mas podem ser falsos ou antigos. A fonte mais segura é a loja ou a transportadora.',
        },
        {
          id: 'b',
          t: 'Pago: a encomenda existe e a taxa é pequena',
          q: 'arriscado',
          porque: 'A encomenda ser real não torna a mensagem real. Golpe usa o que você já está esperando.',
        },
        {
          id: 'c',
          t: 'Paro e consulto o pedido no app ou site oficial',
          q: 'melhor',
          porque: 'Você confirma por fora da mensagem. Se tiver taxa de verdade, aparece lá.',
        },
      ],
      regra: 'A encomenda ser real não torna a mensagem real. Pare e consulte a fonte.',
      saibaMais: 'Taxa de entrega real costuma aparecer no app ou no rastreio oficial, não só num link solto.',
    },
    {
      id: 'm6-c2',
      modulo: 6,
      verbo: 'AVALIAR',
      tipo: 'escolha',
      mock: {
        from: 'App do Banco · notificação',
        time: '14:02',
        body: 'Novo login no seu celular, às 14h02. Foi você? Confirme no app.',
        legenda: 'Você acabou de entrar no app do banco.',
      },
      pergunta: 'Isso pede algum cuidado especial?',
      opcoes: [
        {
          id: 'a',
          t: 'Sim, é golpe: apago, bloqueio e troco todas as senhas',
          q: 'exagero',
          porque: 'Aqui tudo bate: você acabou de entrar, não há link nem pedido de dado. Reagir demais cansa e confunde.',
        },
        {
          id: 'b',
          t: 'Não: bate com o que acabei de fazer, confirmo no app',
          q: 'melhor',
          porque: 'Sem link, sem pressa, sem pedido de senha, e combina com o que você fez. Dá para seguir tranquilo.',
        },
        {
          id: 'c',
          t: 'Respondo a notificação perguntando se é oficial',
          q: 'aceitavel',
          porque: 'Não precisa: notificação não conversa. Abrir o app e conferir basta.',
        },
      ],
      regra: 'Nem tudo é golpe: avalie pressa, link e pedido antes de reagir.',
      saibaMais: 'Na dúvida, abra o app por conta própria e confira. Custa dez segundos.',
    },
    {
      id: 'm6-c3',
      modulo: 6,
      verbo: 'AGIR',
      tipo: 'escolha',
      mock: {
        from: 'Seu momento "ops"',
        body: 'Você clicou num link estranho e digitou sua senha numa página que não conhecia.',
      },
      pergunta: 'O que você faz agora?',
      opcoes: [
        {
          id: 'a',
          t: 'Escondo: tenho vergonha de ter caído',
          q: 'arriscado',
          porque: 'Esconder só atrasa a proteção. Acontece com qualquer pessoa; o que vale é o que você faz agora.',
        },
        {
          id: 'b',
          t: 'Só fecho a página e desinstalo o app que eu usei pra abrir o link',
          q: 'aceitavel',
          porque: 'Para o contato, mas a senha já foi entregue e precisa ser trocada.',
        },
        {
          id: 'c',
          t: 'Troco a senha pelo app oficial e saio de aparelhos desconhecidos',
          q: 'melhor',
          porque: 'Corta o acesso do golpista. Se usava a mesma senha em outro lugar, troque lá também. Peça ajuda se precisar.',
        },
      ],
      regra: 'Errou? Aja rápido: troque a senha pelo app e saia dos aparelhos.',
      saibaMais: 'Perdeu o celular? Bloqueie pelo "encontrar aparelho" e saia das contas por outro aparelho.',
    },
  ],
  pratica: [
    'Pare antes de agir: pressa é sinal.',
    'Avalie: pressa, link e pedido de dado juntos pedem cuidado.',
    'Errou? Troque a senha, saia dos aparelhos, peça ajuda.',
  ],
};
