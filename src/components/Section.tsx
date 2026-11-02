export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="border-b border-line pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      {intro && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
