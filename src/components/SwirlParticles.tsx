"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  angle: number;
  radius: number;
  orbitSpeed: number;
  drift: number;
  size: number;
  phase: number;
}

interface Props {
  density?: number;
  speed?: number;
  particleSize?: number;
  opacity?: number;
  accentRgb?: [number, number, number];
}

export default function SwirlParticles({
  density = 80,
  speed = 1,
  particleSize = 1.5,
  opacity = 0.5,
  accentRgb = [139, 92, 246],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  const init = useCallback(
    (w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy);
      particlesRef.current = Array.from({ length: density }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * maxR,
        orbitSpeed: (Math.random() * 0.008 + 0.002) * speed,
        drift: (Math.random() - 0.5) * 0.3 * speed,
        size: Math.random() * particleSize + 0.5,
        phase: Math.random() * Math.PI * 2,
      }));
    },
    [density, speed, particleSize]
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
      init(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frameRef.current++;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const themeAlpha = isDark ? 1 : 2.2;

      const particles = particlesRef.current;

      for (const p of particles) {
        p.angle += p.orbitSpeed;
        p.radius += p.drift;

        if (p.radius < 0) {
          p.radius = 0;
          p.drift = Math.abs(p.drift);
        }

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius;

        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) {
          p.radius = Math.random() * Math.sqrt(cx * cx + cy * cy);
          p.angle = Math.random() * Math.PI * 2;
          continue;
        }

        const pulse = 0.7 + Math.sin(frameRef.current * 0.02 + p.phase) * 0.3;
        const alpha = opacity * pulse * themeAlpha;

        ctx.beginPath();
        ctx.arc(x, y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();

        if (p.size > 1) {
          ctx.beginPath();
          ctx.arc(x, y, p.size * pulse * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.1})`;
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
  }, [init, density, speed, particleSize, opacity, accentRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
