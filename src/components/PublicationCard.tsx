import { Publication } from "@/data/publications";

const typeConfig: Record<string, { label: string; style: string }> = {
  conference: {
    label: "Conference",
    style: "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",
  },
  journal: {
    label: "Journal",
    style: "border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400",
  },
  preprint: {
    label: "Preprint",
    style: "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
  },
};

export default function PublicationCard({ pub }: { pub: Publication }) {
  const config = typeConfig[pub.type] ?? typeConfig.preprint;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/80 card-hover dark:border-neutral-800/50 dark:bg-neutral-900/80"
    >
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[rgb(var(--accent))]/5 to-transparent" />
      </div>

      <div className="relative p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${config.style}`}>
            {config.label}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">{pub.year}</span>
          <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <h3 className="text-base font-medium text-neutral-800 transition-colors group-hover:text-[rgb(var(--accent))] dark:text-neutral-100 dark:group-hover:text-[rgb(var(--accent))]">
          {pub.title}
        </h3>

        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
          {pub.authors}
        </p>

        <p className="mt-1 text-sm italic text-neutral-500/80 dark:text-neutral-400/80">
          {pub.venue}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {pub.abstract}
        </p>

        {pub.link && (
          <a
            href={pub.link}
            target="_blank"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[rgb(var(--accent))] transition-colors hover:text-[rgb(var(--accent))]/80"
          >
            View paper
            <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
