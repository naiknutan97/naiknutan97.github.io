"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBackground, BackgroundStyle, BackgroundConfig } from "@/providers/BackgroundProvider";
import { useState } from "react";

const STYLE_LABELS: Record<BackgroundStyle, string> = {
  neural: "Neural Net",
  aurora: "Aurora Waves",
  constellation: "Constellation",
  mesh: "Morphing Mesh",
  orbs: "Floating Orbs",
  rain: "Matrix Rain",
  swirl: "Swirl",
};

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">{label}</span>
        <span className="font-mono text-[10px] text-neutral-500">{step && step < 1 ? value.toFixed(1) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-[rgb(var(--accent))] dark:bg-neutral-700"
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-4 w-7 rounded-full transition-colors ${value ? "bg-[rgb(var(--accent))]" : "bg-neutral-300 dark:bg-neutral-600"}`}
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${value ? "translate-x-3.5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

export default function BackgroundSettings() {
  const { config, setStyle, updateSettings, reset } = useBackground();
  const [open, setOpen] = useState(false);

  const renderStyleControls = () => {
    const style = config.style;

    if (style === "neural") {
      const s = config.neural;
      return (
        <div className="space-y-3">
          <Slider label="Density" value={s.count} min={20} max={100} step={5} onChange={(v) => updateSettings("neural", { count: v })} />
          <Slider label="Connection Range" value={s.connectionDist} min={50} max={300} step={10} onChange={(v) => updateSettings("neural", { connectionDist: v })} />
          <Slider label="Speed" value={s.speed} min={0.1} max={3} step={0.1} onChange={(v) => updateSettings("neural", { speed: v })} />
          <Slider label="Node Opacity" value={s.nodeOpacity} min={0.1} max={1} step={0.05} onChange={(v) => updateSettings("neural", { nodeOpacity: v })} />
          <Slider label="Connection Opacity" value={s.connectOpacity} min={0.05} max={0.5} step={0.05} onChange={(v) => updateSettings("neural", { connectOpacity: v })} />
          <Toggle label="Cursor Interaction" value={s.cursorInteract} onChange={(v) => updateSettings("neural", { cursorInteract: v })} />
          <Toggle label="Click Burst" value={s.clickBurst} onChange={(v) => updateSettings("neural", { clickBurst: v })} />
        </div>
      );
    }

    if (style === "aurora") {
      const s = config.aurora;
      return (
        <div className="space-y-3">
          <Slider label="Wave Count" value={s.waveCount} min={1} max={6} step={1} onChange={(v) => updateSettings("aurora", { waveCount: v })} />
          <Slider label="Speed" value={s.speed} min={0.5} max={5} step={0.1} onChange={(v) => updateSettings("aurora", { speed: v })} />
          <Slider label="Wave Height" value={s.height} min={20} max={200} step={10} onChange={(v) => updateSettings("aurora", { height: v })} />
          <Slider label="Opacity" value={s.opacity} min={0.1} max={1} step={0.05} onChange={(v) => updateSettings("aurora", { opacity: v })} />
          <Toggle label="Blend Colors" value={s.blendColor} onChange={(v) => updateSettings("aurora", { blendColor: v })} />
        </div>
      );
    }

    if (style === "constellation") {
      const s = config.constellation;
      return (
        <div className="space-y-3">
          <Slider label="Star Count" value={s.starCount} min={10} max={50} step={5} onChange={(v) => updateSettings("constellation", { starCount: v })} />
          <Slider label="Twinkle Speed" value={s.twinkleSpeed} min={0.5} max={3} step={0.1} onChange={(v) => updateSettings("constellation", { twinkleSpeed: v })} />
          <Slider label="Connection Range" value={s.connectDist} min={50} max={300} step={10} onChange={(v) => updateSettings("constellation", { connectDist: v })} />
          <Slider label="Star Opacity" value={s.starOpacity} min={0.1} max={1} step={0.05} onChange={(v) => updateSettings("constellation", { starOpacity: v })} />
          <Toggle label="Shooting Stars" value={s.shootingStars} onChange={(v) => updateSettings("constellation", { shootingStars: v })} />
        </div>
      );
    }

    if (style === "mesh") {
      const s = config.mesh;
      return (
        <div className="space-y-3">
          <Slider label="Grid Resolution" value={s.resolution} min={4} max={20} step={1} onChange={(v) => updateSettings("mesh", { resolution: v })} />
          <Slider label="Speed" value={s.speed} min={0.5} max={3} step={0.1} onChange={(v) => updateSettings("mesh", { speed: v })} />
          <Slider label="Amplitude" value={s.amplitude} min={10} max={100} step={5} onChange={(v) => updateSettings("mesh", { amplitude: v })} />
          <Slider label="Opacity" value={s.opacity} min={0.1} max={1} step={0.05} onChange={(v) => updateSettings("mesh", { opacity: v })} />
        </div>
      );
    }

    if (style === "orbs") {
      const s = config.orbs;
      return (
        <div className="space-y-3">
          <Slider label="Orb Count" value={s.orbCount} min={2} max={8} step={1} onChange={(v) => updateSettings("orbs", { orbCount: v })} />
          <Slider label="Max Size" value={s.maxSize} min={50} max={300} step={20} onChange={(v) => updateSettings("orbs", { maxSize: v })} />
          <Slider label="Speed" value={s.speed} min={0.5} max={3} step={0.1} onChange={(v) => updateSettings("orbs", { speed: v })} />
          <Slider label="Opacity" value={s.opacity} min={0.05} max={0.5} step={0.05} onChange={(v) => updateSettings("orbs", { opacity: v })} />
        </div>
      );
    }

    if (style === "rain") {
      const s = config.rain;
      return (
        <div className="space-y-3">
          <Slider label="Density" value={s.density} min={0.3} max={3} step={0.1} onChange={(v) => updateSettings("rain", { density: v })} />
          <Slider label="Speed" value={s.speed} min={0.5} max={3} step={0.1} onChange={(v) => updateSettings("rain", { speed: v })} />
          <Slider label="Char Size" value={s.charSize} min={8} max={24} step={1} onChange={(v) => updateSettings("rain", { charSize: v })} />
          <Slider label="Opacity" value={s.opacity} min={0.1} max={1} step={0.05} onChange={(v) => updateSettings("rain", { opacity: v })} />
        </div>
      );
    }

    if (style === "swirl") {
      const s = config.swirl;
      return (
        <div className="space-y-3">
          <Slider label="Particle Count" value={s.density} min={20} max={200} step={10} onChange={(v) => updateSettings("swirl", { density: v })} />
          <Slider label="Speed" value={s.speed} min={0.5} max={3} step={0.1} onChange={(v) => updateSettings("swirl", { speed: v })} />
          <Slider label="Particle Size" value={s.particleSize} min={0.5} max={4} step={0.5} onChange={(v) => updateSettings("swirl", { particleSize: v })} />
          <Slider label="Opacity" value={s.opacity} min={0.1} max={1} step={0.05} onChange={(v) => updateSettings("swirl", { opacity: v })} />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-200"
        aria-label="Background settings"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Settings drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[9999] h-full w-72 overflow-y-auto border-l border-neutral-200 bg-white/95 p-5 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/95"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">Background</h3>
                <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Style selector */}
              <div className="mb-5 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Style</span>
                <div className="mt-1 grid grid-cols-1 gap-1">
                  {(Object.keys(STYLE_LABELS) as BackgroundStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => setStyle(style)}
                      className={`rounded-lg px-3 py-1.5 text-left font-mono text-xs transition-all ${
                        config.style === style
                          ? "bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]"
                          : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {STYLE_LABELS[style]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Per-style controls */}
              <div className="mb-5 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                {renderStyleControls()}
              </div>

              {/* Reset */}
              <button
                onClick={reset}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-neutral-400 transition-colors hover:border-neutral-300 hover:text-neutral-600 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:text-neutral-300"
              >
                Reset to Defaults
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
