'use client';

import { useRouter } from 'next/navigation';
import { Key, Link as LinkIcon, Drama, EyeOff, Share2, TriangleAlert } from 'lucide-react';
import { useJourney } from '@/engine/useJourney';
import { modules } from '@/content/modules';
import type { ModuleId } from '@/lib/types';

const ICONS = [Key, LinkIcon, Drama, EyeOff, Share2, TriangleAlert];

export default function ModulosPage() {
  const router = useRouter();
  const { hydrated, completedModules, journeyComplete, goToModule } = useJourney();

  if (!hydrated) return null;

  function pick(moduleId: ModuleId) {
    goToModule(moduleId);
    router.push(`/jornada/${moduleId}`);
  }

  return (
    <main className="modulos-page page-shell">
      <header>
        <h1>Escolha por onde continuar</h1>
        <p>Não precisa seguir a ordem. Cada módulo é independente.</p>
      </header>

      <div className="modulos-grid">
        {modules.map((mod, index) => {
          const Icon = ICONS[index];
          const done = completedModules.includes(mod.id);
          return (
            <button
              key={mod.id}
              type="button"
              className={`modulo-card${done ? ' modulo-card--done' : ''}`}
              onClick={() => pick(mod.id)}
            >
              <Icon size={22} aria-hidden="true" />
              <div>
                <strong>{mod.title}</strong>
                <span>{mod.logic}</span>
              </div>
              {done && <span className="modulo-card-check">concluído</span>}
            </button>
          );
        })}
      </div>

      {journeyComplete && (
        <button type="button" className="btn btn-primary" onClick={() => router.push('/avaliacao')}>
          Ir pra avaliação final
        </button>
      )}
    </main>
  );
}
