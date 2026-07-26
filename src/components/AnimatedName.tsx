"use client";

import { motion } from "framer-motion";

function splitChars(text: string): string[] {
  const result: string[] = [];
  for (const char of text) {
    result.push(char);
  }
  return result;
}

export default function AnimatedName() {
  const name = "Nutan Kumar Naik";

  return (
    <span className="inline-flex flex-wrap">
      {name.split(" ").map((word, wi) => (
        <span key={wi} className="inline-flex whitespace-nowrap">
          {splitChars(word).map((char, ci) => {
            const globalIndex =
              name.split(" ").slice(0, wi).join(" ").length + (wi > 0 ? 1 : 0) + ci;
            return (
              <motion.span
                key={`${wi}-${ci}`}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: globalIndex * 0.045,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className="inline-block text-gradient"
                style={{
                  textShadow:
                    "0 0 40px rgba(var(--accent),0.1), 0 0 80px rgba(var(--accent),0.05)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
          {wi < name.split(" ").length - 1 && (
            <span className="inline-block w-[0.3em]" />
          )}
        </span>
      ))}
    </span>
  );
}
