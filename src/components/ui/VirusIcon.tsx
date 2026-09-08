const GRID = [
  '00100000100',
  '00010001000',
  '00111111100',
  '01101110110',
  '11111111111',
  '10111111101',
  '10100000101',
  '00011011000',
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

interface VirusIconProps {
  size?: number;
  className?: string;
}

/** Ícone pixelado (grade fixa) do "invasor" clássico, sem depender de arquivo de imagem. */
export function VirusIcon({ size = 72, className }: VirusIconProps) {
  return (
    <svg
      width={size}
      height={(size / COLS) * ROWS}
      viewBox={`0 0 ${COLS} ${ROWS}`}
      className={className}
      aria-hidden="true"
    >
      <g className="virus-icon-outline">
        {GRID.flatMap((row, y) =>
          [...row].map((c, x) => (c === '1' ? <rect key={`o-${x}-${y}`} x={x} y={y} width={1} height={1} /> : null)),
        )}
      </g>
      <g className="virus-icon-fill">
        {GRID.flatMap((row, y) =>
          [...row].map((c, x) =>
            c === '1' ? (
              <rect key={`f-${x}-${y}`} x={x + 0.14} y={y + 0.14} width={0.72} height={0.72} />
            ) : null,
          ),
        )}
      </g>
    </svg>
  );
}
