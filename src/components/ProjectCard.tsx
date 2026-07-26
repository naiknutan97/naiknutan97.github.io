"use client";

import { Project } from "@/data/projects";
import TiltCard from "./TiltCard";
import { motion } from "framer-motion";

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <div>
      <TiltCard strength={6} className="h-full">
        <div className="group relative h-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/80 dark:border-neutral-800/50 dark:bg-neutral-900/80">
          <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-all duration-500 group-hover:opacity-100">
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                background: "conic-gradient(from 0deg, rgb(var(--accent)) 0%, transparent 25%, transparent 75%, rgb(var(--accent)) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: 1,
              }}
            />
            <div className="absolute inset-[1px] rounded-xl bg-gradient-to-b from-[rgb(var(--accent))]/5 to-transparent" />
          </div>

          <div className="relative h-full p-6" style={{ transformStyle: "preserve-3d" }}>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]/60" />
            <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          <h3 className="text-lg font-semibold text-neutral-800 transition-colors group-hover:text-[rgb(var(--accent))] dark:text-neutral-100 dark:group-hover:text-[rgb(var(--accent))]">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {project.description}
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Problem
              </span>
              <p className="mt-1 text-sm leading-relaxed text-neutral-500/80 dark:text-neutral-400/80">
                {project.problem}
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Approach
              </span>
              <p className="mt-1 text-sm leading-relaxed text-neutral-500/80 dark:text-neutral-400/80">
                {project.approach}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-[rgb(var(--accent-bg))] px-2.5 py-1 font-mono text-[11px] text-[rgb(var(--accent))]"
              >
                {t}
              </span>
            ))}
          </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
