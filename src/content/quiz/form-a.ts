import type { FormaQuiz } from '../types';

/** Forma A (pre). Sem resposta correta: o gabarito fica em src/lib/server/gabarito.ts. */
export const formA: FormaQuiz = [
  {
    id: "a-m1-1",
    modulo: 1,
    competencia: "Senhas",
    situacao: "Você vai criar a senha de uma conta que pretende usar por muito tempo.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Crio uma frase longa só pra essa conta, porque o tamanho pesa mais que os símbolos." },
      { id: "B", t: "Uso símbolos, números e maiúsculas numa palavra curta, porque assim ninguém adivinha." },
      { id: "C", t: "Pego uma senha forte que já uso e mudo uma letra, porque fica fácil de lembrar." },
      { id: "D", t: "Uso uma senha boa e troco todo mês, porque senha velha fica mais fácil de descobrir." },
    ],
  },
  {
    id: "a-m2-2",
    modulo: 2,
    competencia: "QR Codes e destinos de links",
    situacao: "Um QR Code numa publicação promete uma promoção de uma plataforma que você usa. Ao escanear, abre uma página pedindo login.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Confiro se tem https e cadeado, porque promoção em site seguro costuma ser de verdade." },
      { id: "B", t: "Escaneio de novo com outro leitor, porque se a promoção abrir igual ela é confiável." },
      { id: "C", t: "Fecho a página e entro pelo app da plataforma, porque a promoção real aparece lá." },
      { id: "D", t: "Entro com uma conta reserva que quase não uso, porque se a promoção for golpe perco menos." },
    ],
  },
  {
    id: "a-m3-1",
    modulo: 3,
    competencia: "Engenharia social",
    situacao: "Chega uma mensagem com o logo certo da plataforma: sua conta será bloqueada em minutos se você não confirmar dados por um link.",
    pergunta: "O que mais te faria desconfiar?",
    opcoes: [
      { id: "A", t: "Ela ter chegado por mensagem e não por e-mail, porque pedido de dados é só por e-mail." },
      { id: "B", t: "O logo estar perfeito demais, porque em poucos minutos o golpista erra algum detalhe." },
      { id: "C", t: "Ela citar minha conta, porque nenhuma empresa pede dados disso por mensagem." },
      { id: "D", t: "O prazo de poucos minutos com pedido de dados, porque a pressa atrapalha pensar." },
    ],
  },
  {
    id: "a-m4-2",
    modulo: 4,
    competencia: "Permissões de aplicativos",
    situacao: "Um app gratuito de editar imagens pede acesso a contatos, localização e microfone, sem relação com editar imagens.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Leio as avaliações na loja e, se forem boas, aceito, porque quem já usou saberia." },
      { id: "B", t: "Libero só o acesso às fotos, porque o resto o editor não usa pra funcionar." },
      { id: "C", t: "Aceito tudo e desligo o que parecer estranho, porque dá pra mudar nas configurações." },
      { id: "D", t: "Libero tudo menos o microfone, porque é a permissão que mais me preocupa." },
    ],
  },
  {
    id: "a-m5-1",
    modulo: 5,
    competencia: "Identidade digital",
    situacao: "Um conhecido seu criou um perfil novo, com fotos reais e amigos em comum. Logo ele pede seu telefone, dizendo que perdeu o celular.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Passo o número: as fotos e os amigos em comum mostram que é ele." },
      { id: "B", t: "Faço uma pergunta pessoal na conversa e passo se ele acertar." },
      { id: "C", t: "Denuncio e bloqueio o perfil na hora, sem falar com ele de outro jeito." },
      { id: "D", t: "Falo com ele por um contato que eu já tinha, como o número antigo." },
    ],
  },
  {
    id: "a-m6-1",
    modulo: 6,
    competencia: "Golpes contextualizados",
    situacao: "Você espera uma encomenda. Um número desconhecido avisa que a entrega parou e pede uma taxa pequena por um link.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Confiro se o link tem o nome da transportadora e, se tiver, pago, porque aí é dela." },
      { id: "B", t: "Olho o rastreio no app da loja antes de pagar, porque taxa de verdade aparece lá." },
      { id: "C", t: "Ligo pro número que mandou a mensagem, porque assim falo com quem cobra a taxa." },
      { id: "D", t: "Cancelo a compra e peço reembolso, porque a loja já mostrou que não é confiável." },
    ],
  },
];
