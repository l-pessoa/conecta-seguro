export interface Trecho {
  texto: string;
  /** indice do trecho tocavel (ordem de aparicao); undefined = texto comum */
  parte?: number;
}

/** Quebra "ola [[clique aqui]] agora" em trechos. `inicio` continua a contagem entre varios textos. */
export function parseTrechos(texto: string, inicio = 0): { trechos: Trecho[]; proximo: number } {
  const trechos: Trecho[] = [];
  let i = inicio;
  const re = /\[\[(.+?)\]\]/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(texto))) {
    if (m.index > ultimo) trechos.push({ texto: texto.slice(ultimo, m.index) });
    trechos.push({ texto: m[1], parte: i++ });
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) trechos.push({ texto: texto.slice(ultimo) });
  return { trechos, proximo: i };
}

export function contarTrechos(...textos: (string | undefined)[]): number {
  return textos.reduce((n, t) => n + (t ? (t.match(/\[\[(.+?)\]\]/g) ?? []).length : 0), 0);
}

export function semMarcacao(texto: string): string {
  return texto.replace(/\[\[(.+?)\]\]/g, '$1');
}
