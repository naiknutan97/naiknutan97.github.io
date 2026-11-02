import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="font-mono text-xs">
          Next.js + Tailwind CSS, static on GitHub Pages ·{" "}
          <a href={profile.source} className="text-accent hover:underline">
            view source
          </a>
        </span>
      </div>
    </footer>
  );
}
