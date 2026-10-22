import { CENAS, ARTE_DO_MODULO, type ArtId } from './ilustracoes';
import { PixelSvg } from './pixel';
import './ix.css';
import s from './ModuleArt.module.css';

export interface ModuleArtProps {
  module: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'cover' | 'small';
  className?: string;
}

/** Ilustracao pixel art do modulo (aria-hidden). cover = bloco limao grande; small = miniatura. */
export function ModuleArt({ module, size = 'cover', className = '' }: ModuleArtProps) {
  const art: ArtId = ARTE_DO_MODULO[module];
  const { Draw } = CENAS[art];
  return (
    <div className={`ix ${s.raiz} ${size === 'small' ? s.small : s.cover} ${className}`} aria-hidden="true">
      <PixelSvg className={s.svg}><Draw /></PixelSvg>
    </div>
  );
}
