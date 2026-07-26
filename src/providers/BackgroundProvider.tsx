"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";

const ACCENT_RGB: Record<string, [number, number, number]> = {
  cyan: [6, 182, 212],
  emerald: [16, 185, 129],
  violet: [139, 92, 246],
  amber: [245, 158, 11],
  rose: [244, 63, 94],
  blue: [59, 130, 246],
};

export type BackgroundStyle = "neural" | "aurora" | "constellation" | "mesh" | "orbs" | "rain" | "swirl";

export interface NeuralSettings {
  count: number;
  connectionDist: number;
  speed: number;
  nodeOpacity: number;
  connectOpacity: number;
  cursorInteract: boolean;
  clickBurst: boolean;
}

export interface AuroraSettings {
  waveCount: number;
  speed: number;
  height: number;
  opacity: number;
  blendColor: boolean;
}

export interface ConstellationSettings {
  starCount: number;
  twinkleSpeed: number;
  connectDist: number;
  shootingStars: boolean;
  starOpacity: number;
}

export interface MeshSettings {
  resolution: number;
  speed: number;
  amplitude: number;
  opacity: number;
}

export interface OrbSettings {
  orbCount: number;
  maxSize: number;
  speed: number;
  opacity: number;
}

export interface RainSettings {
  density: number;
  speed: number;
  charSize: number;
  opacity: number;
}

export interface SwirlSettings {
  density: number;
  speed: number;
  particleSize: number;
  opacity: number;
}

export interface BackgroundConfig {
  style: BackgroundStyle;
  neural: NeuralSettings;
  aurora: AuroraSettings;
  constellation: ConstellationSettings;
  mesh: MeshSettings;
  orbs: OrbSettings;
  rain: RainSettings;
  swirl: SwirlSettings;
}

const DEFAULTS: BackgroundConfig = {
  style: "neural",
  neural: { count: 60, connectionDist: 150, speed: 1, nodeOpacity: 0.35, connectOpacity: 0, cursorInteract: true, clickBurst: false },
  aurora: { waveCount: 3, speed: 1, height: 80, opacity: 0.4, blendColor: true },
  constellation: { starCount: 80, twinkleSpeed: 1, connectDist: 120, shootingStars: true, starOpacity: 0.6 },
  mesh: { resolution: 10, speed: 1, amplitude: 40, opacity: 0.3 },
  orbs: { orbCount: 4, maxSize: 200, speed: 1, opacity: 0.15 },
  rain: { density: 1, speed: 1, charSize: 14, opacity: 0.5 },
  swirl: { density: 80, speed: 1, particleSize: 1.5, opacity: 0.5 },
};

function resolveAccentRgb(): [number, number, number] {
  const name =
    typeof document !== "undefined" ? document.documentElement.getAttribute("data-accent") : null;
  return name ? ACCENT_RGB[name] ?? [139, 92, 246] : [139, 92, 246];
}

const STORAGE_KEY = "bg-config";

function loadConfig(): BackgroundConfig {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULTS,
      ...parsed,
      neural: { ...DEFAULTS.neural, ...parsed.neural },
      aurora: { ...DEFAULTS.aurora, ...parsed.aurora },
      constellation: { ...DEFAULTS.constellation, ...parsed.constellation },
      mesh: { ...DEFAULTS.mesh, ...parsed.mesh },
      orbs: { ...DEFAULTS.orbs, ...parsed.orbs },
      rain: { ...DEFAULTS.rain, ...parsed.rain },
      swirl: { ...DEFAULTS.swirl, ...parsed.swirl },
    };
  } catch {
    return DEFAULTS;
  }
}

interface BackgroundContextType {
  config: BackgroundConfig;
  accentRgb: [number, number, number];
  setStyle: (s: BackgroundStyle) => void;
  updateSettings: <K extends keyof BackgroundConfig>(group: K, values: Partial<BackgroundConfig[K]>) => void;
  reset: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<BackgroundConfig>(DEFAULTS);
  const [accentRgb, setAccentRgb] = useState<[number, number, number]>(resolveAccentRgb);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConfig(loadConfig());
    setAccentRgb(resolveAccentRgb());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {}
  }, [config, mounted]);

  // Watch data-accent changes and recompute RGB
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setAccentRgb(resolveAccentRgb());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent"],
    });
    return () => observer.disconnect();
  }, []);

  const setStyle = useCallback((style: BackgroundStyle) => {
    setConfig((prev) => ({ ...prev, style }));
  }, []);

  const updateSettings = useCallback(
    <K extends keyof BackgroundConfig>(group: K, values: Partial<BackgroundConfig[K]>) => {
      setConfig((prev) => ({ ...prev, [group]: { ...(prev[group] as any), ...(values as any) } }));
    },
    []
  );

  const reset = useCallback(() => {
    setConfig(DEFAULTS);
  }, []);

  return (
    <BackgroundContext.Provider value={{ config, accentRgb, setStyle, updateSettings, reset }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error("useBackground must be used within BackgroundProvider");
  return ctx;
}

export { ACCENT_RGB };
