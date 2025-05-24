import "./styles/shapesBackground.scss";
import { useEffect, useRef, useState } from "react";
import { theme } from "../../../styles/theme.ts";

type Shape = {
  x: number;
  y: number;
  radius: number;
  color: string;
  dx: number; // horizontal velocity
  dy: number; // vertical velocity
};
const colors = [theme.accentYellow, theme.accentBlue, theme.accentPink];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

const createShapes = (count: number, width: number, height: number): Shape[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 20 + Math.random() * 30,
    color: randomColor(),
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5,
  }));

export default function ShapesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const shapesRef = useRef<Shape[]>([]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize and animate shapes whenever dimensions change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = dimensions;
    canvas.width = width;
    canvas.height = height;

    // Re-create shapes for new size
    shapesRef.current = createShapes((width * height) / 15000, width, height);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      shapesRef.current.forEach((shape) => {
        // Update position
        shape.x += shape.dx;
        shape.y += shape.dy;

        // Bounce off edges
        if (shape.x < shape.radius || shape.x > width - shape.radius)
          shape.dx *= -1;
        if (shape.y < shape.radius || shape.y > height - shape.radius)
          shape.dy *= -1;
        // Draw shape
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fillStyle = shape.color;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup animation frame on unmount or dimension change
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <div className={"shapes-background"} ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}
