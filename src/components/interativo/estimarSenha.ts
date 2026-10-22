/**
 * Estimativa DIDATICA de quanto tempo levaria para quebrar uma senha.
 * Roda so no aparelho. Premissa visivel na interface: atacante testando 10 bilhoes de
 * tentativas por segundo contra uma senha vazada guardada de forma fraca (cenario ruim de proposito).
 * Nao e garantia de seguranca.
 */
export const TENTATIVAS_POR_SEGUNDO = 1e10;

const COMUNS = [
  '123456', '12345678', '123456789', '1234567', '12345', 'senha', 'password', 'qwerty', 'abc123', '111111',
  'iloveyou', 'admin', 'letmein', 'brasil', 'amor', 'flamengo', 'corinthians', 'palmeiras', 'saopaulo',
  'vasco', 'gremio', 'cruzeiro', 'minhasenha', 'senha123', 'mudar123', 'roblox', 'minecraft', 'freefire',
  'fortnite', 'naruto', 'goku', 'princesa', 'gatinho', 'cachorro', 'teamo', 'amigos', 'escola', 'google',
  'whatsapp', 'instagram', 'tiktok', 'discord', 'natal', 'jesus', 'deus', 'familia', 'felipe', 'pedro',
  'lucas', 'gabriel', 'maria', 'ana', 'joao', 'bia', 'mae', 'pai',
];

const LEET: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', $: 's', '!': 'i' };

export type Nivel = 0 | 1 | 2 | 3 | 4;

export interface Estimativa {
  bits: number;
  segundos: number;
  nivel: Nivel;
  rotulo: string;
  tempo: string;
  dica: string;
  comum: boolean;
}

function tamanhoDoConjunto(s: string): number {
  let n = 0;
  if (/[a-z]/.test(s)) n += 26;
  if (/[A-Z]/.test(s)) n += 26;
  if (/\d/.test(s)) n += 10;
  if (/[^\w\s]|_/.test(s)) n += 33;
  if (/\s/.test(s)) n += 1;
  if (/[^\x00-\x7F]/.test(s)) n += 60;
  return Math.max(n, 2);
}

/** comprimento efetivo: sequencias (abc, 123) e repeticoes (aaa) valem pouco */
function comprimentoEfetivo(s: string): number {
  let ef = 0;
  let i = 0;
  while (i < s.length) {
    let j = i + 1;
    if (j < s.length) {
      const d = s.charCodeAt(j) - s.charCodeAt(i);
      if (Math.abs(d) <= 1) {
        while (j + 1 < s.length && s.charCodeAt(j + 1) - s.charCodeAt(j) === d) j++;
        const run = j - i + 1;
        if (run >= 3) { ef += 1.5; i = j + 1; continue; }
      }
    }
    ef += 1; i++;
  }
  return ef;
}

export function formatarTempo(seg: number): string {
  if (seg < 1) return 'menos de 1 segundo';
  const f = (n: number, u: string, p: string) => { const r = Math.round(n); return `${r} ${r === 1 ? u : p}`; };
  if (seg < 60) return f(seg, 'segundo', 'segundos');
  if (seg < 3600) return f(seg / 60, 'minuto', 'minutos');
  if (seg < 86400) return f(seg / 3600, 'hora', 'horas');
  if (seg < 86400 * 30) return f(seg / 86400, 'dia', 'dias');
  if (seg < 86400 * 365) return f(seg / (86400 * 30), 'mês', 'meses');
  const anos = seg / (86400 * 365);
  if (anos < 1000) return f(anos, 'ano', 'anos');
  if (anos < 1e6) return 'milhares de anos';
  if (anos < 1e9) return 'milhões de anos';
  if (anos < 1.4e10) return 'bilhões de anos';
  return 'mais que a idade do universo';
}

const ROTULOS = ['Cai na hora', 'Fraca', 'Dá pra melhorar', 'Boa', 'Forte'] as const;

export function estimarSenha(senha: string): Estimativa | null {
  if (!senha) return null;
  const baixa = senha.toLowerCase();
  const normal = baixa.replace(/[0-9@$!]/g, (c) => LEET[c] ?? c);
  const semFim = baixa.replace(/[\d\W_]+$/g, '');
  const semFimNormal = normal.replace(/[\d\W_]+$/g, '');
  const rank = COMUNS.findIndex((c) => c === baixa || c === normal || c === semFim || c === semFimNormal);
  const comum = rank >= 0;

  let bits: number;
  if (comum) {
    const extra = Math.max(0, senha.length - (COMUNS[rank].length));
    bits = Math.log2(rank + 2) + extra * 3.3;
  } else {
    bits = comprimentoEfetivo(senha) * Math.log2(tamanhoDoConjunto(senha));
    // palavra comum no comeco/fim com enfeites: pouco ganho
    const contem = COMUNS.find((c) => c.length >= 4 && normal.includes(c));
    if (contem) bits = Math.min(bits, 14 + (senha.length - contem.length) * 4.5);
    if (/^\d{4,8}$/.test(senha)) bits = Math.min(bits, 20);
    if (/^\d{6,8}$/.test(senha) || /^(\d{2})(\d{2})(\d{2,4})$/.test(senha)) bits = Math.min(bits, 20);
  }
  bits = Math.max(1, bits);
  const segundos = Math.pow(2, bits - 1) / TENTATIVAS_POR_SEGUNDO;

  const nivel: Nivel =
    segundos < 60 ? 0 : segundos < 86400 ? 1 : segundos < 86400 * 365 ? 2 : segundos < 86400 * 365 * 1000 ? 3 : 4;

  let dica: string;
  if (comum) dica = 'Essa é do tipo que aparece em listas de senhas comuns. Muda tudo.';
  else if (senha.length < 12 && nivel < 3) dica = 'Tente 12 caracteres ou mais. Uma frase com palavras sem relação funciona bem.';
  else if (nivel < 3) dica = 'Misture palavras que não combinam e evite datas e nomes.';
  else dica = 'Boa. Mesmo assim, use uma senha diferente em cada lugar importante.';

  return { bits, segundos, nivel, rotulo: ROTULOS[nivel], tempo: formatarTempo(segundos), dica, comum };
}

/** nivel qualitativo -> rotulo (usado quando o conteudo informa a forca 0..4) */
export function rotuloDoNivel(n: Nivel): string {
  return ROTULOS[n];
}
