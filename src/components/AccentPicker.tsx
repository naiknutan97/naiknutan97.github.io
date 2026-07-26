"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, ACCENT_LABELS, ACCENT_COLORS, type Accent } from "@/providers/ThemeProvider";

const accents = Object.keys(ACCENT_LABELS) as Accent[];

export default function AccentPicker() {
  const { accent, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100/50 text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-700 dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200"
        aria-label="Change accent color"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 flex gap-1.5 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-900/95"
          >
            {accents.map((a) => (
              <button
                key={a}
                onClick={() => {
                  setAccent(a);
                  setOpen(false);
                }}
                className={`relative flex h-7 w-7 items-center justify-center rounded-lg transition-all hover:scale-110 ${
                  accent === a ? "ring-2 ring-offset-1 ring-offset-white dark:ring-offset-neutral-900" : ""
                }`}
                style={{ backgroundColor: ACCENT_COLORS[a] }}
                title={ACCENT_LABELS[a]}
                aria-label={`Set accent to ${ACCENT_LABELS[a]}`}
              >
                {accent === a && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
