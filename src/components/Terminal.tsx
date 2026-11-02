import { coreStack, now } from "@/data/profile";

function Prompt({ cmd }: { cmd?: string }) {
  return (
    <p>
      <span className="text-prompt">~</span> <span className="text-panel-muted">$</span>{" "}
      {cmd ? <span className="text-panel-ink">{cmd}</span> : <span className="cursor text-panel-ink">▍</span>}
    </p>
  );
}

export default function Terminal() {
  return (
    <div className="overflow-hidden rounded-lg border border-panel-line bg-panel shadow-sm">
      <div className="flex items-center justify-between border-b border-panel-line px-4 py-2">
        <span className="font-mono text-[11px] text-panel-muted">nutan@naik: ~</span>
        <span className="font-mono text-[11px] text-panel-muted">zsh</span>
      </div>
      <div className="space-y-1.5 px-4 py-4 font-mono text-[12.5px] leading-relaxed text-panel-ink">
        <Prompt cmd="whoami" />
        <p className="text-panel-muted">nutan-kumar-naik · ai/ml engineer · geoscientist</p>
        <div className="pt-2">
          <Prompt cmd="cat now.md" />
        </div>
        <ul className="space-y-0.5">
          {now.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="text-prompt">›</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <Prompt cmd="ls stack/" />
        </div>
        <p className="flex flex-wrap gap-x-4 text-[#79c0ff]">
          {coreStack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <div className="pt-2">
          <Prompt />
        </div>
      </div>
    </div>
  );
}
