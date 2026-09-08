import type { Pace } from '@/engine/pacing';

interface WalkingCharacterProps {
  pace: Pace;
}

/**
 * Placeholder ate o sprite sheet chegar (docs/PENDENCIAS.md B2).
 * Silhueta simples que reage ao ritmo da cena.
 */
export function WalkingCharacter({ pace }: WalkingCharacterProps) {
  return (
    <div className={`walking-character walking-character--${pace.label}`} aria-hidden="true">
      <div className="walking-character-body" />
    </div>
  );
}
