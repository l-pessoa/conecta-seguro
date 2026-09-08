import type { ModuleDefinition } from '@/lib/types';

export const module6: ModuleDefinition = {
  id: 6,
  title: 'O Que Fazer Quando Algo Parece Suspeito',
  logic: 'PARAR → AVALIAR → AGIR',
  env: 'mirante',
  scenes: [
    {
      id: 'm6-s1',
      module: 6,
      env: 'mirante',
      setup: [
        {
          text: 'Uma mensagem combina vários sinais já vistos na jornada: chegou sem aviso, pede algo com urgência, tem um link, pede uma informação.',
        },
      ],
      prompt: 'Antes de fazer qualquer coisa, qual é o primeiro passo?',
      choices: [
        {
          id: 'a',
          text: 'Clicar no link pra entender do que se trata',
          quality: 'arriscado',
          feedback:
            'Clicar pra "entender" já é agir. O primeiro passo é observar a situação inteira antes de qualquer clique.',
        },
        {
          id: 'b',
          text: 'Responder pedindo mais detalhes',
          quality: 'arriscado',
          feedback: 'Responder já é interagir com a situação sem ainda ter avaliado o que está acontecendo.',
        },
        {
          id: 'c',
          text: 'Parar e observar a situação como um todo antes de agir',
          quality: 'melhor',
          feedback:
            'Exatamente: parar antes de agir dá espaço pra observar remetente, contexto, pedido e urgência como um conjunto — e só depois decidir o próximo passo.',
        },
        {
          id: 'd',
          text: 'Encaminhar pra alguém de confiança decidir por você',
          quality: 'aceitavel',
          feedback:
            'Pedir ajuda pode fazer parte do processo, principalmente se você não tiver certeza — mas o primeiro movimento ainda é seu: parar antes de repassar ou agir.',
        },
      ],
      principle: 'PARAR → AVALIAR → AGIR. Você não precisa decidir tudo no primeiro segundo.',
      next: 'm6-s2',
    },
    {
      id: 'm6-s2',
      module: 6,
      env: 'mirante',
      setup: [
        { text: 'Você percebe que já clicou num link suspeito e digitou sua senha numa página estranha.' },
      ],
      prompt: 'O que você faz agora?',
      choices: [
        {
          id: 'a',
          text: 'Continua normalmente, já que não dá pra saber se algo realmente aconteceu',
          quality: 'arriscado',
          feedback:
            'Não ter certeza não é motivo pra não agir — proteger a conta agora custa pouco e evita um problema maior depois.',
        },
        {
          id: 'b',
          text: 'Esconde o que aconteceu, com vergonha de ter caído nisso',
          quality: 'arriscado',
          feedback:
            'Esconder não desfaz o que aconteceu, só atrasa a proteção. Cair em algo assim pode acontecer com qualquer pessoa — o que importa é o que você faz a seguir.',
        },
        {
          id: 'c',
          text: 'Interrompe o que estava fazendo, troca a senha pelo canal oficial e verifica os acessos da conta',
          quality: 'melhor',
          feedback:
            'Um erro não significa que está tudo perdido. Trocar a senha pelo canal oficial e revisar os acessos é exatamente o tipo de reação que reduz o dano — lembra do Módulo 1?',
        },
        {
          id: 'd',
          text: 'Espera alguns dias pra ver se algo estranho acontece antes de agir',
          quality: 'arriscado',
          feedback: 'Esperar só aumenta o tempo em que a conta pode ficar vulnerável. Quanto antes agir, menor o risco.',
        },
      ],
      principle: 'Um erro não significa que tudo está perdido. A prioridade é interromper, proteger o que der e buscar ajuda se precisar.',
      next: null,
    },
  ],
  deepDive: {
    title: 'Qual é o próximo passo?',
    body: 'Perceber que algo é suspeito é só a metade do caminho. O próximo passo quase sempre é o mesmo, não importa o tipo de situação: confirmar pelo canal oficial que você já conhece — nunca por um link, contato ou informação que chegou até você na própria mensagem suspeita.',
  },
};
