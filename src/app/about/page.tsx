"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";

export default function About() {
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
            /about
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          About Me
        </h1>
      </motion.div>

      <Section title="Background">
        <div className="space-y-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>
            I am an AI/ML Engineer and researcher focused on building
            production-grade AI systems that are observable, reliable, and
            responsibly governed. My work spans the full stack of modern AI
            engineering — from training and deploying deep learning models to
            designing agentic architectures with built-in observability.
          </p>
          <p>
            I specialize in OpenTelemetry-native AI infrastructure, enabling
            deep visibility into LLM behavior, agent decision-making, and model
            performance in production. I believe that observability is the
            foundation of trustworthy AI.
          </p>
          <p>
            My research interests include agentic AI systems, geospatial machine
            learning, AI governance frameworks, and the application of
            open-source tooling to production AI challenges.
          </p>
        </div>
      </Section>

      <Section title="Technical Interests">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Agentic AI & Multi-agent Systems",
            "LLM Observability & Monitoring",
            "OpenTelemetry & AI Infrastructure",
            "Deep Learning & Computer Vision",
            "Geospatial AI & Remote Sensing",
            "AI Governance & Responsible AI",
            "MLOps & Production ML",
            "Natural Language Processing",
          ].map((interest) => (
            <div
              key={interest}
              className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/80 card-hover dark:border-neutral-800/50 dark:bg-neutral-900/80"
            >
              <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[rgb(var(--accent))]/5 to-transparent" />
              </div>
              <div className="relative flex items-center gap-3 px-5 py-4">
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {interest}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
