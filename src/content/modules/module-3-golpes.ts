import type { ModuleDefinition } from '@/lib/types';

export const module3: ModuleDefinition = {
  id: 3,
  title: 'Golpes e Engenharia Social',
  logic: 'RECONHECER → QUESTIONAR → CONFIRMAR',
  env: 'planicie',
  scenes: [
    {
      id: 'm3-s1',
      module: 3,
      env: 'planicie',
      setup: [
        {
          text: 'Detectamos um problema na sua conta. Precisamos confirmar alguns dados agora, ou o acesso será suspenso.',
        },
      ],
      prompt: 'O que você faz?',
      choices: [
        {
          id: 'a',
          text: 'Faz o que foi pedido imediatamente, pra não perder o acesso',
          quality: 'arriscado',
          feedback:
            'Urgência é uma das ferramentas mais usadas pra impedir que alguém pare pra pensar. Uma situação real continua existindo mesmo alguns minutos depois.',
        },
        {
          id: 'b',
          text: 'Ignora pra sempre, sem checar nada',
          quality: 'arriscado',
          feedback:
            'Ignorar por completo também não é ideal: se houver mesmo alguma pendência, só checar pelo canal oficial confirma isso com segurança.',
        },
        {
          id: 'c',
          text: 'Verifica a situação por um canal oficial antes de fazer qualquer coisa',
          quality: 'melhor',
          feedback:
            'Urgência não é prova de legitimidade. Verificar direto no canal oficial confirma se o problema existe de verdade — sem depender do que essa mensagem diz.',
        },
        {
          id: 'd',
          text: 'Responde pedindo mais detalhes sobre o problema',
          quality: 'aceitavel',
          feedback:
            'Pedir mais detalhes parece cauteloso, mas quem está aplicando um golpe pode inventar qualquer detalhe convincente. A confirmação real vem de fora dessa conversa.',
        },
      ],
      principle: 'Urgência não é prova de legitimidade — é, muitas vezes, uma tática pra evitar que você verifique.',
      next: 'm3-s2',
    },
    {
      id: 'm3-s2',
      module: 3,
      env: 'planicie',
      setup: [
        {
          text: 'Olá! Sou da equipe de suporte. Identificamos uma atividade incomum. Pra confirmar que é você, me envia o código que acabou de chegar no seu celular?',
        },
      ],
      prompt: 'O que você faz?',
      choices: [
        {
          id: 'a',
          text: 'Envia o código, já que a pessoa parece ser do suporte mesmo',
          quality: 'arriscado',
          feedback:
            'Cargo, nome ou linguagem formal não provam quem alguém realmente é. Um código de verificação é pessoal — não deve ser compartilhado, nem com quem parece ser da equipe de suporte.',
        },
        {
          id: 'b',
          text: 'Pede pra pessoa provar que é realmente do suporte antes de decidir',
          quality: 'aceitavel',
          feedback:
            'Pedir prova é um bom instinto, mas ainda depende da resposta de quem está do outro lado — que pode inventar qualquer coisa convincente. Melhor confirmar por fora dessa conversa.',
        },
        {
          id: 'c',
          text: 'Não envia o código e confirma a identidade da pessoa por um canal independente, como o site oficial',
          quality: 'melhor',
          feedback:
            'Exatamente. Suporte de verdade não pede código de verificação por mensagem. Confirmar por um canal que você já conhece é o caminho seguro.',
        },
        {
          id: 'd',
          text: 'Envia só uma parte do código, "pra ajudar sem arriscar tudo"',
          quality: 'arriscado',
          feedback:
            'Não existe "enviar parte com segurança" — qualquer parte do código pode ser o suficiente pra dar acesso à conta.',
        },
      ],
      principle:
        'Quem alguém diz ser não é prova de quem realmente é. Códigos de verificação são pessoais e não se compartilham — nem parcialmente.',
      next: null,
    },
  ],
  deepDive: {
    title: '"É meu amigo"',
    body: 'Até um contato conhecido pode ter a conta comprometida ou imitada. Quando um pedido foge do padrão — principalmente envolvendo dinheiro, códigos ou urgência — vale confirmar com a pessoa por outro meio já conhecido, como uma ligação, antes de agir.',
  },
};
