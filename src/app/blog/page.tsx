"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blog";

export default function Blog() {
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
            /blog
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
          Technical articles on agentic AI, OpenTelemetry, AI governance, LLM
          engineering, and machine learning research.
        </p>
      </motion.div>

      <Section title="Latest Articles">
        <div className="grid gap-5 sm:grid-cols-2">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
