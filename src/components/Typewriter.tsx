"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  words: string[];
  className?: string;
}

export default function Typewriter({ words, className = "" }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;
    const timeout = setTimeout(
      () => {
        if (forward) {
          if (subIndex === words[index].length) {
            setPause(true);
            setTimeout(() => {
              setPause(false);
              setForward(false);
            }, 2000);
          } else {
            setSubIndex((s) => s + 1);
          }
        } else {
          if (subIndex === 0) {
            setForward(true);
            setIndex((i) => (i + 1) % words.length);
          } else {
            setSubIndex((s) => s - 1);
          }
        }
      },
      forward ? 60 : 30
    );
    return () => clearTimeout(timeout);
  }, [subIndex, forward, index, words, pause]);

  return (
    <span className={className}>
      {words[index].substring(0, subIndex)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-[rgb(var(--accent))]"
      >
        |
      </motion.span>
    </span>
  );
}
