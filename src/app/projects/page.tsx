import type { Metadata } from "next";
import Section, { Chips, PageTitle } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { tileColors } from "@/components/Pixels";
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

      <Section index="01" title="Open Source">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              stars={stars[i]}
              color={tileColors[i % tileColors.length]}
              seed={i + 11}
              detailed
            />
          ))}
        </div>
        <p className="mt-6 font-mono text-sm font-bold">
          <a href={profile.github} className="text-accent hover:underline">
            git remote -v → github.com/{profile.handle}
          </a>
        </p>
      </Section>

      <Section index="02" title="Research">
        <div className="grid gap-5 md:grid-cols-2">
          {research.map((r) => (
            <div key={r.name} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-mono text-lg font-bold text-mint">{r.name}</h3>
              <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-muted">{r.role}</p>
              <p className="mt-3 text-[15px] leading-relaxed">{r.summary}</p>
              <div className="mt-4">
                <Chips items={r.stack} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
