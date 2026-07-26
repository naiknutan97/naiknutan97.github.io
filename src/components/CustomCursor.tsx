"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);

    const checkHover = () => {
      const hovered = document.querySelector("a:hover, button:hover, [data-cursor]:hover");
      setHovering(!!hovered);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", checkHover);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", checkHover);
    };
  }, [visible]);

  const springX = useSpring(pos.x, { stiffness: 200, damping: 20 });
  const springY = useSpring(pos.y, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0, scale: hovering ? 2 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-6 w-6 rounded-full border border-[rgb(var(--accent))]/30 transition-all duration-300" />
    </motion.div>
  );
}
