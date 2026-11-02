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
      <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-baseline gap-2 text-[15px] font-semibold tracking-tight text-ink">
            Nutan Kumar Naik
            <span className="hidden font-mono text-xs font-normal text-muted sm:inline">@naiknutan97</span>
          </Link>
          <div className="flex items-center gap-4">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px]">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href) ? "text-accent" : "text-muted transition-colors hover:text-ink"
                    }
                  >
                    {isActive(link.href) && <span aria-hidden="true">./</span>}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden items-center gap-1 rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted transition-colors hover:border-muted hover:text-ink md:inline-flex"
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
