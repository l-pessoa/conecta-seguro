// Fila de envio do navegador: se a rede falhar, guarda e reenvia depois.
// A jornada nunca espera a rede.

const KEY = 'conectaseguro.syncQueue';
const MAX_ITEMS = 200;

export interface QueuedRequest {
  url: string;
  body: unknown;
}

function read(): QueuedRequest[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QueuedRequest[]) : [];
  } catch {
    return [];
  }
}

function write(items: QueuedRequest[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(-MAX_ITEMS)));
  } catch {
    /* storage cheio ou bloqueado: segue sem fila */
  }
}

/** Resultado: 'ok' enviado, 'drop' o servidor recusou (4xx, nao adianta repetir), 'retry' tentar depois. */
async function post(req: QueuedRequest): Promise<'ok' | 'drop' | 'retry'> {
  try {
    const res = await fetch(req.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      keepalive: true,
    });
    if (res.ok) return 'ok';
    return res.status >= 400 && res.status < 500 ? 'drop' : 'retry';
  } catch {
    return 'retry';
  }
}

let flushing = false;
let attempt = 0;
let timer: ReturnType<typeof setTimeout> | undefined;

/** Tenta enviar tudo que esta na fila, em ordem. Para no primeiro erro de rede. */
export async function flush(): Promise<void> {
  if (typeof window === 'undefined' || flushing) return;
  flushing = true;
  try {
    let items = read();
    while (items.length > 0) {
      const result = await post(items[0]);
      if (result === 'retry') {
        attempt += 1;
        const delay = Math.min(60_000, 2_000 * 2 ** Math.min(attempt, 5)); // 4s, 8s... ate 60s
        clearTimeout(timer);
        timer = setTimeout(() => void flush(), delay);
        return;
      }
      attempt = 0;
      items = items.slice(1);
      write(items);
    }
  } finally {
    flushing = false;
  }
}

/** Poe na fila e tenta enviar ja. */
export function enqueue(req: QueuedRequest): void {
  if (typeof window === 'undefined') return;
  write([...read(), req]);
  void flush();
}

export function sendOrQueue(url: string, body: unknown): Promise<void> {
  enqueue({ url, body });
  return Promise.resolve();
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => void flush());
  void flush(); // reenvia o que sobrou de uma visita anterior
}
