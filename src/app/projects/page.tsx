"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
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
            /projects
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
          A selection of projects spanning AI observability, agentic systems,
          geospatial ML, and infrastructure.
        </p>
      </motion.div>

      <Section title="Featured Work">
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
