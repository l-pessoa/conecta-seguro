import type { ModuleId } from '@/lib/types';
import { modules } from '@/content/modules';

interface ProgressTrailProps {
  completedModules: ModuleId[];
  currentModule: ModuleId;
}

export function ProgressTrail({ completedModules, currentModule }: ProgressTrailProps) {
  return (
    <ol className="progress-trail" aria-label="Progresso na jornada">
      {modules.map((m) => {
        const done = completedModules.includes(m.id);
        const current = m.id === currentModule;
        const state = done ? 'done' : current ? 'current' : 'pending';
        return (
          <li key={m.id} className={`progress-dot progress-dot--${state}`} title={m.title}>
            <span>{m.id}</span>
          </li>
        );
      })}
    </ol>
  );
}
