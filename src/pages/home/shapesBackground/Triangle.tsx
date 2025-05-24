interface TriangleProps {
  size: number;
  strokeWidth: number;
  left: number;
  top: number;
}

export default function Triangle({
  size,
  strokeWidth,
  left,
  top,
}: TriangleProps) {
  const height = (size * Math.sqrt(3)) / 2;
  const width = size + strokeWidth;
  const svgHeight = height + strokeWidth;

  const points = [
    `${width / 2},${strokeWidth}`, // Top vertex
    `${width - strokeWidth},${svgHeight - strokeWidth / 2}`, // Bottom right
    `${strokeWidth},${svgHeight - strokeWidth / 2}`, // Bottom left
  ].join(" ");

  return (
    <svg
      width={width}
      height={svgHeight}
      className="svg-triangle"
      style={{ left: left - width / 2, top: top - svgHeight / 2 }}
    >
      <polygon className="triangle" points={points} strokeWidth={strokeWidth} />
    </svg>
  );
}
