import type { QuizItem } from '@/lib/types';

/**
 * TEMPORARIO: campo `correct` viaja com o item enquanto nao existe backend.
 * Ver nota em src/lib/types.ts e docs/PROXIMOS-PASSOS.md.
 */
export const formA: QuizItem[] = [
  {
    id: 'a-m1-1',
    module: 1,
    situation:
      'Você vai criar uma senha para uma conta que pretende usar durante bastante tempo.',
    prompt: 'Qual alternativa representa a melhor prática?',
    options: [
      { id: 'A', text: 'Usar uma frase longa, difícil de adivinhar e exclusiva para aquela conta.' },
      { id: 'B', text: 'Usar uma senha curta e diferente das outras, porque ela será usada em apenas um serviço.' },
      { id: 'C', text: 'Usar uma informação pessoal combinada com números para facilitar a memorização.' },
      { id: 'D', text: 'Usar uma senha conhecida e acrescentar o nome do serviço no final para diferenciá-la.' },
    ],
    competency: 'Senhas',
    correct: 'A',
  },
  {
    id: 'a-m1-2',
    module: 1,
    situation:
      'Você recebe uma notificação informando que houve um login em uma de suas contas durante um horário em que você não estava utilizando o serviço. A conta continua funcionando normalmente.',
    prompt: 'Qual seria a atitude mais completa?',
    options: [
      { id: 'A', text: 'Alterar a senha imediatamente e ignorar os detalhes da notificação.' },
      { id: 'B', text: 'Esperar outra notificação para verificar se o problema realmente continua.' },
      {
        id: 'C',
        text: 'Verificar as sessões e atividades recentes pelos recursos oficiais e, se necessário, encerrar acessos desconhecidos e proteger a conta.',
      },
      { id: 'D', text: 'Desinstalar o aplicativo e instalá-lo novamente para interromper possíveis acessos.' },
    ],
    competency: 'Segurança de contas',
    correct: 'C',
  },
  {
    id: 'a-m2-1',
    module: 2,
    situation:
      'Você está em um grupo de WhatsApp com seus amigos. Alguém envia uma mensagem dizendo que uma loja conhecida está oferecendo um benefício exclusivo e coloca um link para participar. Você não estava esperando nenhuma promoção dessa loja.',
    prompt: 'O que você faria?',
    options: [
      { id: 'A', text: 'Abriria o link para conferir os detalhes, mas só continuaria se a página parecer profissional.' },
      { id: 'B', text: 'Perguntaria no grupo se alguém já acessou e teve algum problema.' },
      { id: 'C', text: 'Procuraria a promoção diretamente no site ou aplicativo oficial da loja.' },
      { id: 'D', text: 'Abriria o link usando apenas o navegador do celular, em vez do aplicativo.' },
    ],
    competency: 'Verificação de links',
    correct: 'C',
  },
  {
    id: 'a-m2-2',
    module: 2,
    situation:
      'Você vê um QR Code em uma publicação dizendo que ele dá acesso a uma promoção exclusiva de uma plataforma que você utiliza. Depois de escanear, aparece uma página solicitando seu login.',
    prompt: 'Qual seria a decisão mais segura?',
    options: [
      { id: 'A', text: 'Fazer login se a página tiver o mesmo visual da plataforma.' },
      { id: 'B', text: 'Conferir se o navegador mostra a conexão como segura e, se mostrar, continuar.' },
      { id: 'C', text: 'Fechar a página e acessar a plataforma pelo aplicativo ou endereço oficial que você já conhece.' },
      { id: 'D', text: 'Perguntar a quem publicou se a página funcionou antes de decidir.' },
    ],
    competency: 'QR Codes e destinos de links',
    correct: 'C',
  },
  {
    id: 'a-m3-1',
    module: 3,
    situation:
      'Você recebe uma mensagem informando que sua conta será bloqueada em poucos minutos caso você não confirme seus dados por um link. A mensagem usa o nome e o logotipo corretos da plataforma.',
    prompt: 'Qual elemento deve aumentar sua desconfiança?',
    options: [
      { id: 'A', text: 'A mensagem usar o nome correto da plataforma.' },
      { id: 'B', text: 'A mensagem ter sido recebida no celular.' },
      { id: 'C', text: 'O prazo curto combinado com um pedido de dados por meio de um link inesperado.' },
      { id: 'D', text: 'A possibilidade de a plataforma realmente precisar atualizar seus dados.' },
    ],
    competency: 'Engenharia social',
    correct: 'C',
  },
  {
    id: 'a-m3-2',
    module: 3,
    situation:
      'Você está tentando entrar em uma conta sua. Pouco depois, um amigo conhecido manda mensagem dizendo que está tentando recuperar a própria conta e pede o código que acabou de chegar no seu celular.',
    prompt: 'O que você faria?',
    options: [
      { id: 'A', text: 'Enviaria o código depois de confirmar o nome da conta que ele está tentando recuperar.' },
      { id: 'B', text: 'Perguntaria por que o código chegou justamente no seu celular antes de decidir.' },
      {
        id: 'C',
        text: 'Não compartilharia o código e confirmaria a situação por um meio de contato independente, se necessário.',
      },
      { id: 'D', text: 'Enviaria o código somente se ele disser que também recebeu uma solicitação semelhante.' },
    ],
    competency: 'Autenticação',
    correct: 'C',
  },
  {
    id: 'a-m4-1',
    module: 4,
    situation:
      'Você publica uma foto aparentemente normal. Depois percebe que, no fundo da imagem, aparece uma tela com parte de uma conversa privada e um código temporário usado para acessar uma conta.',
    prompt: 'O que essa situação demonstra?',
    options: [
      { id: 'A', text: 'Informações sensíveis podem ser expostas mesmo quando não fazem parte do objetivo principal da publicação.' },
      { id: 'B', text: 'Contas privadas impedem que informações da imagem sejam utilizadas por outras pessoas.' },
      { id: 'C', text: 'Códigos temporários não apresentam risco porque deixam de funcionar depois de algum tempo.' },
      { id: 'D', text: 'Fotografias só apresentam risco quando mostram diretamente senhas completas.' },
    ],
    competency: 'Exposição acidental',
    correct: 'A',
  },
  {
    id: 'a-m4-2',
    module: 4,
    situation:
      'Você instala um aplicativo gratuito para editar imagens. Durante a configuração, ele solicita acesso aos seus contatos, localização e microfone, embora essas funções não pareçam necessárias para editar imagens.',
    prompt: 'O que seria mais adequado?',
    options: [
      { id: 'A', text: 'Aceitar as permissões e revisar depois caso o aplicativo apresente algum comportamento estranho.' },
      { id: 'B', text: 'Recusar as permissões que não parecem necessárias e verificar se o aplicativo funciona sem elas.' },
      { id: 'C', text: 'Aceitar porque o aplicativo está disponível em uma loja oficial.' },
      { id: 'D', text: 'Aceitar todas as permissões e desativar somente aquelas que forem usadas posteriormente.' },
    ],
    competency: 'Permissões de aplicativos',
    correct: 'B',
  },
  {
    id: 'a-m5-1',
    module: 5,
    situation:
      'Uma pessoa que você conhece pessoalmente criou uma nova conta em uma rede social. O perfil possui fotos reais, amigos em comum e informações que parecem verdadeiras. Pouco depois, a conta pede seu número de telefone porque, segundo ela, a pessoa perdeu o celular.',
    prompt: 'Qual seria a forma mais confiável de confirmar a identidade?',
    options: [
      { id: 'A', text: 'Fazer uma pergunta pessoal que somente a pessoa verdadeira provavelmente saberia responder.' },
      { id: 'B', text: 'Comparar as fotos e os amigos em comum com o perfil antigo.' },
      { id: 'C', text: 'Fazer uma chamada de vídeo pelo novo perfil.' },
      { id: 'D', text: 'Confirmar diretamente com a pessoa por um canal de contato que você já conhecia antes.' },
    ],
    competency: 'Identidade digital',
    correct: 'D',
  },
  {
    id: 'a-m5-2',
    module: 5,
    situation:
      'Você tirou uma foto numa festa com amigos e quer postar. Pensa em marcar o nome do lugar e escrever que vai ficar por lá até tarde. A publicação vai ficar visível para qualquer pessoa, não só para amigos.',
    prompt: 'O que seria mais importante considerar antes de publicar assim?',
    options: [
      { id: 'A', text: 'Se a foto ficou com boa qualidade e boa iluminação.' },
      { id: 'B', text: 'Se os amigos que aparecem na foto vão gostar de estar nela.' },
      { id: 'C', text: 'Quem, além dos amigos, vai poder ver essa informação e o que ela revela sobre onde você está.' },
      { id: 'D', text: 'Se a legenda está bem escrita, sem erros de português.' },
    ],
    competency: 'Audiência e contexto em redes sociais',
    correct: 'C',
  },
  {
    id: 'a-m6-1',
    module: 6,
    situation:
      'Você realmente está esperando uma encomenda. No mesmo dia, recebe uma mensagem de um número desconhecido informando que a entrega está parada e que é necessário pagar uma pequena taxa por um link.',
    prompt: 'O que você faria?',
    options: [
      { id: 'A', text: 'Pagaria porque a encomenda realmente existe e a taxa é pequena.' },
      { id: 'B', text: 'Responderia à mensagem pedindo o código da encomenda antes de realizar o pagamento.' },
      { id: 'C', text: 'Pesquisaria o número de telefone na internet e usaria os comentários encontrados como principal confirmação.' },
      { id: 'D', text: 'Consultaria o pedido diretamente no aplicativo ou site oficial da loja ou transportadora.' },
    ],
    competency: 'Golpes contextualizados',
    correct: 'D',
  },
  {
    id: 'a-m6-2',
    module: 6,
    situation:
      'Você percebe que perdeu o celular que usa para acessar várias contas. O aparelho possui bloqueio de tela, mas algumas contas importantes continuam conectadas nele.',
    prompt: 'Qual atitude seria mais adequada?',
    options: [
      { id: 'A', text: 'Esperar para descobrir se alguém devolve o aparelho antes de tomar qualquer medida.' },
      { id: 'B', text: 'Trocar apenas a senha da conta mais importante e deixar as outras para depois.' },
      {
        id: 'C',
        text: 'Usar os recursos de segurança disponíveis para proteger o aparelho e revisar ou encerrar acessos às contas importantes.',
      },
      { id: 'D', text: 'Tentar localizar o celular publicando nas redes sociais informações sobre onde ele foi perdido.' },
    ],
    competency: 'Proteção e recuperação de acesso',
    correct: 'C',
  },
];
