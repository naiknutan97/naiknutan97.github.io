"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GitHubIcon } from "@/components/Icons";
import { profile } from "@/data/profile";

const links = [
  { href: "/", label: "Profile", key: "1" },
  { href: "/projects/", label: "Projects", key: "2" },
  { href: "/publications/", label: "Publications", key: "3" },
  // Field Gallery (/gallery/) is hidden until its Drive photos are shared publicly.
  { href: "/resume/", label: "Resume", key: "4" },
];

// 4x5 pixel glyphs for the "NK" mark.
const N = ["1001", "1101", "1011", "1001", "1001"];
const K = ["1001", "1010", "1100", "1010", "1001"];

function Logo() {
  const cells: [number, number][] = [];
  [N, K].forEach((glyph, gi) =>
    glyph.forEach((row, y) => [...row].forEach((c, x) => c === "1" && cells.push([x + gi * 5, y]))),
  );
  return (
    <svg viewBox="-1 -1 11 7" shapeRendering="crispEdges" aria-hidden="true" className="h-7 w-11">
      <rect x="-1" y="-1" width="11" height="7" fill="var(--paper)" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--accent)" />
      ))}
    </svg>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  // Keys 1-4 jump between pages, unless the visitor is typing somewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      const hit = links.find((l) => l.key === e.key);
      if (hit) router.push(hit.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <header className="sticky top-0 z-20">
      <div className="bg-accent">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3 text-paper">
            <Logo />
            <span className="font-pixel text-lg leading-none sm:text-xl">Nutan Kumar Naik</span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              aria-label="GitHub"
              className="inline-flex items-center gap-1.5 rounded-md bg-surface-2 px-3 py-1.5 text-sm font-bold text-ink hover:bg-line"
            >
              <GitHubIcon />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={profile.resumePdf}
              className="rounded-md bg-surface-2 px-3 py-1.5 text-sm font-bold text-ink hover:bg-line"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
      <nav className="border-b border-line bg-mid">
        <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-7 gap-y-1 px-4 py-2 font-mono text-[13px] font-bold uppercase sm:px-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`inline-flex items-center gap-1.5 ${
                  isActive(link.href) ? "text-paper" : "text-white/85 hover:text-paper"
                }`}
              >
                <kbd className="hidden rounded-sm border border-current px-1 text-[10px] leading-4 sm:inline">
                  {link.key}
                </kbd>
                {isActive(link.href) ? `> ${link.label}` : link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
