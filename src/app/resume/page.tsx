"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import SkillBar from "@/components/SkillBar";
import Link from "next/link";

const timeline = [
  {
    year: "2024 - Present",
    role: "AI/ML Engineer",
    org: "Current",
    desc: "Building observable AI systems with focus on agentic architectures, LLM observability, and OpenTelemetry-native infrastructure.",
  },
  {
    year: "2022 - 2024",
    role: "Machine Learning Engineer",
    org: "Previous",
    desc: "Developed deep learning pipelines for geospatial analysis and environmental monitoring. Built scalable ML infrastructure on cloud platforms.",
  },
  {
    year: "2020 - 2022",
    role: "Research Engineer",
    org: "Previous",
    desc: "Applied machine learning to remote sensing data. Published research on deep learning for land cover classification and environmental monitoring.",
  },
];

const skillGroups = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 95 },
      { name: "Rust", level: 60 },
      { name: "Go", level: 55 },
    ],
  },
  {
    category: "ML/AI",
    skills: [
      { name: "PyTorch", level: 90 },
      { name: "TensorFlow", level: 80 },
      { name: "LangChain", level: 85 },
      { name: "OpenTelemetry", level: 90 },
    ],
  },
  {
    category: "Infrastructure",
    skills: [
      { name: "Docker/K8s", level: 80 },
      { name: "AWS", level: 85 },
      { name: "GCP", level: 70 },
      { name: "Terraform", level: 65 },
    ],
  },
  {
    category: "Data & Storage",
    skills: [
      { name: "ClickHouse", level: 75 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Kafka", level: 65 },
    ],
  },
];

export default function Resume() {
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
            /resume
          </span>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
              Resume
            </h1>
            <p className="mt-2 text-base text-neutral-500 dark:text-neutral-400">
              Professional timeline and skills
            </p>
          </div>
          <Link
            href="#"
            className="group inline-flex items-center gap-2 rounded-xl bg-[rgb(var(--accent))] px-5 py-3 font-mono text-sm font-medium text-white transition-all hover:bg-[rgb(var(--accent))]/90"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </Link>
        </div>
      </motion.div>

      <Section title="Experience">
        <div className="space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="group relative border-l-2 border-neutral-200 pl-8 dark:border-neutral-800"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[rgb(var(--accent))] bg-white transition-all group-hover:scale-125 dark:bg-neutral-950"
              />
              <span className="font-mono text-xs tracking-wider text-[rgb(var(--accent))]">
                {item.year}
              </span>
              <h3 className="mt-1 text-base font-medium text-neutral-800 dark:text-neutral-100">
                {item.role}
              </h3>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">{item.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <div className="grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.category} className="space-y-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
                {group.category}
              </h3>
              <div className="space-y-3">
                {group.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
