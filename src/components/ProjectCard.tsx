import { Chips } from "@/components/Section";
import { ArrowIcon, StarIcon } from "@/components/Icons";
import type { Project } from "@/data/projects";

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
    <article className="flex min-w-0 flex-col rounded-lg border border-line p-5 transition-colors hover:border-muted">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-mono text-[15px] font-semibold text-ink">
            <a href={primary.url} className="hover:text-accent">
              {project.name}
            </a>
          </h3>
          <p className="mt-0.5 text-xs text-muted">{project.role}</p>
        </div>
        {!!stars && (
          <span className="flex shrink-0 items-center gap-1 rounded border border-line px-1.5 py-0.5 font-mono text-xs text-muted">
            <StarIcon className="h-3.5 w-3.5" />
            {stars}
          </span>
        )}
      </div>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink">{project.summary}</p>
      {detailed && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed marker:text-muted">
          {project.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <Chips items={project.stack} />
      </div>
      <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 font-mono text-xs">
        {project.links.map((l) => (
          <a key={l.url} href={l.url} className="inline-flex items-center gap-0.5 text-accent hover:underline">
            {l.label}
            <ArrowIcon className="h-3 w-3" />
          </a>
        ))}
      </p>
    </article>
  );
}
