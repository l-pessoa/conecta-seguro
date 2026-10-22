import type { Modulo } from '../types';

export const module2: Modulo = {
  id: 2,
  titulo: 'Links e mensagens',
  linha: 'Perceba o que é estranho e confira.',
  lema: ['PERCEBER', 'VERIFICAR', 'AGIR'],
  gancho: 'Chegou mensagem com link. Dá pra perceber o que é estranho e checar com calma.',
  retomada: 'Mensagem inesperada? Não use o link: confirme pelo app ou site que você já conhece.',
  cenas: [
    {
      id: 'm2-c1',
      modulo: 2,
      verbo: 'PERCEBER',
      tatica: 'pressa + link escondido',
      tipo: 'sinal',
      mock: {
        from: '[[Número desconhecido]]',
        time: '16:41',
        body: '[[Seu pedido não foi entregue.]] [[Atualize seu endereço agora]] ou ele será devolvido: [[bit.ly/entrega-4x7]]',
      },
      pergunta: 'Toque no que parece estranho.',
      pontos: [
        {
          id: 'numero',
          t: 'Número desconhecido',
          sinal: true,
          porque: 'Loja de verdade avisa pelo app ou por um canal que você já usa, não por número solto.',
        },
        {
          id: 'entregue',
          t: 'Seu pedido não foi entregue.',
          sinal: false,
          porque: 'Isso sozinho não é sinal. Mensagens reais também falam isso. Olhe o conjunto.',
        },
        {
          id: 'pressa',
          t: 'Atualize seu endereço agora',
          sinal: true,
          porque: 'Pressa + pedido de dado. É assim que tentam te fazer agir sem pensar.',
        },
        {
          id: 'link',
          t: 'bit.ly/entrega-4x7',
          sinal: true,
          porque: 'Link encurtado esconde o destino real. Você só vê para onde vai depois de abrir.',
        },
      ],
      regra: 'Um sinal solto é dúvida. Pressa, link escondido e pedido juntos pedem que você pare.',
      saibaMais: 'Não precisa clicar para checar: abra o app da loja e veja o pedido por lá.',
    },
    {
      id: 'm2-c2',
      modulo: 2,
      verbo: 'VERIFICAR',
      tatica: 'pressa',
      tipo: 'mensagem',
      mock: {
        from: 'Loja Neon · mensagem',
        time: 'agora',
        body: 'Seu pedido teve um problema. Resolva em 10 minutos ou ele será cancelado. [[Resolver agora]]',
        link: 'Resolver agora',
      },
      pergunta: 'O que você faz?',
      opcoes: [
        {
          id: 'a',
          t: 'Abro o app da loja por conta própria e confiro o pedido',
          q: 'melhor',
          porque: 'Se o problema for real, aparece lá. Pedido de verdade continua esperando daqui a cinco minutos.',
        },
        {
          id: 'b',
          t: 'Clico agora, antes que cancele',
          q: 'arriscado',
          porque: 'Pressa é a ferramenta do golpe: ela quer que você aja antes de pensar.',
        },
        {
          id: 'c',
          t: 'Mando para um amigo e vejo o que ele acha',
          q: 'aceitavel',
          porque: 'Passa a dúvida adiante, mas não confirma nada. A resposta está na loja, não no amigo.',
        },
      ],
      regra: 'Prazo apertado não é prova. Confirme por onde você já conhece.',
      saibaMais: 'Responder à mensagem também avisa ao golpista que seu número está ativo.',
    },
    {
      id: 'm2-c3',
      modulo: 2,
      verbo: 'AGIR',
      tatica: 'aparência copiada',
      tipo: 'escolha',
      mock: {
        from: 'Cartaz na rua · QR Code',
        body: '"Ganhe 50% off na Plataforma X! Escaneie." Você escaneia e abre uma página pedindo seu login.',
        campo: 'Login',
      },
      pergunta: 'O que você faz?',
      opcoes: [
        {
          id: 'a',
          t: 'Entro, se a página for igual à da plataforma',
          q: 'arriscado',
          porque: 'Visual se copia em minutos. Parecer igual não prova que é a página de verdade.',
        },
        {
          id: 'b',
          t: 'Fecho e entro pelo app ou site que eu já conheço',
          q: 'melhor',
          porque: 'Você vai pelo caminho que já conhece. Se a promoção existir, aparece lá.',
        },
        {
          id: 'c',
          t: 'Confiro o cadeado do navegador e, se tiver, entro',
          q: 'aceitavel',
          porque: 'Cadeado só diz que a conexão é protegida. Site falso também pode ter.',
        },
      ],
      regra: 'QR Code é um link disfarçado. Na dúvida, vá pelo caminho que você já conhece.',
      saibaMais: 'Dá para ver o endereço antes de abrir: leia o link que a câmera mostra antes de tocar.',
    },
  ],
  pratica: [
    'Mensagem inesperada com link? Não use o link.',
    'Abra o app ou site que você já conhece e confira lá.',
    'Pressa e prazo curto não provam nada.',
  ],
};
