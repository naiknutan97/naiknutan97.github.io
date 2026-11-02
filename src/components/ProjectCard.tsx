import { Tags } from "@/components/Section";
import { ArrowIcon, StarIcon } from "@/components/Icons";
import type { Project } from "@/data/projects";

const langColor = { Python: "#3572A5", TypeScript: "#3178c6" };

export default function ProjectCard({
  project,
  stars,
  detailed = false,
}: {
  project: Project;
  stars?: number;
  detailed?: boolean;
}) {
  const primary = project.links[0];
  return (
    <article className="group relative flex min-w-0 flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent">
      <div className="flex items-center justify-between gap-3 font-mono text-[11.5px] text-muted">
        <span className="min-w-0 truncate">{project.repo ?? project.name}</span>
        {!!stars && (
          <span className="flex shrink-0 items-center gap-1">
            <StarIcon className="h-3.5 w-3.5" />
            {stars}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-display text-base font-medium text-ink">
        <a href={primary.url} className="after:absolute after:inset-0 group-hover:text-accent">
          {project.name}
        </a>
      </h3>
      <p className="mt-0.5 text-xs text-muted">{project.role}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-body">{project.summary}</p>
      {detailed && (
        <ul className="mt-3 space-y-1.5 text-[14.5px] leading-relaxed">
          {project.points.map((p) => (
            <li key={p} className="flex gap-2.5">
              <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <Tags items={project.stack} />
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <span className="flex items-center gap-3 font-mono text-[11.5px] text-muted">
          {project.lang.map((l) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColor[l] }} />
              {l}
            </span>
          ))}
        </span>
        <span className="relative z-10 flex flex-wrap gap-x-3 font-mono text-xs">
          {project.links.map((l) => (
            <a key={l.url} href={l.url} className="inline-flex items-center gap-0.5 text-accent hover:underline">
              {l.label}
              <ArrowIcon className="h-3 w-3" />
            </a>
          ))}
        </span>
      </div>
    </article>
  );
}
