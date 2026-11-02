"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/data/profile";

type Command = { label: string; hint: string; run: () => void };

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(() => {
    const go = (href: string) => () => router.push(href);
    const open = (url: string) => () => window.open(url, "_blank", "noopener");
    return [
      { label: "Profile", hint: "page", run: go("/") },
      { label: "Projects", hint: "page", run: go("/projects/") },
      { label: "Publications", hint: "page", run: go("/publications/") },
      { label: "Resume", hint: "page", run: go("/resume/") },
      { label: "Experience", hint: "section", run: go("/#experience") },
      { label: "Skills", hint: "section", run: go("/#skills") },
      { label: "Education", hint: "section", run: go("/#education") },
      { label: "Download resume (PDF)", hint: "file", run: () => (window.location.href = profile.resumePdf) },
      { label: "GitHub", hint: "link", run: open(profile.github) },
      { label: "LinkedIn", hint: "link", run: open(profile.linkedin) },
      { label: "Send an email", hint: "mailto", run: () => (window.location.href = `mailto:${profile.email}`) },
      {
        label: "Copy email address",
        hint: "clipboard",
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => setCopied(true));
        },
      },
      { label: "View page source", hint: "link", run: open(profile.source) },
    ];
  }, [router]);

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setCopied(false);
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [open]);

  if (!open) return null;

  const run = (c?: Command) => {
    if (!c) return;
    c.run();
    if (c.hint !== "clipboard") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[16vh] backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span className="font-mono text-sm text-accent">&gt;</span>
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                run(results[active]);
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="Jump to a page, section or link…"
            className="h-12 w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-line px-1.5 font-mono text-[10px] text-muted">esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.map((c, i) => (
            <li key={c.label}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => run(c)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm ${
                  i === active ? "bg-accent text-accent-ink" : "text-ink"
                }`}
              >
                <span>{c.hint === "clipboard" && copied ? "Copied ✓" : c.label}</span>
                <span className={`font-mono text-[11px] ${i === active ? "opacity-80" : "text-muted"}`}>{c.hint}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-6 text-center font-mono text-sm text-muted">no matches</li>}
        </ul>
      </div>
    </div>
  );
}
