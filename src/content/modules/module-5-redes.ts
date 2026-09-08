import type { ModuleDefinition } from '@/lib/types';

export const module5: ModuleDefinition = {
  id: 5,
  title: 'Redes Sociais e Identidade Digital',
  logic: 'PENSAR → REPRESENTAR → CUIDAR',
  env: 'cidade-m5',
  scenes: [
    {
      id: 'm5-s1',
      module: 5,
      env: 'cidade-m5',
      setup: [
        { text: 'Uma publicação está pronta pra ser postada — nada nela é obviamente certo ou errado.' },
      ],
      prompt: 'Antes de publicar, o que é mais importante considerar?',
      choices: [
        {
          id: 'a',
          text: 'Se você gostou do conteúdo',
          quality: 'arriscado',
          feedback:
            'Gostar do conteúdo é o primeiro passo, mas não é o único — vale pensar também em quem vai ver e no que aquilo passa sobre você.',
        },
        {
          id: 'b',
          text: 'Se seus amigos vão achar engraçado',
          quality: 'arriscado',
          feedback:
            'Achar engraçado entre amigos não garante que a mesma piada funcione do mesmo jeito pra quem não está naquele contexto.',
        },
        {
          id: 'c',
          text: 'Quem vai poder ver e se isso representa o que você quer transmitir',
          quality: 'melhor',
          feedback:
            'Pensar em quem pode ver e no que a publicação representa é o que ajuda a decidir com mais consciência — não existe uma resposta única, mas essas duas perguntas orientam a decisão.',
        },
        {
          id: 'd',
          text: 'Se o conteúdo é parecido com o que outras pessoas estão postando',
          quality: 'arriscado',
          feedback:
            'Postar algo só porque é parecido com o que os outros postam não considera se aquilo realmente representa o que você quer mostrar.',
        },
      ],
      principle: 'A mesma publicação pode ser vista de formas diferentes dependendo de quem a vê. Pensar na audiência faz parte de postar com consciência.',
      next: 'm5-s2',
    },
    {
      id: 'm5-s2',
      module: 5,
      env: 'cidade-m5',
      setup: [{ text: 'O personagem olha pro próprio perfil: fotos, bio, comentários, interações.' }],
      prompt: 'Se alguém te conhecesse só por esse perfil, que impressão teria?',
      choices: [
        {
          id: 'a',
          text: 'Não importa, porque um perfil não representa quem a pessoa é de verdade',
          quality: 'arriscado',
          feedback:
            'Um perfil não conta a história toda de alguém, mas ainda assim forma uma impressão real pra quem só conhece você por ali.',
        },
        {
          id: 'b',
          text: 'A impressão exata que eu quero passar, sempre',
          quality: 'arriscado',
          feedback:
            'Nem sempre a impressão que passamos é exatamente a que planejamos — pequenas escolhas se somam de um jeito que a gente nem sempre percebe.',
        },
        {
          id: 'c',
          text: 'Uma impressão formada por várias escolhas pequenas, nem sempre a que eu imaginava',
          quality: 'melhor',
          feedback:
            'Isso mesmo. A identidade digital se constrói aos poucos, por várias escolhas pequenas — não por uma publicação isolada. Não precisa ser perfeita, só consciente.',
        },
        {
          id: 'd',
          text: 'Melhor nem pensar nisso, só postar o que der vontade',
          quality: 'arriscado',
          feedback:
            'Não pensar nisso significa deixar essa impressão se formar sem nenhuma intenção — o que também é uma escolha, só que sem controle.',
        },
      ],
      principle: 'Você não precisa parecer perfeito online. Precisa ter consciência do que está construindo, aos poucos, com cada escolha.',
      next: null,
    },
  ],
  deepDive: {
    title: 'Isso ainda está online?',
    body: 'Depois que você compartilha algo, nem sempre dá pra controlar completamente onde aquilo vai parar — outras pessoas podem salvar, printar ou repassar antes de você apagar. Isso não quer dizer que tudo fica pra sempre, mas que vale pensar nisso antes de publicar, não só depois.',
  },
};
