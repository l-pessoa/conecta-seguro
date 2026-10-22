import type { FormaQuiz } from '../types';

/** Forma B (pos). Sem resposta correta: o gabarito fica em src/lib/server/gabarito.ts. */
export const formB: FormaQuiz = [
  {
    id: "b-m1-1",
    modulo: 1,
    competencia: "Senhas",
    situacao: "Você vai cadastrar uma senha nova, e o app sugere uma sequência aleatória difícil de memorizar.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Troco por uma senha mais curta que eu decore, porque a conta é secundária." },
      { id: "B", t: "Uso a sugerida e guardo num gerenciador de senhas, porque assim não preciso decorar." },
      { id: "C", t: "Salvo a sugerida num print na galeria, porque lá eu acho quando precisar." },
      { id: "D", t: "Mudo a sugerida e decoro, trocando letras por números parecidos, porque fica fácil." },
    ],
  },
  {
    id: "b-m2-2",
    modulo: 2,
    competencia: "QR Codes e destinos de links",
    situacao: "Num cartaz dentro de uma loja, um QR Code promete desconto se você seguir a página oficial. Ele abre uma tela pedindo login.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Faço login, porque o cartaz está dentro da loja e então o QR só pode ser da loja." },
      { id: "B", t: "Confiro o endereço que aparece e, se citar a loja, faço login, porque assim é dela." },
      { id: "C", t: "Escaneio, mas não faço login: só olho a página, porque olhar não tem risco nenhum." },
      { id: "D", t: "Busco o perfil da loja na rede social e sigo por lá, porque assim sei que é o verdadeiro." },
    ],
  },
  {
    id: "b-m3-1",
    modulo: 3,
    competencia: "Engenharia social",
    situacao: "Chega um e-mail igual ao de um serviço seu: a assinatura será cancelada em 15 minutos se você não pagar por um link.",
    pergunta: "O que mais te faria desconfiar?",
    opcoes: [
      { id: "A", t: "O e-mail ter chegado de madrugada, porque em 15 minutos empresa séria não cancela nada." },
      { id: "B", t: "O e-mail ter o mesmo logo e layout do serviço, porque golpista não copia bem o link." },
      { id: "C", t: "O prazo de 15 minutos com cobrança por link, porque a pressa tira o tempo de pensar." },
      { id: "D", t: "Qualquer e-mail que cite pagamento por link, porque cobrança séria é só pelo app." },
    ],
  },
  {
    id: "b-m4-2",
    modulo: 4,
    competencia: "Permissões de aplicativos",
    situacao: "Um app de lanterna, que só liga a luz do celular, pede acesso aos seus contatos e à sua localização.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Recuso contatos e localização, porque uma lanterna só precisa acender a luz." },
      { id: "B", t: "Aceito os dois e sigo usando, porque app que só liga a luz vive de dados." },
      { id: "C", t: "Aceito só a localização e a deixo desligada quando não uso, porque assim limito o risco." },
      { id: "D", t: "Vejo se o app tem muitos downloads e, se tiver, aceito, porque app popular é de confiança." },
    ],
  },
  {
    id: "b-m5-1",
    modulo: 5,
    competencia: "Identidade digital",
    situacao: "Uma colega, de quem você tem o telefone, manda mensagem de um perfil \"novo\": perdeu o acesso ao antigo e pede um depósito pequeno.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Comparo as fotos e os amigos em comum e, se baterem, faço o depósito." },
      { id: "B", t: "Falo com a pessoa por um contato que eu já tinha, como telefone." },
      { id: "C", t: "Pergunto na conversa algo que só ela saberia e deposito se acertar." },
      { id: "D", t: "Bloqueio todos os perfis dela e conto pra todo mundo que foi hackeada." },
    ],
  },
  {
    id: "b-m6-1",
    modulo: 6,
    competencia: "Golpes contextualizados",
    situacao: "Você tem consulta marcada. No dia, um SMS diz que foi cancelada e pede confirmar seus dados por um link para reagendar.",
    pergunta: "O que você faria?",
    opcoes: [
      { id: "A", t: "Confiro se o link do SMS tem o nome da clínica e, se tiver, confirmo, porque aí é dela." },
      { id: "B", t: "Cancelo a consulta e marco outra em outro lugar, porque a clínica já errou comigo." },
      { id: "C", t: "Ligo pro número do SMS para reagendar, porque assim falo com a clínica." },
      { id: "D", t: "Ligo pra clínica pelo telefone da consulta marcada, porque aí falo com ela de verdade." },
    ],
  },
];
