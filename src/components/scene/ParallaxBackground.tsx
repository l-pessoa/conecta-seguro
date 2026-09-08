import type { CSSProperties } from 'react';
import type { EnvironmentId } from '@/lib/types';
import { environments } from '@/content/environments';
import type { Pace } from '@/engine/pacing';

interface ParallaxBackgroundProps {
  env: EnvironmentId;
  pace?: Pace;
}

interface StageBgStyle extends CSSProperties {
  '--pace-duration'?: string;
  '--accent': string;
}

export function ParallaxBackground({ env, pace }: ParallaxBackgroundProps) {
  const def = environments[env];
  const style: StageBgStyle = {
    '--pace-duration': pace?.duration,
    '--accent': def.accent,
  };

  return (
    <div className="stage-bg" style={style}>
      <div className="stage-bg-gradient" style={{ background: def.gradient }} />
      <div className="stage-bg-stars" />
      <div className="stage-bg-glow" />
      <div className="stage-bg-vignette" />
    </div>
  );
}
