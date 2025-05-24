interface CircleProps {
  radius: number;
  strokeWidth: number;
  left: number;
  top: number;
}

export default function Circle({
  radius,
  strokeWidth,
  left,
  top,
}: CircleProps) {
  const width = radius * 2 + strokeWidth;
  const height = radius * 2 + strokeWidth;
  return (
    <svg
      width={width}
      height={height}
      className="svg-circle"
      style={{ left: left, top: top }}
    >
      <circle
        className="circle"
        cx={width / 2}
        cy={height / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
