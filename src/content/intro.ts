export interface IntroBeat {
  id: string;
  lines: string[];
  topics?: { icon: 'key' | 'link' | 'drama' | 'eye-off' | 'share-2' | 'triangle-alert'; label: string; hint: string }[];
  cta?: string;
}

export const introBeats: IntroBeat[] = [
  {
    id: 'gancho',
    lines: [
      'Mensagem num grupo: "Vaga rápida! Só hoje: presente surpresa pra quem clicar antes que acabe."',
      'O que você faria?',
      'Você vai encontrar situações parecidas com essa ao longo da jornada. A diferença é que aqui, dá pra pensar antes de decidir.',
    ],
  },
  {
    id: 'o-que-e',
    lines: [
      'Isso é o ConectaSeguro.',
      'Uma jornada sobre decisões que a gente toma todo dia sem perceber — mensagens, senhas, permissões, o que postar, o que confirmar antes de agir.',
      'Não é aula. Não é prova. É você, em situações parecidas com as que já apareceram — ou vão aparecer — na sua tela.',
    ],
  },
  {
    id: 'o-que-tem',
    lines: ['Ao longo do caminho você vai passar por:'],
    topics: [
      { icon: 'key', label: 'Senhas e contas', hint: 'proteger o que é seu' },
      { icon: 'link', label: 'Links e mensagens', hint: 'parar antes de clicar' },
      { icon: 'drama', label: 'Golpes', hint: 'reconhecer quando alguém quer te apressar' },
      { icon: 'eye-off', label: 'Privacidade', hint: 'decidir o que mostrar, pra quem' },
      { icon: 'share-2', label: 'Redes sociais', hint: 'pensar no que sua presença online diz' },
      { icon: 'triangle-alert', label: 'Algo parece estranho', hint: 'o que fazer primeiro' },
    ],
  },
  {
    id: 'como-funciona',
    lines: [
      'Você vai fazer escolhas. Cada uma tem uma consequência — e uma explicação, não um julgamento.',
      'Não existe errar feio aqui. Sem prova, sem nota, sem ranking.',
      'Pode ir rápido e pegar o essencial, ou parar pra entender mais. Do seu jeito, no seu tempo.',
    ],
    cta: 'Vamos começar?',
  },
];
