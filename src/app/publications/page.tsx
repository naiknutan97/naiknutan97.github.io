"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import PublicationCard from "@/components/PublicationCard";
import { publications } from "@/data/publications";

export default function Publications() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-[rgb(var(--accent))]" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[rgb(var(--accent))]">
            /publications
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          Publications
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
          Research papers, preprints, and conference publications in AI/ML,
          agentic systems, and geospatial AI.
        </p>
      </motion.div>

      <Section title="All Publications">
        <div className="grid gap-5">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <PublicationCard pub={pub} />
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
