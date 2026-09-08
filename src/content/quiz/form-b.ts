import type { QuizItem } from '@/lib/types';

/**
 * TEMPORARIO: campo `correct` viaja com o item enquanto nao existe backend.
 * Ver nota em src/lib/types.ts e docs/PROXIMOS-PASSOS.md.
 * Cada item pareia com um item de form-a.ts (mesma competencia, situacao nova).
 */
export const formB: QuizItem[] = [
  {
    id: 'b-m1-1',
    module: 1,
    situation:
      'Você vai recuperar o acesso a uma conta antiga e precisa cadastrar uma senha nova. Um aplicativo sugere gerar uma sequência aleatória de letras, números e símbolos, mas você acha difícil de memorizar.',
    prompt: 'Qual seria a melhor forma de lidar com isso?',
    options: [
      { id: 'A', text: 'Usar uma senha mais curta e fácil de lembrar, já que essa conta não é tão importante.' },
      { id: 'B', text: 'Aceitar a sugestão gerada e guardá-la num gerenciador de senhas, sem precisar decorar.' },
      { id: 'C', text: 'Usar a mesma senha de outra conta sua, assim já fica fácil de lembrar.' },
      { id: 'D', text: 'Criar uma senha baseada no nome do aplicativo, pra lembrar facilmente qual conta é.' },
    ],
    competency: 'Senhas',
    correct: 'B',
  },
  {
    id: 'b-m1-2',
    module: 1,
    situation:
      'Você recebe uma notificação dizendo que sua conta foi acessada de um aparelho que você não reconhece. A própria notificação inclui um link "para verificar agora".',
    prompt: 'Qual seria a atitude mais completa?',
    options: [
      { id: 'A', text: 'Clicar no link da notificação, já que parece vir do próprio serviço.' },
      { id: 'B', text: 'Trocar a senha assim que possível e ignorar o resto da notificação.' },
      {
        id: 'C',
        text: 'Acessar a conta pelo aplicativo oficial — sem usar o link recebido —, conferir os acessos recentes e agir a partir daí.',
      },
      { id: 'D', text: 'Esperar aparecer outro aviso antes de fazer qualquer coisa.' },
    ],
    competency: 'Segurança de contas',
    correct: 'C',
  },
  {
    id: 'b-m2-1',
    module: 2,
    situation:
      'Você recebe uma mensagem de um número desconhecido dizendo que você ganhou um cupom de uma loja que você realmente costuma comprar, com um link para resgatar.',
    prompt: 'O que você faria?',
    options: [
      { id: 'A', text: 'Abriria o link, já que conhece e confia nessa loja.' },
      { id: 'B', text: 'Ignoraria completamente, mesmo gostando da loja.' },
      { id: 'C', text: 'Acessaria o aplicativo ou site oficial da loja pra conferir se o cupom realmente existe.' },
      { id: 'D', text: 'Encaminharia pra um amigo perguntar se ele também recebeu.' },
    ],
    competency: 'Verificação de links',
    correct: 'C',
  },
  {
    id: 'b-m2-2',
    module: 2,
    situation:
      'Num cartaz dentro de uma loja física, um QR Code promete desconto se você "seguir a página oficial" pelo código. Ao escanear, abre uma tela pedindo login numa rede social.',
    prompt: 'Qual seria a decisão mais segura?',
    options: [
      { id: 'A', text: 'Fazer login, já que o cartaz estava dentro da loja física.' },
      { id: 'B', text: 'Fazer login apenas se a página tiver a logo certa da loja.' },
      { id: 'C', text: 'Fechar a página e seguir a loja diretamente pelo aplicativo, buscando o perfil oficial.' },
      { id: 'D', text: 'Escanear o código de novo pra conferir se o destino muda.' },
    ],
    competency: 'QR Codes e destinos de links',
    correct: 'C',
  },
  {
    id: 'b-m3-1',
    module: 3,
    situation:
      'Você recebe um e-mail com layout e logo idênticos aos de um serviço que você usa, dizendo que sua assinatura será cancelada em 15 minutos caso você não confirme o pagamento por um link.',
    prompt: 'Qual elemento deveria aumentar sua desconfiança?',
    options: [
      { id: 'A', text: 'O e-mail ter chegado fora do horário comercial.' },
      { id: 'B', text: 'O prazo curtíssimo combinado com um pedido de pagamento por um link não verificado.' },
      { id: 'C', text: 'O e-mail estar escrito em português.' },
      { id: 'D', text: 'O serviço realmente ter uma assinatura ativa.' },
    ],
    competency: 'Engenharia social',
    correct: 'B',
  },
  {
    id: 'b-m3-2',
    module: 3,
    situation:
      'Você recebe uma ligação de um número desconhecido. A pessoa se identifica como funcionária do banco e diz que, para "cancelar uma compra suspeita", precisa que você informe o código que acabou de chegar por SMS.',
    prompt: 'O que você faria?',
    options: [
      { id: 'A', text: 'Informaria o código, já que a pessoa sabia detalhes da sua conta.' },
      { id: 'B', text: 'Pediria pra ela ligar novamente em outro horário.' },
      {
        id: 'C',
        text: 'Desligaria e entraria em contato com o banco por um canal que você já conhece, como o aplicativo ou o telefone oficial.',
      },
      { id: 'D', text: 'Informaria só os últimos dígitos do código, como forma de confirmar sem revelar tudo.' },
    ],
    competency: 'Autenticação',
    correct: 'C',
  },
  {
    id: 'b-m4-1',
    module: 4,
    situation:
      'Um colega posta uma foto comemorando a aprovação num processo seletivo. No canto da imagem aparece, sem querer, um documento com informações pessoais em cima da mesa.',
    prompt: 'O que essa situação demonstra?',
    options: [
      { id: 'A', text: 'Fotos comemorativas não costumam ter esse tipo de risco.' },
      { id: 'B', text: 'Informações sensíveis podem aparecer numa publicação mesmo sem essa ser a intenção de quem postou.' },
      { id: 'C', text: 'O problema só existiria se o documento estivesse totalmente legível.' },
      { id: 'D', text: 'Isso só é um risco se a conta for pública.' },
    ],
    competency: 'Exposição acidental',
    correct: 'B',
  },
  {
    id: 'b-m4-2',
    module: 4,
    situation:
      'Você instala um aplicativo de lanterna — só liga e desliga a luz do celular — e ele pede acesso aos seus contatos e à sua localização.',
    prompt: 'O que seria mais adequado?',
    options: [
      { id: 'A', text: 'Aceitar, já que aplicativos gratuitos costumam pedir esse tipo de permissão.' },
      { id: 'B', text: 'Recusar as permissões que não têm relação com a função do aplicativo.' },
      { id: 'C', text: 'Aceitar apenas a localização, porque é mais fácil de desativar depois.' },
      { id: 'D', text: 'Desinstalar o aplicativo sem revisar quais permissões ele pede.' },
    ],
    competency: 'Permissões de aplicativos',
    correct: 'B',
  },
  {
    id: 'b-m5-1',
    module: 5,
    situation:
      'Uma pessoa que você segue há tempos manda mensagem de um perfil "novo", dizendo que perdeu o acesso ao antigo e pedindo que você deposite uma quantia pequena "só até ela recuperar a conta".',
    prompt: 'Qual seria a forma mais confiável de confirmar que é realmente ela?',
    options: [
      { id: 'A', text: 'Comparar as fotos do perfil novo com as do antigo.' },
      { id: 'B', text: 'Perguntar, dentro da própria conversa, algo que só ela saberia.' },
      { id: 'C', text: 'Confirmar com a pessoa por outro canal que vocês já usavam antes desse pedido.' },
      { id: 'D', text: 'Aceitar, já que vocês têm amigos em comum nos dois perfis.' },
    ],
    competency: 'Identidade digital',
    correct: 'C',
  },
  {
    id: 'b-m5-2',
    module: 5,
    situation:
      'Você vai comentar publicamente numa publicação sobre um assunto polêmico, com uma opinião bem direta. O comentário fica visível pra qualquer pessoa que passar pelo perfil, não só pra quem já te segue.',
    prompt: 'O que seria mais importante considerar antes de comentar?',
    options: [
      { id: 'A', text: 'Se o comentário é engraçado o suficiente pra gerar curtidas.' },
      { id: 'B', text: 'Se outras pessoas do seu grupo de amigos concordam com você.' },
      { id: 'C', text: 'Quem, além de quem já te segue, vai ver esse comentário associado ao seu perfil.' },
      { id: 'D', text: 'Se a publicação original já tem muitos comentários parecidos.' },
    ],
    competency: 'Audiência e contexto em redes sociais',
    correct: 'C',
  },
  {
    id: 'b-m6-1',
    module: 6,
    situation:
      'Você tem uma consulta marcada pra essa semana. No dia, recebe uma mensagem dizendo que ela foi cancelada e que, pra reagendar, é preciso confirmar seus dados por um link enviado por SMS.',
    prompt: 'Qual seria a atitude mais adequada?',
    options: [
      { id: 'A', text: 'Confirmar pelo link, já que você realmente tem uma consulta marcada.' },
      { id: 'B', text: 'Ignorar a mensagem, mesmo tendo uma consulta marcada.' },
      {
        id: 'C',
        text: 'Ligar diretamente pro local onde a consulta foi marcada, usando um número que você já conhece, pra confirmar a situação.',
      },
      { id: 'D', text: 'Responder à mensagem perguntando o nome do profissional antes de decidir.' },
    ],
    competency: 'Golpes contextualizados',
    correct: 'C',
  },
  {
    id: 'b-m6-2',
    module: 6,
    situation:
      'Você percebe que, sem perceber, autorizou o acesso da sua conta de e-mail num site desconhecido enquanto tentava baixar um arquivo.',
    prompt: 'O que você faria agora?',
    options: [
      { id: 'A', text: 'Não faria nada, já que não teve nenhuma consequência visível até agora.' },
      { id: 'B', text: 'Esperaria alguns dias pra ver se algo estranho acontece com a conta.' },
      { id: 'C', text: 'Revogaria o acesso desse site nas configurações da conta e trocaria a senha por segurança.' },
      { id: 'D', text: 'Excluiria o e-mail relacionado ao download, achando que isso resolve.' },
    ],
    competency: 'Proteção e recuperação de acesso',
    correct: 'C',
  },
];
