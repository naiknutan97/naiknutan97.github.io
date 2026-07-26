"use client";

import { useEffect, useRef } from "react";

interface Props {
  waveCount?: number;
  speed?: number;
  height?: number;
  opacity?: number;
  blendColor?: boolean;
  accentRgb?: [number, number, number];
}

export default function AuroraWaves({
  waveCount = 3,
  speed = 1,
  height = 80,
  opacity: globalAlpha = 0.55,
  blendColor = true,
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

    const draw = () => {
      frameRef.current++;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const [r, g, b] = accentRgb;

      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");
      const themeAlpha = isDark ? 1 : 2;

      for (let i = 0; i < waveCount; i++) {
        const phase = (i / waveCount) * Math.PI * 2;
        const yOffset = h * (0.3 + (i / waveCount) * 0.5);
        const amp = height * (0.6 + (i / waveCount) * 0.8);
        const freq = 0.003 + i * 0.0008;
        const waveSpeed = (0.3 + i * 0.2) * speed;

        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 3) {
          const y =
            yOffset +
            Math.sin(x * freq + frameRef.current * 0.01 * waveSpeed + phase) *
              amp +
            Math.sin(
              x * freq * 2.3 +
                frameRef.current * 0.007 * waveSpeed +
                phase * 1.5
            ) *
              amp * 0.4;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        const alpha = globalAlpha * (1 - i * 0.2) * themeAlpha;
        if (blendColor) {
          const hueShift = i * 30;
          const nr = Math.min(255, Math.max(0, r + hueShift));
          const ng = Math.min(255, Math.max(0, g + (i % 2 === 0 ? 20 : -20)));
          ctx.fillStyle = `rgba(${nr},${ng},${b},${alpha})`;
        } else {
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [waveCount, speed, height, globalAlpha, blendColor, accentRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}