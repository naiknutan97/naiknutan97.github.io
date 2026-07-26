"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";
import BlogCard from "@/components/BlogCard";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { blogPosts } from "@/data/blog";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Home() {
  return (
    <>
      <Hero />

      <Section title="Expertise" subtitle="Areas of focus and deep interest">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2"
        >
          <motion.div variants={item} className="col-span-2 row-span-1 md:col-span-2 md:row-span-2">
            <TiltCard strength={4} className="h-full">
              <div className="group h-full rounded-xl border border-neutral-200 bg-neutral-50/80 p-5 card-hover dark:border-neutral-800/50 dark:bg-neutral-900/80">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]/60" />
                  <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                </div>
                <h3 className="font-mono text-sm font-medium text-neutral-800 dark:text-neutral-100">
                  Agentic AI
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Multi-agent systems, tool use, structured reasoning, and
                  human-in-the-loop workflows. Building reliable agentic
                  architectures with built-in observability.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["LangGraph", "ReAct", "OpenAI", "Anthropic"].map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-[rgb(var(--accent-bg))] px-2 py-0.5 font-mono text-[10px] text-[rgb(var(--accent))]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {[
            { title: "AI Observability", desc: "OpenTelemetry tracing, LLM monitoring, and production debugging for AI systems." },
            { title: "LLM Applications", desc: "RAG pipelines, fine-tuning, evaluation, and safety guardrails." },
            { title: "Geospatial AI", desc: "Satellite imagery, remote sensing, and environmental ML." },
            { title: "AI Governance", desc: "Responsible AI frameworks, bias detection, compliance." },
          ].map((card) => (
            <motion.div key={card.title} variants={item}>
              <TiltCard strength={3} className="h-full">
                <div className="group h-full rounded-xl border border-neutral-200 bg-neutral-50/80 p-5 card-hover dark:border-neutral-800/50 dark:bg-neutral-900/80">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]/60" />
                  </div>
                  <h3 className="font-mono text-xs font-medium text-neutral-800 dark:text-neutral-100">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {card.desc}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section title="Featured Projects" subtitle="Selected work in AI and ML engineering">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {projects.slice(0, 4).map((project, i) => (
            <motion.div key={project.title} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-sm text-[rgb(var(--accent))] transition-colors hover:text-[rgb(var(--accent))]/70"
          >
            View all projects
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </Section>

      <Section title="Publications" subtitle="Research papers and preprints">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5"
        >
          {publications.slice(0, 2).map((pub) => (
            <motion.div key={pub.title} variants={item}>
              <PublicationCard pub={pub} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/publications"
            className="group inline-flex items-center gap-2 font-mono text-sm text-[rgb(var(--accent))] transition-colors hover:text-[rgb(var(--accent))]/70"
          >
            View all publications
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </Section>

      <Section title="Technical Writing" subtitle="Articles on AI engineering and research">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {blogPosts.slice(0, 4).map((post) => (
            <motion.div key={post.slug} variants={item}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-sm text-[rgb(var(--accent))] transition-colors hover:text-[rgb(var(--accent))]/70"
          >
            Read all articles
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </Section>
    </>
  );
}
