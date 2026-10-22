import { Bug, EyeClosed, Link, Lock, Notification, Users } from '@nsmr/pixelart-react';
import type { Home } from '@/content/types';

const ICONS = [Lock, Link, Bug, EyeClosed, Users, Notification];

/** Faixa unica de temas. Sem movimento quando o sistema pede movimento reduzido. */
export function ThemeMarquee({ temas }: { temas: Home['temas'] }) {
  const items = (dup: boolean) =>
    temas.map((t, i) => {
      const Icon = ICONS[i % ICONS.length];
      return (
        <span className="marquee-item" key={(dup ? 'd' : 'a') + t.id} aria-hidden={dup || undefined}>
          <Icon size={30} aria-hidden="true" />
          {t.titulo}
        </span>
      );
    });
  return (
    <div className="marquee" role="region" aria-label="Temas da jornada">
      <div className="marquee-track">
        {items(false)}
        <span className="marquee-dup" style={{ display: 'contents' }} aria-hidden="true">
          {items(true)}
        </span>
      </div>
    </div>
  );
}
