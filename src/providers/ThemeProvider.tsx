"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type Theme = "dark" | "light";
export type Accent =
  | "cyan"
  | "emerald"
  | "violet"
  | "amber"
  | "rose"
  | "blue";

interface ThemeContextType {
  theme: Theme;
  accent: Accent;
  setTheme: (t: Theme) => void;
  setAccent: (a: Accent) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ACCENT_LABELS: Record<Accent, string> = {
  cyan: "Cyan",
  emerald: "Emerald",
  violet: "Violet",
  amber: "Amber",
  rose: "Rose",
  blue: "Blue",
};

const ACCENT_COLORS: Record<Accent, string> = {
  cyan: "#06b6d4",
  emerald: "#10b981",
  violet: "#8b5cf6",
  amber: "#f59e0b",
  rose: "#f43f5e",
  blue: "#3b82f6",
};

const ACCENT_RGB: Record<Accent, string> = {
  cyan: "6,182,212",
  emerald: "16,185,129",
  violet: "139,92,246",
  amber: "245,158,11",
  rose: "244,63,94",
  blue: "59,130,246",
};

export { ACCENT_LABELS, ACCENT_COLORS, ACCENT_RGB };

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [accent, setAccentState] = useState<Accent>("cyan");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const savedAccent = localStorage.getItem("accent") as Accent | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
      }
      if (savedAccent) {
        setAccentState(savedAccent);
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-accent", accent);
    document.documentElement.setAttribute("data-accent-rgb", ACCENT_RGB[accent]);
    document.documentElement.style.setProperty("--accent-inline", ACCENT_RGB[accent]);
    localStorage.setItem("accent", accent);
  }, [accent, mounted]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const setAccent = useCallback((a: Accent) => setAccentState(a), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return (
    <ThemeContext.Provider
      value={{ theme, accent, setTheme, setAccent, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
