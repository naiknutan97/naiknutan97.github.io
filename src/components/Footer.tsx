import { PixelGrid } from "@/components/Pixels";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mt-28">
      <PixelGrid color="#63ff86" seed={97} cols={96} rows={6} className="block h-14 w-full opacity-60" />
      <div className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 font-mono text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="text-muted">
            <span className="font-bold text-accent">EOF</span> · © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <a href={`mailto:${profile.email}`} className="text-mint hover:text-accent">email</a>
            <a href={profile.linkedin} className="text-mint hover:text-accent">linkedin</a>
            <a href={profile.github} className="text-mint hover:text-accent">github</a>
            <a href={profile.source} className="text-mint hover:text-accent">view-source</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
