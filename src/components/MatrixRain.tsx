"use client";

import { useEffect, useRef, useCallback } from "react";

interface Drop {
  col: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
}

interface Props {
  density?: number;
  speed?: number;
  charSize?: number;
  opacity?: number;
  accentRgb?: [number, number, number];
}

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

export default function MatrixRain({
  density = 1,
  speed = 1,
  charSize = 14,
  opacity = 0.5,
  accentRgb = [139, 92, 246],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const frameRef = useRef(0);

  const init = useCallback(
    (w: number) => {
      const cols = Math.floor(w / charSize);
      const dropCount = Math.floor(cols * density * 0.15);
      const taken = new Set<number>();
      dropsRef.current = [];
      for (let i = 0; i < dropCount; i++) {
        let col: number;
        do {
          col = Math.floor(Math.random() * cols);
        } while (taken.has(col) && taken.size < cols);
        taken.add(col);
        const len = Math.floor(Math.random() * 15 + 5);
        dropsRef.current.push({
          col,
          y: -len - Math.random() * 40,
          speed: (Math.random() * 0.8 + 0.4) * speed,
          length: len,
          chars: Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
        });
      }
    },
    [density, speed, charSize]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const r = accentRgb[0];
    const g = accentRgb[1];
    const b = accentRgb[2];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      init(window.innerWidth);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frameRef.current++;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.fillStyle = `rgba(0,0,0,${(1 - opacity) * 0.12 + 0.04})`;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${charSize}px monospace`;
      ctx.textAlign = "center";

      const drops = dropsRef.current;

      for (const drop of drops) {
        drop.y += drop.speed;

        if (drop.y - drop.length > h + 10) {
          drop.y = -drop.length;
          drop.speed = (Math.random() * 0.8 + 0.4) * speed;
          for (let i = 0; i < drop.length; i++) {
            drop.chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          continue;
        }

        const x = drop.col * charSize + charSize / 2;

        for (let i = 0; i < drop.length; i++) {
          const cy = drop.y - i * charSize;
          if (cy < -charSize || cy > h) continue;

          if (frameRef.current % 3 === 0) {
            drop.chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }

          if (i === 0) {
            ctx.fillStyle = `rgba(${r},${g},${b},${opacity * 0.9 + 0.1})`;
          } else {
            const a = Math.max(0, (1 - i / drop.length) * opacity * 0.6);
            ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          }
          ctx.fillText(drop.chars[i], x, cy);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [init, density, speed, charSize, opacity, accentRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
