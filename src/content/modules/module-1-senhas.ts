import type { ModuleDefinition } from '@/lib/types';

export const module1: ModuleDefinition = {
  id: 1,
  title: 'Senhas e Segurança de Contas',
  logic: 'CRIAR → PROTEGER → REAGIR',
  env: 'caverna',
  scenes: [
    {
      id: 'm1-s1',
      module: 1,
      env: 'caverna',
      setup: [
        { text: 'Vou criar uma senha pra essa conta nova. O que você acha dessas opções?' },
      ],
      prompt: 'Qual dessas senhas oferece mais proteção?',
      choices: [
        {
          id: 'a',
          text: 'Julia2011 (nome + ano de nascimento)',
          quality: 'arriscado',
          feedback:
            'Nome e ano são fáceis de descobrir — aparecem no seu perfil, na escola, em conversas. Uma senha baseada neles cai rápido numa tentativa de adivinhação.',
        },
        {
          id: 'b',
          text: 'Amo1Chocolate! (frase incomum, comprida, sem dado pessoal)',
          quality: 'melhor',
          feedback:
            'Boa escolha: é longa, não usa nada pessoal e não segue um padrão óbvio. Isso dificulta muito uma tentativa de adivinhação.',
        },
        {
          id: 'c',
          text: 'Senha123! (parece complexa, mas é padrão comum)',
          quality: 'arriscado',
          feedback:
            'Parece forte porque tem número e símbolo, mas é um dos padrões mais testados por quem tenta adivinhar senhas. Complexidade visual não é o mesmo que imprevisibilidade.',
        },
        {
          id: 'd',
          text: 'PrincesaAzul#7 (frase popular com variação)',
          quality: 'aceitavel',
          feedback:
            'Melhor que usar dado pessoal, mas frases populares com pequenas variações também entram nas listas mais tentadas. Quanto mais incomum e longa, mais segura.',
        },
      ],
      principle: 'Uma senha protege mais quando é longa e imprevisível — não quando só parece complicada.',
      next: 'm1-s2',
    },
    {
      id: 'm1-s2',
      module: 1,
      env: 'caverna',
      setup: [{ text: 'Novo acesso detectado. Dispositivo não reconhecido.' }],
      prompt: 'O que você faz?',
      choices: [
        {
          id: 'a',
          text: 'Ignora, porque a senha ainda funciona normalmente',
          quality: 'arriscado',
          feedback:
            'A senha continuar funcionando não significa que o acesso foi autorizado por você. Ignorar deixa a dúvida sem resposta.',
        },
        {
          id: 'b',
          text: 'Responde a uma mensagem que chegou por fora dizendo ser da "equipe de segurança" e pedindo pra confirmar a senha',
          quality: 'arriscado',
          feedback:
            'Nenhuma equipe de segurança confiável pede sua senha por mensagem. Esse é exatamente o tipo de pedido que deveria fazer você parar e checar por outro caminho.',
        },
        {
          id: 'c',
          text: 'Entra na conta pelo aplicativo oficial (sem usar nenhum link recebido) e confere os acessos recentes',
          quality: 'melhor',
          feedback:
            'Essa é a forma mais segura: você mesmo entra na conta pelo caminho que já conhece, sem depender de nenhum link ou mensagem recebida, e confere o que realmente aconteceu.',
        },
        {
          id: 'd',
          text: 'Troca a senha rapidamente, sem checar mais nada',
          quality: 'aceitavel',
          feedback:
            'Trocar a senha ajuda, mas sozinho não é suficiente — vale também conferir os dispositivos conectados e considerar uma camada extra de proteção.',
        },
      ],
      principle:
        'Quando desconfiar de um acesso, entre na conta pelo caminho que você já conhece — nunca por um link que chegou até você.',
      next: null,
    },
  ],
  deepDive: {
    title: 'A mesma senha em tudo',
    body: 'Muita gente usa a mesma senha em várias contas pra não precisar lembrar de tantas. O problema é que, se uma dessas contas vazar, a mesma chave pode abrir as outras portas também. Um gerenciador de senhas guarda senhas diferentes para cada conta sem que você precise decorar todas — funciona como um cofre que só você acessa.',
  },
  closing: [
    'Entre pelo aplicativo oficial.',
    'Confira os dispositivos conectados.',
    'Troque a senha.',
    'Ative a verificação em duas etapas, se o serviço tiver.',
    'Nunca compartilhe códigos que chegarem no seu celular — nem com quem parecer confiável.',
  ],
};
