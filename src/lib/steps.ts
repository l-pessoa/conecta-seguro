/** Easing em degraus para o look retro: n posicoes discretas entre 0 e 1. */
export const stepped = (n: number) => (t: number) => Math.min(1, Math.floor(t * n) / (n - 1));
