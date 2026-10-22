import { Alert, Lightbulb, Mouse } from '@nsmr/pixelart-react';

/** Titulo com entrada palavra a palavra e pilulas-icone. So CSS: sem JS no hero. */
export function HeroHeading() {
  const iconProps = { weight: 'bold' as const, 'aria-hidden': true };
  return (
    <h1>
      <span className="line">
        <span className="hw"><span style={{ ['--i' as string]: 0 }}>Pare,</span></span>
        <span className="pill" style={{ ['--i' as string]: 0 }}><Alert {...iconProps} /></span>
      </span>
      <span className="line">
        <span className="hw"><span style={{ ['--i' as string]: 1 }}>pense,</span></span>
        <span className="pill pill--dark" style={{ ['--i' as string]: 1 }}><Lightbulb {...iconProps} /></span>
      </span>
      <span className="line">
        <span className="hw"><span style={{ ['--i' as string]: 2 }}>escolha.</span></span>
        <span className="pill pill--soft" style={{ ['--i' as string]: 2 }}><Mouse {...iconProps} /></span>
      </span>
    </h1>
  );
}
