import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        chip: "var(--chip)",
        panel: "var(--panel)",
        "panel-ink": "var(--panel-ink)",
        "panel-muted": "var(--panel-muted)",
        "panel-line": "var(--panel-line)",
        prompt: "var(--prompt)",
      },
    },
  },
  plugins: [],
};

export default config;
