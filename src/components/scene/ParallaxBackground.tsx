import type { CSSProperties } from 'react';
import type { EnvironmentId } from '@/lib/types';
import { environments } from '@/content/environments';
import type { Pace } from '@/engine/pacing';

interface ParallaxBackgroundProps {
  env: EnvironmentId;
  pace?: Pace;
}

interface LayerStyle extends CSSProperties {
  '--layer-duration': string;
}

export function ParallaxBackground({ env, pace }: ParallaxBackgroundProps) {
  const def = environments[env];
  const baseDuration = pace ? Number.parseFloat(pace.duration) : 1.4;

  return (
    <div className="stage-bg" style={{ backgroundColor: def.baseColor }}>
      {def.layers.map((layer, index) => {
        const duration = layer.speed > 0 ? Math.max(baseDuration / layer.speed, 1.2) : 0;
        const style: LayerStyle = {
          backgroundImage: `url(${layer.src})`,
          backgroundRepeat: layer.repeat ? 'repeat-x' : 'no-repeat',
          backgroundSize: layer.repeat ? 'auto 100%' : 'cover',
          backgroundPosition: layer.repeat ? 'left bottom' : 'center',
          filter: layer.filter,
          '--layer-duration': layer.repeat && duration ? `${duration}s` : '0s',
        };
        const className = `stage-bg-layer${layer.repeat ? ' stage-bg-layer--scroll' : ''}`;
        return <div key={layer.src} className={className} style={style} />;
      })}
      <div className="stage-bg-glow" style={{ '--accent': def.accent } as CSSProperties} />
      <div className="stage-bg-vignette" />
    </div>
  );
}
