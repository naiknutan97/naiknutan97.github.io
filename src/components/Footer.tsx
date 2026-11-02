import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:px-6">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="flex gap-4">
          <a href={`mailto:${profile.email}`} className="hover:text-ink">Email</a>
          <a href={profile.linkedin} className="hover:text-ink">LinkedIn</a>
          <a href={profile.github} className="hover:text-ink">GitHub</a>
        </span>
      </div>
    </footer>
  );
}
