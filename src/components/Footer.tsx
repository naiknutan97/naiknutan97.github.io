import { profile } from "@/data/profile";

// Baked in at build time; GITHUB_SHA is set by the GitHub Actions deploy.
const sha = process.env.GITHUB_SHA?.slice(0, 7) ?? "local";
const built = new Date().toISOString().slice(0, 10);

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div>
          <p className="font-display text-sm font-medium text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href={`mailto:${profile.email}`} className="text-body hover:text-accent">
              {profile.email}
            </a>
            <a href={profile.linkedin} className="text-body hover:text-accent">LinkedIn</a>
            <a href={profile.github} className="text-body hover:text-accent">GitHub</a>
          </p>
        </div>
        <dl className="grid grid-cols-[auto_1fr] content-start gap-x-4 gap-y-1 font-mono text-[11.5px] text-muted sm:justify-self-end">
          <dt>build</dt>
          <dd className="text-body">{built}</dd>
          <dt>commit</dt>
          <dd>
            <a href={`${profile.source}/commit/${sha}`} className="text-body hover:text-accent">
              {sha}
            </a>
          </dd>
          <dt>stack</dt>
          <dd className="text-body">next.js · tailwind · github pages</dd>
          <dt>tip</dt>
          <dd className="text-body">press ctrl+k</dd>
        </dl>
      </div>
    </footer>
  );
}
