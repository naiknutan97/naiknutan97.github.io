export default function Section({
  id,
  index,
  title,
  children,
}: {
  id?: string;
  index?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-24 scroll-mt-24 grid gap-x-12 gap-y-6 lg:grid-cols-[13rem_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        {index && <p className="font-mono text-xs text-accent">{index}</p>}
        <h2 className="mt-1 font-display text-xl font-medium text-ink">{title}</h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function PageTitle({ path, title, intro }: { path?: string; title: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      {path && <p className="font-mono text-xs text-muted">~/{path}</p>}
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">{title}</h1>
      {intro && <p className="mt-5 text-lg leading-relaxed text-body">{intro}</p>}
    </div>
  );
}

// Quiet, readable tags: lowercase mono, hairline border.
export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s} className="rounded border border-line px-1.5 py-0.5 font-mono text-[11.5px] text-muted">
          {s.toLowerCase()}
        </li>
      ))}
    </ul>
  );
}
