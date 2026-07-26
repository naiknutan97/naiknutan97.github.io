"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Typewriter from "./Typewriter";
import CountUp from "./CountUp";
import Magnetic from "./Magnetic";
import AnimatedName from "./AnimatedName";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const orb1Y = useTransform(scrollY, [0, 500], [0, -80]);
  const orb2Y = useTransform(scrollY, [0, 500], [0, 60]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden">
      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        animate={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(var(--accent),0.04), transparent 60%)`,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Mesh gradient background with parallax */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--accent),0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(var(--accent),0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--accent),0.03),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(var(--accent),1) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--accent),1) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      {/* Parallax orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: orb1Y }}
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(var(--accent),0.06),transparent_70%)]"
        />
        <motion.div
          style={{ y: orb2Y }}
          animate={{ x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: -4 }}
          className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(var(--accent),0.05),transparent_70%)]"
        />
        <motion.div
          animate={{ y: [-30, 30, -30], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: -8 }}
          className="absolute top-1/3 left-1/3 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(var(--accent),0.04),transparent_70%)]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Avatar with animated ring */}
        <motion.div variants={itemVariants} className="group relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,rgb(var(--accent)),transparent_30%,transparent_70%,rgb(var(--accent)))] opacity-50 blur-[2px]"
          />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[rgb(var(--accent))]/20 bg-neutral-100 dark:bg-neutral-900">
            <span className="text-3xl font-bold text-[rgb(var(--accent))]">NKN</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
        >
          <AnimatedName />
        </motion.h1>

        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--accent))]/20 bg-[rgb(var(--accent-bg))] px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[rgb(var(--accent))]" />
          <span className="font-mono text-xs tracking-wider text-[rgb(var(--accent))]">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Typing role */}
        <motion.div variants={itemVariants} className="mt-4 h-8">
          <Typewriter
            words={[
              "AI/ML Engineer",
              "Agentic AI Developer",
              "AI Governance Researcher",
              "OpenTelemetry Advocate",
            ]}
            className="text-xl text-neutral-500 dark:text-neutral-400 sm:text-2xl"
          />
        </motion.div>

        {/* Role badges */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {["Agentic AI", "AI Observability", "AI Governance"].map((role) => (
            <span
              key={role}
              className="rounded-lg border border-neutral-200 bg-neutral-100/80 px-3 py-1 font-mono text-xs text-neutral-600 dark:border-neutral-700/50 dark:bg-neutral-800/80 dark:text-neutral-300"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-lg"
        >
          Building observable, reliable AI systems at the intersection of
          machine learning, agentic architectures, and infrastructure. Focused
          on production-grade AI with OpenTelemetry-native observability and
          responsible governance.
        </motion.p>

        {/* CTA with magnetic effect */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Magnetic strength={0.2}>
            <Link
              href="mailto:hello@example.com"
              className="group relative block overflow-hidden rounded-xl px-6 py-3 font-mono text-sm font-medium text-white transition-all"
            >
              <span className="absolute inset-0 bg-[rgb(var(--accent))] transition-all group-hover:scale-105" />
              <span
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  boxShadow:
                    "0 0 20px rgba(var(--accent),0.3),0 0 40px rgba(var(--accent),0.1)",
                }}
              />
              <span className="relative z-10">Get in touch</span>
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link
              href="/resume"
              className="group relative block overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100/80 px-6 py-3 font-mono text-sm font-medium text-neutral-600 transition-all hover:border-neutral-300 hover:text-neutral-700 dark:border-neutral-700/50 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
            >
              View Resume
            </Link>
          </Magnetic>
        </motion.div>

        {/* Animated metrics */}
        <motion.div
          variants={itemVariants}
          className="mt-14 flex gap-8 divide-x divide-neutral-200 dark:divide-neutral-800"
        >
          {[
            { end: 4, suffix: "+", label: "Years AI/ML" },
            { end: 8, suffix: "+", label: "Publications" },
            { end: 12, suffix: "+", label: "Open Source" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center px-4 first:pl-0 last:pr-0">
              <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                <CountUp end={m.end} suffix={m.suffix} duration={2500} />
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {m.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Social with magnetic */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center gap-6"
        >
          {[
            {
              href: "https://github.com",
              label: "GitHub",
              path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
            },
            {
              href: "https://linkedin.com",
              label: "LinkedIn",
              path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
            },
            {
              href: "https://scholar.google.com",
              label: "Google Scholar",
              path: "M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z",
            },
            {
              href: "mailto:hello@example.com",
              label: "Email",
              path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            },
          ].map((social) => (
            <Magnetic key={social.label} strength={0.4}>
              <Link
                href={social.href}
                target="_blank"
                className="group relative block"
                aria-label={social.label}
              >
                <span className="absolute -inset-2 rounded-full bg-[rgb(var(--accent))]/0 transition-all duration-300 group-hover:bg-[rgb(var(--accent))]/10" />
                <svg
                  className="relative h-5 w-5 text-neutral-400 transition-all duration-300 group-hover:text-[rgb(var(--accent))] dark:text-neutral-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={social.path} />
                </svg>
              </Link>
            </Magnetic>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Scroll
          </span>
          <svg className="h-3 w-3 text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
