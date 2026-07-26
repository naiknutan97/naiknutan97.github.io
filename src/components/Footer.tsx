"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative border-t border-neutral-200 dark:border-neutral-800/60"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[rgb(var(--accent))]/10 text-[10px] font-bold text-[rgb(var(--accent))]">
            NKN
          </span>
          <p className="text-sm text-neutral-400 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} Nutan Kumar Naik
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-6"
        >
          {["GitHub", "LinkedIn", "Scholar"].map((item) => (
            <Link
              key={item}
              href={`https://${item.toLowerCase()}.com`}
              target="_blank"
              className="relative text-sm text-neutral-400 transition-colors hover:text-[rgb(var(--accent))] dark:text-neutral-500 dark:hover:text-[rgb(var(--accent))]"
            >
              {item}
              <span className="absolute -bottom-px left-0 h-px w-0 bg-[rgb(var(--accent))] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
}
