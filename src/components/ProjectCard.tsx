import { Chips } from "@/components/Section";
import { ArrowIcon, StarIcon } from "@/components/Icons";
import { PixelBars, PixelGrid } from "@/components/Pixels";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  stars,
  color,
  seed,
  detailed = false,
}: {
  project: Project;
  stars?: number;
  color: string;
  seed: number;
  detailed?: boolean;
}) {
  const primary = project.links[0];
  const Art = seed % 2 ? PixelBars : PixelGrid;
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent">
      <div className="relative h-24 bg-panel">
        <Art color={color} seed={seed} className="absolute inset-0 h-full w-full" />
        {!!stars && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded bg-panel/90 px-2 py-0.5 font-mono text-xs font-bold text-[#f2c94c]">
            <StarIcon className="h-3.5 w-3.5" />
            {stars}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-mono text-lg font-bold text-mint">
          <a href={primary.url} className="hover:text-accent">
            {project.name}
          </a>
        </h3>
        <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-muted">{project.role}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-body">{project.summary}</p>
        {detailed && (
          <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed">
            {project.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="font-mono text-accent">›</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <Chips items={project.stack} variant="solid" />
        </div>
        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5 font-mono text-sm">
          {project.links.map((l) => (
            <a key={l.url} href={l.url} className="inline-flex items-center gap-0.5 text-accent hover:underline">
              {l.label}
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          ))}
        </p>
      </div>
    </article>
  );
}
