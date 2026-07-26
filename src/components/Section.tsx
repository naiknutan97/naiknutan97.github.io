"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={sectionVariants}
      className={`py-24 ${className}`}
    >
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
        }}
        className="mb-14 h-px origin-left bg-gradient-to-r from-[rgb(var(--accent))]/40 via-[rgb(var(--accent))]/10 to-transparent"
      />

      <div className="mb-12">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 } },
          }}
          className="flex items-center gap-3"
        >
          <motion.span
            variants={{
              hidden: { width: 0 },
              visible: { width: 24, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } },
            }}
            className="h-px bg-[rgb(var(--accent))]/40"
          />
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-[rgb(var(--accent))]">
            {title}
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-[rgb(var(--accent))]/20 to-transparent" />
        </motion.div>
        {subtitle && (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 } },
            }}
            className="mt-4 text-lg text-neutral-500 dark:text-neutral-400"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
