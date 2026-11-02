import type { Metadata } from "next";
import Section, { PageTitle, Tags } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { projects, research } from "@/data/projects";
import { getStars } from "@/lib/github";

export const metadata: Metadata = { title: "Projects | Nutan Kumar Naik" };

export default async function Projects() {
  const stars = await Promise.all(projects.map((p) => (p.repo ? getStars(p.repo, p.starsFallback) : undefined)));

  return (
    <>
      <PageTitle
        path="projects"
        title="Projects"
        intro="Open-source software for observing, evaluating and governing AI agents, and the research projects behind my geoscience work."
      />

      <Section index="01" title="Open source">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} stars={stars[i]} detailed />
          ))}
        </div>
        <a href={profile.github} className="mt-6 inline-block font-mono text-sm text-accent hover:underline">
          github.com/{profile.handle} →
        </a>
      </Section>

      <Section index="02" title="Research">
        <div className="divide-y divide-line">
          {research.map((r) => (
            <article key={r.name} className="py-6 first:pt-0">
              <h3 className="font-display text-base font-medium text-ink">{r.name}</h3>
              <p className="mt-0.5 text-xs text-muted">{r.role}</p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed">{r.summary}</p>
              <div className="mt-3">
                <Tags items={r.stack} />
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
