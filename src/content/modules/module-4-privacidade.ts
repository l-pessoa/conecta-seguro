import type { ModuleDefinition } from '@/lib/types';

export const module4: ModuleDefinition = {
  id: 4,
  title: 'Privacidade',
  logic: 'PENSAR → CONTROLAR → COMPARTILHAR',
  env: 'subaquatico',
  scenes: [
    {
      id: 'm4-s1',
      module: 4,
      env: 'subaquatico',
      setup: [
        {
          text: 'Você tirou uma foto legal pra postar. No fundo aparecem: o nome da sua escola no uniforme, um documento em cima da mesa e a tela do computador com uma conversa aberta.',
        },
      ],
      prompt: 'Antes de publicar, o que você faz?',
      choices: [
        {
          id: 'a',
          text: 'Publica direto, porque a foto em si é só uma foto normal',
          quality: 'arriscado',
          feedback:
            'Às vezes você não está mostrando uma informação diretamente — mas a imagem está mostrando por você. Vale olhar o que aparece além do que você pretendia.',
        },
        {
          id: 'b',
          text: 'Publica, mas só porque os amigos que vão ver já conhecem esses lugares',
          quality: 'arriscado',
          feedback:
            '"Meus amigos já conhecem" nem sempre significa que só eles vão ver — configurações de privacidade, compartilhamentos e capturas de tela podem levar a imagem além do público que você imaginou.',
        },
        {
          id: 'c',
          text: 'Revisa a imagem, corta ou desfoca o que não precisa aparecer, e só então decide publicar',
          quality: 'melhor',
          feedback:
            'Essa é a ideia: revisar o que está no quadro, não só o que você queria mostrar, e decidir conscientemente o que realmente precisa aparecer.',
        },
        {
          id: 'd',
          text: 'Decide não publicar nenhuma foto a partir de agora',
          quality: 'arriscado',
          feedback:
            'Parar de publicar por completo é um exagero — o problema não é publicar, é publicar sem revisar antes. Privacidade não é isolamento.',
        },
      ],
      principle: 'Uma imagem pode revelar mais do que você pretendia mostrar. Vale olhar o fundo antes de publicar.',
      next: 'm4-s2',
    },
    {
      id: 'm4-s2',
      module: 4,
      env: 'subaquatico',
      setup: [
        {
          text: 'Um aplicativo fictício de editar fotos está pedindo acesso à localização, aos contatos e ao microfone.',
        },
      ],
      prompt: 'O que você faz?',
      choices: [
        {
          id: 'a',
          text: 'Aceita tudo, porque negar pode fazer o app não funcionar direito',
          quality: 'arriscado',
          feedback:
            'Nem toda permissão pedida é necessária pra função do aplicativo. Aceitar tudo sem pensar dá acesso a mais do que ele realmente precisa.',
        },
        {
          id: 'b',
          text: 'Nega tudo, mesmo sem checar pra que serve cada uma',
          quality: 'arriscado',
          feedback:
            'Negar tudo também não é o ideal — algumas permissões fazem sentido pra função do app funcionar bem. A questão é avaliar cada uma, não recusar por recusar.',
        },
        {
          id: 'c',
          text: 'Analisa cada permissão e libera só as que fazem sentido pra função do app',
          quality: 'melhor',
          feedback:
            'Um editor de fotos faz sentido pedir acesso às fotos — mas localização, contatos e microfone provavelmente não têm relação com editar imagens. Avaliar cada permissão pela função evita dar acesso desnecessário.',
        },
        {
          id: 'd',
          text: 'Aceita só a localização, porque parece a menos perigosa',
          quality: 'aceitavel',
          feedback:
            'Escolher uma permissão sem relacionar com a função do app ainda é meio aleatório. O critério mais confiável é perguntar: isso é necessário pro que eu quero fazer agora?',
        },
      ],
      principle: 'Permissão não é obrigação. Antes de aceitar, pense no que o aplicativo realmente precisa pra fazer o que você quer.',
      next: null,
    },
  ],
  deepDive: {
    title: 'Quanto você está revelando?',
    body: 'Uma publicação isolada pode parecer inofensiva. Mas várias publicações juntas — onde você está, sua rotina, seus horários — podem formar um retrato bem detalhado do seu dia a dia. Vale pensar no conjunto, não só em cada publicação separada.',
  },
};
