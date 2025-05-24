interface SquareProps {
  size: number;
  strokeWidth: number;
  left: number;
  top: number;
}

export default function Square({ size, strokeWidth, left, top }: SquareProps) {
  const svgSize = size + strokeWidth;

  const offset = strokeWidth / 2;

  return (
    <svg
      width={svgSize}
      height={svgSize}
      className="svg-square"
      style={{ left: left - svgSize / 2, top: top - svgSize / 2 }}
    >
      <rect
        className="square"
        x={offset}
        y={offset}
        width={size}
        height={size}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
