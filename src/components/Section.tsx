export default function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-20 grid gap-x-10 gap-y-5 border-t border-line pt-8 md:grid-cols-[11rem_1fr]">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function PageTitle({ path, title, intro }: { path?: string; title: string; intro?: string }) {
  return (
    <div>
      {path && <p className="font-mono text-xs text-muted">~/{path}</p>}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s} className="rounded border border-line bg-chip px-2 py-0.5 font-mono text-[11.5px] text-muted">
          {s}
        </li>
      ))}
    </ul>
  );
}
