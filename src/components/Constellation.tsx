"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  phase: number;
  twinkleSpeed: number;
  baseRadius: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface Props {
  starCount?: number;
  twinkleSpeed?: number;
  connectDist?: number;
  shootingStars?: boolean;
  starOpacity?: number;
  accentRgb?: [number, number, number];
}

export default function Constellation({
  starCount = 25,
  twinkleSpeed: twinkle = 1,
  connectDist = 120,
  shootingStars = true,
  starOpacity = 0.8,
  accentRgb = [139, 92, 246],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);

  const init = useCallback(
    (w: number, h: number) => {
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        baseRadius: 0.5 + Math.random() * 1.5,
      }));
    },
    [starCount]
  );

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
      init(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const [r, g, b] = accentRgb;

    const draw = () => {
      frameRef.current++;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const stars = starsRef.current;
      const meteors = meteorsRef.current;

      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");
      const themeAlpha = isDark ? 1 : 2.2;

      if (shootingStars && frameRef.current % 120 === 0 && Math.random() < 0.3) {
        meteors.push({
          x: Math.random() * w * 0.8,
          y: Math.random() * h * 0.3,
          vx: 4 + Math.random() * 6,
          vy: 3 + Math.random() * 4,
          life: 0,
          maxLife: 30 + Math.random() * 30,
        });
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const fade = 1 - m.life / m.maxLife;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 4, m.y - m.vy * 4);
        ctx.strokeStyle = `rgba(${r},${g},${b},${fade * 0.8})`;
        ctx.lineWidth = 1.5 * fade;
        ctx.stroke();
        if (m.life >= m.maxLife) meteors.splice(i, 1);
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b2 = stars[j];
          const dx = a.x - b2.x;
          const dy = a.y - b2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b2.x, b2.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / connectDist) * 0.15})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      for (const s of stars) {
        const twinkleVal =
          0.3 +
          Math.sin(s.phase + frameRef.current * 0.02 * s.twinkleSpeed * twinkle) *
            0.7;
        const rad = s.baseRadius * (0.5 + twinkleVal * 0.5);
        const alpha = starOpacity * twinkleVal;

        ctx.beginPath();
        ctx.arc(s.x, s.y, rad * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.1})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [init, connectDist, twinkle, shootingStars, starOpacity, accentRgb]);

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />
  );
}
