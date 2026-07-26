"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  const handleClick = useCallback((e: MouseEvent) => {
    const id = idRef.current++;
    const ripple: Ripple = { id, x: e.clientX, y: e.clientY };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full border border-[rgb(var(--accent))]"
          style={{
            left: r.x,
            top: r.y,
            animation: "ripple-expand 0.8s ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}
