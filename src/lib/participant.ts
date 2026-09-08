import type { Participant } from './types';
import { readStorage, writeStorage } from './storage';

const KEY = 'conectaseguro.participant';
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateCode(): string {
  let code = 'CS-';
  for (let i = 0; i < 5; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export function getOrCreateParticipant(sessionTag: string | null): Participant {
  const existing = readStorage<Participant | null>(KEY, null);
  if (existing) return existing;

  const participant: Participant = {
    code: generateCode(),
    createdAt: new Date().toISOString(),
    consentAt: null,
    sessionTag,
  };
  writeStorage(KEY, participant);
  return participant;
}

export function recordConsent(): Participant | null {
  const existing = readStorage<Participant | null>(KEY, null);
  if (!existing) return null;
  const updated: Participant = { ...existing, consentAt: new Date().toISOString() };
  writeStorage(KEY, updated);
  return updated;
}

export function hasConsented(): boolean {
  const existing = readStorage<Participant | null>(KEY, null);
  return Boolean(existing?.consentAt);
}
