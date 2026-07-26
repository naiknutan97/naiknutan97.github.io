"use client";

import { useEffect, useCallback, useRef, useState } from "react";

interface Wave {
  id: number;
  x: number;
  y: number;
}

export default function WaveDistortion() {
  const [waves, setWaves] = useState<Wave[]>([]);
  const idRef = useRef(0);

  const handleClick = useCallback((e: MouseEvent) => {
    const id = idRef.current++;
    setWaves((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setWaves((prev) => prev.filter((w) => w.id !== id));
    }, 2500);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <>
      {waves.map((w) => (
        <div
          key={w.id}
          className="pointer-events-none fixed z-[9997]"
          style={{ left: w.x, top: w.y }}
        >
          {/* Blur distortion ring */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              animation:
                "water-distort-ring 2.2s cubic-bezier(0.15, 0.7, 0.3, 1) forwards",
              backdropFilter: "blur(6px) brightness(1.18) contrast(1.15)",
              WebkitBackdropFilter:
                "blur(6px) brightness(1.18) contrast(1.15)",
              background:
                "radial-gradient(circle, rgba(var(--accent), 0.06), transparent 70%)",
            }}
          />
          {/* Outer ripple line */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              animation:
                "water-distort-ripple-1 2.2s cubic-bezier(0.15, 0.7, 0.3, 1) forwards",
              border: "1px solid rgba(var(--accent), 0.2)",
            }}
          />
          {/* Mid ripple line */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              animation:
                "water-distort-ripple-2 2.2s cubic-bezier(0.15, 0.7, 0.3, 1) forwards",
              border: "1.5px solid rgba(var(--accent), 0.12)",
            }}
          />
          {/* Inner ripple glow */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              animation:
                "water-distort-ripple-3 2.2s cubic-bezier(0.15, 0.7, 0.3, 1) forwards",
              background:
                "radial-gradient(circle, rgba(var(--accent), 0.08), transparent 60%)",
            }}
          />
        </div>
      ))}
    </>
  );
}
