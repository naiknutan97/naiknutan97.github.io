# Portfolio — Nutan Kumar Naik

Personal portfolio website for Nutan Kumar Naik — AI/ML Engineer and researcher.

Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production Build

```bash
npm run build      # outputs static site to ./out/
npm run start      # serve the static build locally
```

## Deployment

This project deploys automatically to **GitHub Pages** via GitHub Actions.

Every push to `main` triggers the workflow in `.github/workflows/deploy.yml`, which:
1. Installs dependencies and builds the static site
2. Uploads the `out/` directory as a Pages artifact
3. Deploys to the `github-pages` environment

### Required GitHub Settings

- Repository → **Settings** → **Pages**
  - Source: **GitHub Actions**
- Repository → **Settings** → **Actions** → **General**
  - Workflow permissions: **Read and write permissions**

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Static site generation |
| React 19 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS v3 | Styling |
| Framer Motion | Animations |
# naiknutan.github.io
