import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
        display: ["var(--font-display)", "var(--font-mono)", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        line: "var(--line)",
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        data: "var(--data)",
        panel: "var(--panel)",
        "panel-ink": "var(--panel-ink)",
        "panel-muted": "var(--panel-muted)",
        "panel-line": "var(--panel-line)",
        "panel-accent": "var(--panel-accent)",
        "panel-data": "var(--panel-data)",
      },
    },
  },
  plugins: [],
};

export default config;
