"use client";

import { useEffect, useRef, useCallback } from "react";

interface Props {
  resolution?: number;
  speed?: number;
  amplitude?: number;
  opacity?: number;
  accentRgb?: [number, number, number];
}

export default function MorphingMesh({
  resolution = 10,
  speed = 1,
  amplitude = 40,
  opacity: globalAlpha = 0.3,
  accentRgb = [139, 92, 246],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const [r, g, b] = accentRgb;

    const draw = () => {
      frameRef.current++;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cols = Math.max(4, resolution);
      const rows = Math.max(3, Math.floor(cols * (h / w)));
      const cellW = w / (cols - 1);
      const cellH = h / (rows - 1);

      ctx.clearRect(0, 0, w, h);

      const grid: { x: number; y: number }[][] = [];
      for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
          const baseX = col * cellW;
          const baseY = row * cellH;
          const wave1 =
            Math.sin(
              (baseX + baseY) * 0.005 + frameRef.current * 0.008 * speed
            ) * amplitude;
          const wave2 =
            Math.sin(baseX * 0.01 + frameRef.current * 0.005 * speed) *
            amplitude * 0.6;
          const wave3 =
            Math.cos(baseY * 0.008 + frameRef.current * 0.006 * speed) *
            amplitude * 0.4;
          grid[row][col] = {
            x: baseX + wave1 + wave2,
            y: baseY + wave1 + wave3,
          };
        }
      }

      ctx.strokeStyle = `rgba(${r},${g},${b},${globalAlpha})`;
      ctx.lineWidth = 0.8;

      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        ctx.moveTo(grid[row][0].x, grid[row][0].y);
        for (let col = 1; col < cols; col++) {
          ctx.lineTo(grid[row][col].x, grid[row][col].y);
        }
        ctx.stroke();
      }

      for (let col = 0; col < cols; col++) {
        ctx.beginPath();
        ctx.moveTo(grid[0][col].x, grid[0][col].y);
        for (let row = 1; row < rows; row++) {
          ctx.lineTo(grid[row][col].x, grid[row][col].y);
        }
        ctx.stroke();
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = grid[row][col];
          const pulse =
            Math.sin(
              frameRef.current * 0.02 * speed + row * 0.3 + col * 0.5
            ) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5 + pulse * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${globalAlpha * (0.3 + pulse * 0.7)})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [resolution, speed, amplitude, globalAlpha, accentRgb]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />;
}