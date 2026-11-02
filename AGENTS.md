# AGENTS.md

## Project Overview

Professional profile website for Nutan Kumar Naik: Lead AI Researcher at Algen AI, doctoral researcher at NIT Rourkela, geoscientist (M.Sc, IIT Kharagpur). It mirrors the current one-page resume.

---

## Technology Stack

- **Framework:** Next.js (TypeScript, App Router), static export (`output: "export"`)
- **Styling:** Tailwind CSS with CSS-variable colour tokens in `globals.css`. Theme follows the system unless the visitor picks light or dark with the header toggle (`ThemeToggle.tsx`, stored in localStorage, applied as `data-theme` on `<html>` by an inline script before paint)
- **Content:** structured data in `src/data/`
- **Deployment:** GitHub Pages via `.github/workflows/deploy.yml` on push to `main`

---

## Design Philosophy

A professional profile with an engineer's voice: it reads like a well-set resume, with restrained developer touches.

**Prefer:** Inter for prose, JetBrains Mono for metadata (dates, arXiv ids, stack chips, nav), one blue accent, thin rules, sections with a plain title in a label column (no section numbers) (`max-w-5xl`), the terminal panel on the home page, bordered project cards, real facts only.

**Avoid:** particles, custom cursors, gradients, page transitions, skill-percentage bars, placeholder content. The only motion is the terminal cursor blink, disabled under `prefers-reduced-motion`. Only list publications, projects and claims that can be verified (arXiv, GitHub, the resume).

---

## Site Structure

- **Profile** (`/`): hero with terminal panel, stats strip, about, experience, featured projects, publications, skills, industrial training, education, recognition
- **Projects** (`/projects/`): open-source projects with details, plus research projects
- **Publications** (`/publications/`): papers with summaries, links and BibTeX, plus articles
- **Resume** (`/resume/`): download and inline preview of `public/Nutan_Kumar_Naik_Resume.pdf` (public copy with no phone number)

A command palette (`CommandPalette.tsx`) opens on Ctrl/Cmd+K or "/" for jumping to pages, sections and links.

GitHub star counts are fetched at build time by `src/lib/github.ts` and fall back to `starsFallback` (or no badge) when the API is unavailable.
- **Field Gallery** (`/gallery/`): built but hidden from the nav until the Drive photos are shared publicly

---

## Developer Commands

```sh
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run build:full # Sync gallery from Drive + build
npm run sync       # Generate gallery data from Drive (uses curation if available)
npm run curate     # Interactive photo selection via browser UI
npm run lint       # Run ESLint (next lint)
npx tsc --noEmit   # TypeScript check (run before committing)
```

**Note:** This project uses `next/font/google` (Inter and JetBrains Mono) via CSS variables, loaded in `layout.tsx`. Do not use CSS `@import` for fonts.

## Environment Notes

- **Known issue:** `npm run dev` and `npm run build` may fail with SIGBUS on ARM64 + f2fs filesystem combinations (Next.js 14 build worker incompatibility with memory-mapped I/O on f2fs). This is **not a code issue** — the project works on standard ext4/xfs systems and deploys normally to Vercel.
- **Fix for ARM64 + f2fs:** Upgrade to Next.js 15 (`next@15`). The v15 build pipeline avoids the mmap SIGBUS issue on f2fs. This project already uses Next.js 15.
- TypeScript compiles cleanly (`tsc --noEmit` → exit 0). Verify code correctness this way when the dev server cannot run.
- Clean `.next` before troubleshooting build failures: `rm -rf .next`

## Google Drive Gallery Setup

The gallery fetches photos from Google Drive at build time. A curation workflow lets you interactively select which photos appear.

### Workflow

```
npm run curate  →  interactive browser UI, pick photos, save
npm run sync    →  generate gallery JSON from your selection
npm run build   →  build the site with Drive-sourced photos
```

### Required environment variables

Copy `.env.example` to `.env.local` and fill in:

```
GOOGLE_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
```

### Google Cloud Console setup:

1. Go to https://console.cloud.google.com/ → Create a project
2. Enable the **Google Drive API** (APIs & Services → Library)
3. Go to **APIs & Services → Credentials**
4. Create **OAuth 2.0 Client ID**:
   - Application type: **Desktop app**
   - Name: `gallery-sync`
   - Add `http://localhost:3456` and `http://localhost:3457` to **Authorized redirect URIs**
5. Copy the **Client ID** and **Client Secret** into `.env.local`

### Configure albums

Edit `scripts/sync-config.json` and replace `REPLACE_WITH_DRIVE_FOLDER_ID` with your actual Google Drive folder IDs. To find a folder ID: open the folder in Drive, the URL is `https://drive.google.com/drive/folders/FOLDER_ID`.

### First-time setup

```sh
# Install dependencies (one-time)
npm install

# Authenticate with Google (one-time, opens browser)
npm run curate

# The browser shows all photos from your Drive folders
# Check the ones you want, click "Save Selection"
# Then Ctrl+C to stop the server

# Generate gallery data from your curated selection
npm run sync

# Build the site
npm run build
```

Re-run `npm run curate` anytime to update your selection. Previous choices are remembered.

### How it works

- `scripts/auth.mjs` — handles OAuth 2.0 flow. First run opens a browser for Google login. A refresh token is saved to `scripts/auth-token.json` (`.gitignore`d) for subsequent automated use.
- `scripts/curate.mjs` — starts a local web UI at `http://localhost:3457`. Displays thumbnails of all photos from your Drive folders. Checkboxes let you pick which to include. "Save Selection" writes to `scripts/curation.json`.
- `scripts/sync-gallery.mjs` — reads `curation.json` (if it exists) and fetches only the selected files from Drive. Generates `public/data/gallery-sync.json` with Google Drive image URLs.
- Gallery page (`src/app/gallery/page.tsx`) — fetches `gallery-sync.json` at runtime. If it exists, uses Drive photos. Otherwise falls back to `src/data/local-albums.ts` (committed local photos).
- Images are served directly from Google Drive's CDN — **no photo binaries are stored in the repo**.

### Security

- Content-Security-Policy meta tag restricts scripts/images/frames to trusted origins
- OAuth refresh token is stored locally in `.gitignore`d file (never committed)
- Photo metadata (file IDs only) is in `gallery-sync.json`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout (Inter + JetBrains Mono, CSP meta, Nav, Footer)
│   ├── page.tsx         # Profile page
│   ├── projects/
│   ├── publications/
│   ├── resume/
│   └── gallery/
├── components/
│   ├── Navigation.tsx   # Name + mono links + Ctrl/Cmd+K handler
│   ├── CommandPalette.tsx
│   ├── ThemeToggle.tsx  # system → light → dark
│   ├── Footer.tsx
│   ├── Section.tsx      # Section with label column; PageTitle; Chips
│   ├── Terminal.tsx     # whoami / now / stack panel
│   ├── ProjectCard.tsx
│   └── Icons.tsx
├── lib/
│   └── github.ts        # Build-time star counts
└── data/
    ├── profile.ts       # Profile, now, experience, training, education, skills, recognition
    ├── projects.ts      # Open-source and research projects
    ├── publications.ts  # Papers and articles
    └── gallery.ts       # Gallery types and local fallback albums
```

The resume PDF is generated outside this repo by `E:\projects\blogs\research\petrochemical-companies\resume\build_resumes.py` (web variant) and copied to `public/`.

## Component Guidelines

Create reusable, composable React components. Follow existing patterns when building new ones.
