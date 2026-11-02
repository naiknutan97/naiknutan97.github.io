"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Profile" },
  { href: "/publications/", label: "Publications" },
  // Field Gallery (/gallery/) is hidden until its Drive photos are shared publicly.
  { href: "/resume/", label: "Resume" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink">
          Nutan Kumar Naik
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isActive(link.href)
                    ? "font-medium text-accent"
                    : "text-muted transition-colors hover:text-ink"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
