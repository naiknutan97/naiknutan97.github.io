import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
        pixel: ["var(--font-pixel)", "var(--font-mono)", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        mid: "var(--mid)",
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        mint: "var(--mint)",
        accent: "var(--accent)",
        panel: "var(--panel)",
      },
    },
  },
  plugins: [],
};

export default config;
