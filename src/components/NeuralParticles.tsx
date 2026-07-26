"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface Props {
  count?: number;
  connectionDist?: number;
  speed?: number;
  nodeOpacity?: number;
  connectOpacity?: number;
  cursorInteract?: boolean;
  clickBurst?: boolean;
  accentRgb?: [number, number, number];
}

export default function NeuralParticles({
  count = 60,
  connectionDist = 150,
  speed = 1,
  nodeOpacity = 0.35,
  connectOpacity = 0.18,
  cursorInteract = true,
  clickBurst = false,
  accentRgb = [139, 92, 246],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const nodesRef = useRef<Node[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const frameRef = useRef(0);
  const lastMouseRef = useRef({ x: -1000, y: -1000 });
  const lastMoveRef = useRef(performance.now());

  const init = useCallback(
    (w: number, h: number) => {
      const baseSpeed = 0.6 * speed;
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * baseSpeed,
        vy: (Math.random() - 0.5) * baseSpeed,
        radius: Math.random() * 2.5 + 1.2,
        phase: Math.random() * Math.PI * 2,
      }));
    },
    [count, speed]
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

    const onMouse = (e: MouseEvent) => {
      const now = performance.now();
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        vx: e.clientX - lastMouseRef.current.x,
        vy: e.clientY - lastMouseRef.current.y,
      };
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveRef.current = now;
    };

    const onClick = (e: MouseEvent) => {
      if (!clickBurst) return;
      const ripple: Ripple = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 180 + Math.random() * 80,
        alpha: 0.6,
      };
      ripplesRef.current.push(ripple);
      if (ripplesRef.current.length > 15) ripplesRef.current.shift();

      for (const n of nodesRef.current) {
        const dx = n.x - e.clientX;
        const dy = n.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250 && dist > 0) {
          const force = (250 - dist) / 250;
          n.vx += (dx / dist) * force * 4 * speed;
          n.vy += (dy / dist) * force * 4 * speed;
        }
      }
    };

    const rr = accentRgb?.[0] && accentRgb[0] > 0 ? accentRgb[0] : 139;
    const gg = accentRgb?.[1] && accentRgb[1] > 0 ? accentRgb[1] : 92;
    const bb = accentRgb?.[2] && accentRgb[2] > 0 ? accentRgb[2] : 246;

    window.addEventListener("mousemove", onMouse);
    document.addEventListener("click", onClick);

    const draw = () => {
      frameRef.current++;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;

      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");
      const ta = isDark ? 1 : 2.2;

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 3.5;
        rip.alpha *= 0.97;
        if (rip.alpha < 0.01) ripples.splice(i, 1);
      }

      for (const rip of ripples) {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rr},${gg},${bb},${rip.alpha * ta})`;
        ctx.lineWidth = 1.5 * ((rip.alpha * ta) / 0.6);
        ctx.stroke();

        const gradient = ctx.createRadialGradient(rip.x, rip.y, 0, rip.x, rip.y, rip.radius);
        gradient.addColorStop(0, `rgba(${rr},${gg},${bb},0)`);
        gradient.addColorStop(0.6, `rgba(${rr},${gg},${bb},${rip.alpha * ta * 0.08})`);
        gradient.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      const idleMs = performance.now() - lastMoveRef.current;
      const idle = Math.min(1 - Math.exp(-idleMs / 2000), 1);
      const interact = 1 - idle;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        const damp = 0.98 - idle * 0.055;
        n.vx *= damp;
        n.vy *= damp;

        if (cursorInteract) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (interact > 0.01 && dist < 200 && dist > 0) {
            const force = Math.pow((200 - dist) / 200, 1.5);
            n.vx += (dx / dist) * force * 1.5 * interact * speed;
            n.vy += (dy / dist) * force * 1.5 * interact * speed;
          }

          if (interact > 0.01 && mouseSpeed > 2 && dist > 0 && dist < 300) {
            const tx = -(dy / dist) * mouseSpeed * 0.015 * interact * speed;
            const ty = (dx / dist) * mouseSpeed * 0.015 * interact * speed;
            n.vx += tx;
            n.vy += ty;
          }
        }

        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        const max = 3 - idle * 2.7;
        if (spd > max) {
          n.vx = (n.vx / spd) * max;
          n.vy = (n.vy / spd) * max;
        }

        const margin = 40;
        if (n.x < -margin) n.x = w + margin;
        if (n.x > w + margin) n.x = -margin;
        if (n.y < -margin) n.y = h + margin;
        if (n.y > h + margin) n.y = -margin;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rr},${gg},${bb},0.35)`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      if (cursorInteract && interact > 0.01 && mouse.x > -100) {
        const nearby = nodes.filter(
          (n) => Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2) < 200
        );
        for (const n of nearby) {
          const targets = nodes
            .filter(
              (other) =>
                other !== n &&
                Math.sqrt((n.x - other.x) ** 2 + (n.y - other.y) ** 2) < connectionDist
            )
            .sort(
              (a, b) =>
                Math.sqrt((n.x - a.x) ** 2 + (n.y - a.y) ** 2) -
                Math.sqrt((n.x - b.x) ** 2 + (n.y - b.y) ** 2)
            )
            .slice(0, 3);

          for (const target of targets) {
            const t = ((frameRef.current * 0.03 + n.phase) % 1);
            const px = n.x + (target.x - n.x) * t;
            const py = n.y + (target.y - n.y) * t;
            const pa = (0.4 + Math.sin(t * Math.PI) * 0.4) * interact * ta;
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rr},${gg},${bb},${pa})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rr},${gg},${bb},${pa * 0.2})`;
            ctx.fill();
          }
        }
      }

      for (const n of nodes) {
        const p = 1 + Math.sin(n.phase + frameRef.current * 0.03) * 0.4;
        const ba = ((nodeOpacity - idle * 0.1) + Math.sin(n.phase + frameRef.current * 0.03) * 0.3) * ta;
        const rad = n.radius * p;

        ctx.beginPath();
        ctx.arc(n.x, n.y, rad * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${ba * 0.06})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, rad * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${ba * 0.15})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${ba})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("click", onClick);
    };
  }, [init, connectionDist, speed, nodeOpacity, cursorInteract, clickBurst, accentRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
