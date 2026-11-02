import type { Metadata } from "next";
import Section, { PageTitle } from "@/components/Section";
import { ArrowIcon } from "@/components/Icons";
import { articles, publications, type Publication } from "@/data/publications";

export const metadata: Metadata = { title: "Publications | Nutan Kumar Naik" };

function bibtex(pub: Publication) {
  const eprint = pub.venue.match(/arXiv:(\S+)/)?.[1] ?? "";
  const key = `naik${pub.year}${pub.title.split(/[^A-Za-z]/)[0].toLowerCase()}`;
  const authors = pub.authors.split(", ").join(" and ");
  return [
    `@misc{${key},`,
    `  title         = {${pub.title}},`,
    `  author        = {${authors}},`,
    `  year          = {${pub.year}},`,
    `  eprint        = {${eprint}},`,
    `  archivePrefix = {arXiv},`,
    `  primaryClass  = {cs.AI}`,
    `}`,
  ].join("\n");
}

export default function Publications() {
  return (
    <>
      <PageTitle
        path="publications"
        title="Publications"
        intro="Research on AI observability, governance and the assessment of AI agents, written with the Traccia team at Algen AI."
      />

      <Section index="01" title="Papers">
        <div className="space-y-6">
          {publications.map((pub) => (
            <article key={pub.title} className="rounded-xl border border-line bg-surface p-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-accent px-2 py-0.5 font-mono text-xs font-bold text-paper">
                  {pub.venue}
                </span>
                <span className="rounded border border-line px-2 py-0.5 font-mono text-xs font-bold text-mint">
                  {pub.year}
                </span>
              </div>
              <h3 className="mt-4 font-mono text-xl font-bold leading-snug text-mint">{pub.title}</h3>
              <p className="mt-2 text-sm text-muted">{pub.authors}</p>
              <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed">{pub.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm font-bold">
                {pub.links.map((l) => (
                  <a key={l.url} href={l.url} className="inline-flex items-center gap-0.5 text-accent hover:underline">
                    {l.label}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer select-none font-mono text-sm text-muted hover:text-accent">
                  $ cite --format=bibtex
                </summary>
                <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-panel p-4 font-mono text-[12.5px] leading-relaxed text-accent">
                  {bibtex(pub)}
                </pre>
              </details>
            </article>
          ))}
        </div>
      </Section>

      <Section index="02" title="Articles">
        <ul className="space-y-4">
          {articles.map((a) => (
            <li key={a.url} className="rounded-xl border border-line bg-surface p-5">
              <a href={a.url} className="font-mono text-lg font-bold leading-snug text-mint hover:text-accent">
                {a.title}
              </a>
              <p className="mt-1 font-mono text-xs uppercase text-muted">
                {a.outlet} // {a.date}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
