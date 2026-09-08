import type { CSSProperties } from 'react';
import type { EnvironmentId } from '@/lib/types';
import { environments } from '@/content/environments';
import type { Pace } from '@/engine/pacing';

interface ParallaxBackgroundProps {
  env: EnvironmentId;
  pace: Pace;
}

interface ParallaxStyle extends CSSProperties {
  '--pace-duration': string;
  '--accent': string;
}

export function ParallaxBackground({ env, pace }: ParallaxBackgroundProps) {
  const def = environments[env];
  const style: ParallaxStyle = {
    background: def.gradient,
    '--pace-duration': pace.duration,
    '--accent': def.accent,
  };

  return (
    <div className="parallax-bg" style={style}>
      <div className="parallax-stars" />
      <div className="parallax-glow" />
    </div>
  );
}
