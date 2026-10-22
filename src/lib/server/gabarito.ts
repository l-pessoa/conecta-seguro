import 'server-only';

/**
 * GABARITO do quiz pre/pos. So no servidor: nunca importar de componente de cliente.
 * A integridade (3/3/3/3, comprimentos, pistas) e testada em tests/quiz.test.ts.
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
    "a-m2-2": { correct: "C", competency: "QR Codes e destinos de links", conceito: "Aparência e cadeado não provam nada: vá pelo app ou endereço que você já conhece." },
    "a-m3-1": { correct: "D", competency: "Engenharia social", conceito: "O sinal é a combinação: prazo curto, pedido de dados e link inesperado. Nome e logo se copiam." },
    "a-m4-2": { correct: "B", competency: "Permissões de aplicativos", conceito: "Cada permissão deve ter relação com a função do app; o resto se recusa." },
    "a-m5-1": { correct: "D", competency: "Identidade digital", conceito: "Provas dentro do perfil suspeito se copiam; confirme por um canal que você já usava." },
    "a-m6-1": { correct: "B", competency: "Golpes contextualizados", conceito: "Uma encomenda real não torna a mensagem real; confirme na fonte." },
  },
  B: {
    "b-m1-1": { correct: "B", competency: "Senhas", conceito: "Senha forte não precisa ser decorada: um gerenciador guarda senhas longas e únicas." },
    "b-m2-2": { correct: "D", competency: "QR Codes e destinos de links", conceito: "Estar num lugar de confiança não torna confiável o destino do QR Code." },
    "b-m3-1": { correct: "C", competency: "Engenharia social", conceito: "Pressa e pedido de pagamento por link formam a combinação de sinais; layout e logo se copiam." },
    "b-m4-2": { correct: "A", competency: "Permissões de aplicativos", conceito: "O critério é a relação entre a permissão e a função do app." },
    "b-m5-1": { correct: "B", competency: "Identidade digital", conceito: "Provas dentro do mesmo canal suspeito não substituem a confirmação por outro canal." },
    "b-m6-1": { correct: "D", competency: "Golpes contextualizados", conceito: "Um fato verdadeiro (a consulta existe) não torna verdadeira a mensagem." },
  },
};
