"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  driftX: number;
  driftY: number;
}

interface Props {
  orbCount?: number;
  maxSize?: number;
  speed?: number;
  opacity?: number;
  accentRgb?: [number, number, number];
}

export default function FloatingOrbs({
  orbCount = 4,
  maxSize = 200,
  speed = 1,
  opacity = 0.15,
  accentRgb = [139, 92, 246],
}: Props) {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const generated: Orb[] = Array.from({ length: orbCount }, (_, i) => ({
      id: i,
      size: maxSize * (0.5 + Math.random() * 0.5),
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.8,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 40,
    }));
    setOrbs(generated);
  }, [orbCount, maxSize]);

  const [r, g, b] = accentRgb;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle at 30% 30%, rgba(${r},${g},${b}, 0.4), rgba(${r},${g},${b}, 0.05) 60%, transparent 80%)`,
            opacity,
          }}
          animate={{
            x: [0, orb.driftX, 0, -orb.driftX * 0.5, 0],
            y: [0, orb.driftY, -orb.driftY * 0.5, orb.driftY * 0.3, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 12 / speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
