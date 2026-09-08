import type { ModuleDefinition } from '@/lib/types';

export const module2: ModuleDefinition = {
  id: 2,
  title: 'Links e Mensagens',
  logic: 'PERCEBER → VERIFICAR → AGIR',
  env: 'cidade-m2',
  scenes: [
    {
      id: 'm2-s1',
      module: 2,
      env: 'cidade-m2',
      setup: [
        { text: 'Seu pedido teve um problema. Resolva agora para não perder a encomenda.' },
      ],
      prompt: 'O que você faz?',
      choices: [
        {
          id: 'a',
          text: 'Clica no link imediatamente pra resolver',
          quality: 'arriscado',
          feedback:
            'Mesmo que a mensagem pareça real, agir direto pelo link recebido é arriscado — você não sabe pra onde ele te leva de verdade.',
        },
        {
          id: 'b',
          text: 'Ignora e apaga a mensagem sem checar nada',
          quality: 'arriscado',
          feedback:
            'Ignorar tudo também não resolve: se existir mesmo alguma pendência, você só vai descobrir checando por um caminho confiável.',
        },
        {
          id: 'c',
          text: 'Abre o aplicativo da loja direto (não pelo link) e confere se existe alguma pendência',
          quality: 'melhor',
          feedback:
            'Exatamente. Você mesmo abre o aplicativo que já conhece e confirma se existe algum problema real — sem depender do link recebido.',
        },
        {
          id: 'd',
          text: 'Responde à mensagem perguntando "isso é oficial mesmo?"',
          quality: 'aceitavel',
          feedback:
            'Perguntar já é melhor que clicar direto, mas quem enviou uma mensagem enganosa provavelmente vai dizer que é oficial mesmo. A confirmação mais segura vem de um canal que você já conhece, não da própria mensagem.',
        },
      ],
      principle: 'Verificar não é ignorar — é confirmar pelo caminho que você já conhece, sem depender do link recebido.',
      next: 'm2-s2',
    },
    {
      id: 'm2-s2',
      module: 2,
      env: 'cidade-m2',
      setup: [{ text: 'SUA CONTA SERÁ BLOQUEADA EM 10 MINUTOS. RESOLVA AGORA.' }],
      prompt: 'O que você faz?',
      choices: [
        {
          id: 'a',
          text: 'Clica agora, antes que seja tarde',
          quality: 'arriscado',
          feedback:
            'É exatamente esse o efeito que a urgência tenta causar: te fazer agir antes de pensar. Prazos apertados demais são um sinal de alerta, não um motivo pra pular a verificação.',
        },
        {
          id: 'b',
          text: 'Encaminha pra um amigo perguntar o que ele acha',
          quality: 'aceitavel',
          feedback:
            'Encaminhar não resolve a sua situação nem confirma nada — só passa a dúvida adiante. Melhor verificar você mesmo por um canal confiável.',
        },
        {
          id: 'c',
          text: 'Para, respira, e busca a situação por um canal confiável antes de decidir',
          quality: 'melhor',
          feedback:
            'Parar antes de agir é a virada. Um prazo apertado não é motivo suficiente pra abrir mão de verificar — se o problema for real, ele continua existindo daqui a alguns minutos.',
        },
        {
          id: 'd',
          text: 'Responde direto na mensagem pedindo mais prazo',
          quality: 'arriscado',
          feedback:
            'Responder confirma pra quem enviou que esse contato está ativo e sendo monitorado, o que pode incentivar novas tentativas.',
        },
      ],
      principle: 'Você não precisa decidir só porque alguém criou urgência. Pare, verifique, decida.',
      next: null,
    },
  ],
  deepDive: {
    title: '"Mas parece oficial..."',
    body: 'Logo, nome conhecido, texto bem escrito — nada disso prova que uma mensagem é verdadeira. Aparência pode ser copiada com facilidade. O que realmente confirma é checar pelo canal que você já conhece, não os detalhes visuais da mensagem que chegou. Extra: um site com cadeado (https) só garante que a conexão está criptografada — não garante que o site é confiável. Um site falso também pode ter cadeado.',
  },
};
