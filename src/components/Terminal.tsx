import { coreStack, now } from "@/data/profile";

function Prompt({ cmd }: { cmd?: string }) {
  return (
    <p>
      <span className="text-accent">nutan@naik</span>
      <span className="text-muted">:</span>
      <span className="text-[#58a6ff]">~</span>
      <span className="text-muted">$</span>{" "}
      {cmd ? <span className="text-ink">{cmd}</span> : <span className="cursor text-accent">█</span>}
    </p>
  );
}

export default function Terminal() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-[0_0_0_1px_rgba(99,255,134,0.08),0_20px_60px_-20px_rgba(99,255,134,0.25)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#f85149]" />
        <span className="h-3 w-3 rounded-full bg-[#f2c94c]" />
        <span className="h-3 w-3 rounded-full bg-accent" />
        <span className="ml-3 font-mono text-xs text-muted">bash — 80×24</span>
      </div>
      <div className="space-y-1.5 px-5 py-5 font-mono text-[13px] leading-relaxed text-body">
        <Prompt cmd="whoami" />
        <p className="text-mint">nutan-kumar-naik // ai-ml-engineer + geoscientist</p>
        <div className="pt-2">
          <Prompt cmd="cat now.md" />
        </div>
        <ul className="space-y-0.5">
          {now.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="text-accent">[+]</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <Prompt cmd="ls ./stack" />
        </div>
        <p className="flex flex-wrap gap-x-4 text-[#58a6ff]">
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
