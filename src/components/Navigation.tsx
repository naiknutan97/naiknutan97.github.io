"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import AccentPicker from "./AccentPicker";
import BackgroundSettings from "./BackgroundSettings";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setAtTop(current < 20);
      setHidden(current > 80 && current > lastScroll + 5);
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={`flex w-full max-w-2xl items-center justify-between rounded-2xl border px-4 py-2 transition-all duration-300 ${
          atTop
            ? "border-transparent bg-transparent"
            : "border-neutral-200/80 bg-white/70 shadow-sm backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-900/70 dark:shadow-neutral-900/50"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgb(var(--accent))]/10 text-xs font-bold text-[rgb(var(--accent))] transition-all hover:bg-[rgb(var(--accent))]/20">
            NK
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "text-[rgb(var(--accent))]"
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-[rgb(var(--accent-bg))]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          <span className="mx-2 h-4 w-px bg-neutral-200 dark:bg-neutral-700" />

          <ThemeToggle />
          <AccentPicker />
          <BackgroundSettings />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <AccentPicker />
          <BackgroundSettings />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            aria-label="Toggle menu"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-16 mx-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-neutral-200 bg-white/95 p-3 shadow-lg backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-900/95 md:hidden"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-[rgb(var(--accent-bg))] text-[rgb(var(--accent))]"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
