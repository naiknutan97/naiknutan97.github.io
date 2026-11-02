import type { Metadata } from "next";
import Section, { Chips, PageTitle } from "@/components/Section";
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

      <Section title="Open source">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} stars={stars[i]} detailed />
          ))}
        </div>
        <p className="mt-5 font-mono text-sm">
          <a href={profile.github} className="text-accent hover:underline">
            github.com/{profile.handle} →
          </a>
        </p>
      </Section>

      <Section title="Research">
        <div className="space-y-6">
          {research.map((r) => (
            <div key={r.name}>
              <h3 className="font-semibold text-ink">{r.name}</h3>
              <p className="text-xs text-muted">{r.role}</p>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink">{r.summary}</p>
              <div className="mt-3">
                <Chips items={r.stack} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
