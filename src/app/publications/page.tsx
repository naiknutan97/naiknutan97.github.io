import type { Metadata } from "next";
import Section, { PageTitle } from "@/components/Section";
import { articles, publications } from "@/data/publications";

export const metadata: Metadata = { title: "Publications | Nutan Kumar Naik" };

export default function Publications() {
  return (
    <>
      <PageTitle
        title="Publications"
        intro="Research on AI observability, governance and the assessment of AI agents, written with the Traccia team at Algen AI."
      />

      <Section title="Papers">
        <div className="space-y-8">
          {publications.map((pub) => (
            <article key={pub.title}>
              <h3 className="font-medium leading-snug text-ink">{pub.title}</h3>
              <p className="mt-1 text-sm text-muted">{pub.authors}</p>
              <p className="text-sm text-muted">
                {pub.venue}, {pub.year}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">{pub.summary}</p>
              <p className="mt-2 flex gap-4 text-sm">
                {pub.links.map((l) => (
                  <a key={l.url} href={l.url} className="text-accent hover:underline">
                    {l.label}
                  </a>
                ))}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Articles">
        <ul className="space-y-3">
          {articles.map((a) => (
            <li key={a.url}>
              <a href={a.url} className="font-medium text-ink hover:text-accent hover:underline">
                {a.title}
              </a>
              <p className="text-sm text-muted">
                {a.outlet}, {a.date}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
