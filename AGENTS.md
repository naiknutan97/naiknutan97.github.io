# AGENTS.md

## Project Overview

Personal portfolio website for Nutan Kumar Naik — AI/ML Engineer and researcher.

Presents a professional identity combining:
- AI/ML engineering
- Agentic AI systems development
- AI observability and governance
- OpenTelemetry-based AI infrastructure
- Research publications
- Open-source projects
- Technical writing

---

## Technology Stack

- **Framework:** Next.js (TypeScript, App Router)
- **Styling:** Tailwind CSS, responsive-first, dark modern AI-inspired theme
- **UI Components:** Reusable React components, accessible patterns
- **Animation:** Framer Motion (subtle, performance-first)
- **Content:** Markdown/MDX for articles; structured data for projects, publications, blogs
- **Deployment:** Vercel with GitHub integration

---

## Design Philosophy

Communicate: **"AI Engineer + Research Scientist"**

**Prefer:** minimalist, professional, technical, modern, clean typography, strong visual hierarchy, dark mode, code-inspired elements.

**Avoid:** generic templates, excessive gradients, distracting animations, overly playful designs.

---

## Site Structure

### Home
1. Hero — name, role (AI/ML Engineer | Agentic AI | AI Governance), summary, social links (GitHub, LinkedIn, Google Scholar, Email)
2. Expertise — Agentic AI, AI observability, LLM applications, ML, Geospatial AI
3. Featured Projects
4. Publications
5. Technical Writing

### About
- Professional journey, AI engineering experience, research background, technical interests

### Projects
Each: title, description, problem, approach, tech stack, architecture diagrams, links.

Featured:
- Traccia AI Observability Platform
- Agentic AI Systems
- ML-based Environmental Models
- Remote Sensing Applications

### Publications
Research papers, preprints, conference/journal publications, arXiv links.

### Blog
Topics: Agentic AI, OpenTelemetry, AI governance, LLM engineering, ML research.

### Resume
Downloadable resume, professional timeline, skills.

---

## Developer Commands

```sh
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint (next lint)
npx tsc --noEmit # TypeScript check (run before committing)
```

**Note:** This project uses `next/font/google` (Inter + JetBrains Mono) via CSS variables, loaded in `layout.tsx`. Do not use CSS `@import` for fonts.

## Environment Notes

- **Known issue:** `npm run dev` and `npm run build` may fail with SIGBUS on ARM64 + f2fs filesystem combinations (Next.js 14 build worker incompatibility with memory-mapped I/O on f2fs). This is **not a code issue** — the project works on standard ext4/xfs systems and deploys normally to Vercel.
- **Fix for ARM64 + f2fs:** Upgrade to Next.js 15 (`next@15`). The v15 build pipeline avoids the mmap SIGBUS issue on f2fs. This project already uses Next.js 15.
- TypeScript compiles cleanly (`tsc --noEmit` → exit 0). Verify code correctness this way when the dev server cannot run.
- Clean `.next` before troubleshooting build failures: `rm -rf .next`

## Project Structure

```
src/
├── app/           # App Router pages
│   ├── layout.tsx # Root layout (fonts, ScrollProgress, CustomCursor, Nav, Footer)
│   ├── page.tsx   # Homepage (Hero, Bento Expertise, Projects, Publications, Blog)
│   ├── about/
│   ├── projects/
│   ├── publications/
│   ├── blog/
│   └── resume/
├── components/    # Reusable UI components
│   ├── Navigation.tsx    # Scroll-aware floating pill nav (glassmorphism)
│   ├── Footer.tsx
│   ├── Hero.tsx          # Avatar ring, typing effect, mesh bg, metrics
│   ├── Section.tsx       # Accent header, scroll-triggered fade-up
│   ├── ProjectCard.tsx
│   ├── PublicationCard.tsx
│   ├── BlogCard.tsx
│   ├── Typewriter.tsx    # Cycling text effect
│   ├── ScrollProgress.tsx
│   ├── CustomCursor.tsx  # Ring follower
│   ├── SkillBar.tsx      # Animated progress bars
│   ├── PageTransition.tsx
│   ├── ThemeToggle.tsx
│   └── AccentPicker.tsx
├── providers/
│   └── ThemeProvider.tsx  # Dark/light + 6 accent colors, localStorage
└── data/          # Structured content
    ├── projects.ts
    ├── publications.ts
    └── blog.ts
```

## Component Guidelines

Create reusable, composable React components. Follow existing patterns when building new ones.
