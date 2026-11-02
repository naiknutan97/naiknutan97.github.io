export default function Section({
  index,
  title,
  children,
}: {
  index?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
      <h2 className="flex items-center gap-4 font-mono text-2xl font-bold uppercase text-mint sm:text-3xl">
        {index && <span className="font-pixel text-base font-normal text-accent">{index}</span>}
        <span className="shrink-0">{title}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function PageTitle({ path, title, intro }: { path?: string; title: string; intro?: string }) {
  return (
    <div>
      {path && (
        <p className="font-mono text-sm text-muted">
          <span className="text-accent">~</span>/{path} <span className="cursor text-accent">▍</span>
        </p>
      )}
      <h1 className="mt-3 font-pixel text-4xl uppercase text-mint sm:text-6xl">{title}</h1>
      {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">{intro}</p>}
    </div>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9.+]+/g, "-").replace(/^-|-$/g, "");

// Hashtag labels. "solid" is the neon tag; "outline" suits long lists.
export function Chips({ items, variant = "outline" }: { items: string[]; variant?: "solid" | "outline" }) {
  const cls =
    variant === "solid"
      ? "bg-accent text-paper"
      : "border border-line bg-surface text-mint hover:border-accent";
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className={`rounded px-2 py-0.5 font-mono text-xs font-bold uppercase ${cls}`}>
          #{slug(s)}
        </li>
      ))}
    </ul>
  );
}
