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

      <Section title="Papers">
        <div className="space-y-10">
          {publications.map((pub) => (
            <article key={pub.title}>
              <p className="font-mono text-xs text-accent">
                {pub.venue} · {pub.year}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink">{pub.title}</h3>
              <p className="mt-1 text-sm text-muted">{pub.authors}</p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink">{pub.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
                {pub.links.map((l) => (
                  <a key={l.url} href={l.url} className="inline-flex items-center gap-0.5 text-accent hover:underline">
                    {l.label}
                    <ArrowIcon className="h-3 w-3" />
                  </a>
                ))}
              </div>
              <details className="group mt-3">
                <summary className="cursor-pointer select-none font-mono text-xs text-muted hover:text-ink">
                  BibTeX
                </summary>
                <pre className="mt-2 overflow-x-auto rounded-lg border border-panel-line bg-panel p-4 font-mono text-[12px] leading-relaxed text-panel-ink">
                  {bibtex(pub)}
                </pre>
              </details>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Articles">
        <ul className="space-y-4">
          {articles.map((a) => (
            <li key={a.url}>
              <a href={a.url} className="font-medium text-ink hover:text-accent hover:underline">
                {a.title}
              </a>
              <p className="font-mono text-xs text-muted">
                {a.outlet} · {a.date}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
