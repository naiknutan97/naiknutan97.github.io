"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandPalette from "@/components/CommandPalette";

const links = [
  { href: "/", label: "profile" },
  { href: "/projects/", label: "projects" },
  { href: "/publications/", label: "publications" },
  // Field Gallery (/gallery/) is hidden until its Drive photos are shared publicly.
  { href: "/resume/", label: "resume" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  // Ctrl/Cmd+K anywhere, or "/" when not typing, opens the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = !!t && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName ?? ""));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink font-mono text-xs font-bold text-paper">
              nk
            </span>
            <span className="hidden font-display text-sm font-medium text-ink sm:inline">nutan.kumar.naik</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="flex items-center font-mono text-[12.5px] sm:text-[13px]">
              {links.map((link) => (
                <li key={link.href} className={link.href === "/" ? "hidden sm:block" : undefined}>
                  <Link
                    href={link.href}
                    className={`rounded-md px-1.5 py-1.5 transition-colors sm:px-2.5 ${
                      isActive(link.href) ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {isActive(link.href) && <span className="text-accent">/</span>}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden items-center gap-1 rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:border-muted hover:text-ink md:inline-flex"
            >
              <kbd>Ctrl</kbd>
              <kbd>K</kbd>
            </button>
          </div>
        </nav>
      </header>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
