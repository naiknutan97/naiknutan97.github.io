import { NOW, trace } from "@/data/profile";

// A trace-viewer rendering of the career: one root span, child spans, and span events.
const pct = (year: number) => ((year - trace.start) / (trace.end - trace.start)) * 100;
const years = Array.from({ length: trace.end - trace.start + 1 }, (_, i) => trace.start + i);
const fmt = (from: number, to: number) =>
  `${Math.floor(from)}–${to === NOW ? "now" : Math.floor(to)}`;

function Row({ name, attr, children }: { name: string; attr: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-center gap-x-3 gap-y-1 sm:grid-cols-[14rem_1fr]">
      <div className="min-w-0 truncate font-mono text-[11.5px]">
        <span className="text-panel-ink">{name}</span> <span className="text-panel-muted">{attr}</span>
      </div>
      <div className="relative h-5">{children}</div>
    </div>
  );
}

export default function CareerTrace() {
  return (
    <figure className="overflow-hidden rounded-xl border border-panel-line bg-panel">
      <figcaption className="flex items-center justify-between border-b border-panel-line px-4 py-2.5 font-mono text-[11px] text-panel-muted">
        <span>
          trace <span className="text-panel-ink">nutan.career</span>
        </span>
        <span>
          {trace.spans.length} spans · {trace.events.length} events
        </span>
      </figcaption>

      <div className="space-y-2 px-4 py-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[14rem_1fr]">
          <span className="hidden sm:block" />
          <div className="relative h-4 font-mono text-[10px] text-panel-muted">
            {years
              .filter((y) => y % 2 === 0)
              .map((y) => (
                <span key={y} className="absolute -translate-x-1/2" style={{ left: `${pct(y)}%` }}>
                  {String(y).slice(2)}
                </span>
              ))}
          </div>
        </div>

        <Row name="career" attr="root">
          <div
            className="absolute inset-y-1 rounded-sm"
            style={{ left: 0, width: `${pct(NOW)}%`, background: "rgba(141, 138, 131, 0.35)" }}
          />
        </Row>

        {trace.spans.map((s) => (
          <Row key={s.name} name={s.name} attr={s.attr}>
            <div
              className="absolute inset-y-0.5 flex items-center justify-end rounded-sm bg-panel-accent px-1.5"
              style={{ left: `${pct(s.from)}%`, width: `${pct(s.to) - pct(s.from)}%` }}
            >
              <span className="whitespace-nowrap font-mono text-[10px] font-bold text-[#1a1206]">{fmt(s.from, s.to)}</span>
            </div>
          </Row>
        ))}

        {trace.events.map((e) => (
          <Row key={e.name} name={e.name} attr={e.attr}>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center">
              <span className="h-px w-full bg-panel-line" />
            </div>
            <span
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-panel-data"
              style={{ left: `${pct(e.at)}%` }}
            />
          </Row>
        ))}

        <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-[14rem_1fr]">
          <span className="hidden sm:block" />
          <div className="relative h-3">
            <span className="absolute inset-y-0 w-px bg-panel-accent" style={{ left: `${pct(NOW)}%` }} />
            <span
              className="absolute -translate-x-full pr-1.5 font-mono text-[10px] text-panel-accent"
              style={{ left: `${pct(NOW)}%` }}
            >
              now
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
