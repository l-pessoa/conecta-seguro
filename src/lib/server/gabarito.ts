import 'server-only';

/**
 * GABARITO do quiz pre/pos. So no servidor: nunca importar de componente de cliente.
 * Gerado a partir do conteudo; a integridade (3/3/3/3, comprimentos) e testada em tests/quiz.test.ts.
 * A = pre (Forma A), B = pos (Forma B). `conceito` e a explicacao mostrada no fim do pos.
 */
export type OpcaoGabarito = 'A' | 'B' | 'C' | 'D';

export interface EntradaGabarito {
  correct: OpcaoGabarito;
  competency: string;
  conceito: string;
}

export const GABARITO: Record<'A' | 'B', Record<string, EntradaGabarito>> = {
  A: {
    "a-m1-1": { correct: "A", competency: "Senhas", conceito: "Senha forte é longa, imprevisível e exclusiva de cada conta." },
    "a-m1-2": { correct: "D", competency: "Segurança de contas", conceito: "Mesmo com a conta funcionando, vale conferir os acessos recentes pelos recursos oficiais e encerrar os desconhecidos." },
    "a-m2-1": { correct: "B", competency: "Verificação de links", conceito: "Confie no canal que você já conhece, não no link que chegou, mesmo vindo de um grupo." },
    "a-m2-2": { correct: "C", competency: "QR Codes e destinos de links", conceito: "Aparência e cadeado não provam nada: vá pelo app ou endereço que você já conhece." },
    "a-m3-1": { correct: "D", competency: "Engenharia social", conceito: "O sinal é a combinação: prazo curto, pedido de dados e link inesperado. Nome e logo se copiam." },
    "a-m3-2": { correct: "A", competency: "Autenticação", conceito: "Código de verificação é pessoal. Pedido fora do normal, até de amigo, se confirma por outro canal." },
    "a-m4-1": { correct: "C", competency: "Exposição acidental", conceito: "A imagem pode mostrar mais do que você pretendia; revise o fundo antes de postar." },
    "a-m4-2": { correct: "B", competency: "Permissões de aplicativos", conceito: "Cada permissão deve ter relação com a função do app; o resto se recusa." },
    "a-m5-1": { correct: "D", competency: "Identidade digital", conceito: "Provas dentro do perfil suspeito se copiam; confirme por um canal que você já usava." },
    "a-m5-2": { correct: "A", competency: "Audiência e contexto em redes sociais", conceito: "Post público tem público de verdade: pense em quem pode ver e no que revela." },
    "a-m6-1": { correct: "B", competency: "Golpes contextualizados", conceito: "Uma encomenda real não torna a mensagem real; confirme na fonte." },
    "a-m6-2": { correct: "C", competency: "Proteção e recuperação de acesso", conceito: "Bloqueie o aparelho e encerre os acessos às contas; esperar ou divulgar só aumenta o risco." },
  },
  B: {
    "b-m1-1": { correct: "B", competency: "Senhas", conceito: "Senha forte não precisa ser decorada: um gerenciador guarda senhas longas e únicas." },
    "b-m1-2": { correct: "C", competency: "Segurança de contas", conceito: "Até um aviso real pode trazer link falso; entre pelo app que você já conhece." },
    "b-m2-1": { correct: "A", competency: "Verificação de links", conceito: "Confiar na marca não torna confiável a mensagem que diz vir dela." },
    "b-m2-2": { correct: "D", competency: "QR Codes e destinos de links", conceito: "Estar num lugar de confiança não torna confiável o destino do QR Code." },
    "b-m3-1": { correct: "C", competency: "Engenharia social", conceito: "Pressa e pedido de pagamento por link formam a combinação de sinais; layout e logo se copiam." },
    "b-m3-2": { correct: "B", competency: "Autenticação", conceito: "Saber detalhes sobre você não prova nada; código não se passa, nem em parte." },
    "b-m4-1": { correct: "D", competency: "Exposição acidental", conceito: "O que a imagem revela não depende da intenção de quem posta." },
    "b-m4-2": { correct: "A", competency: "Permissões de aplicativos", conceito: "O critério é a relação entre a permissão e a função do app." },
    "b-m5-1": { correct: "B", competency: "Identidade digital", conceito: "Provas dentro do mesmo canal suspeito não substituem a confirmação por outro canal." },
    "b-m5-2": { correct: "C", competency: "Audiência e contexto em redes sociais", conceito: "Um comentário público tem a mesma exposição de um post: a audiência é maior que a imaginada." },
    "b-m6-1": { correct: "D", competency: "Golpes contextualizados", conceito: "Um fato verdadeiro (a consulta existe) não torna verdadeira a mensagem." },
    "b-m6-2": { correct: "A", competency: "Proteção e recuperação de acesso", conceito: "Perceber é só o começo: revogue o acesso concedido e troque a senha." },
  },
};
