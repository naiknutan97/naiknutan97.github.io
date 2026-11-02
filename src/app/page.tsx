import Link from "next/link";
import Section, { Chips } from "@/components/Section";
import Terminal from "@/components/Terminal";
import ProjectCard from "@/components/ProjectCard";
import { PixelBars, PixelGrid, tileColors } from "@/components/Pixels";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { education, experience, profile, recognition, skills, training } from "@/data/profile";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { getStars } from "@/lib/github";

const btn =
  "inline-flex items-center gap-2 rounded-md bg-surface-2 px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-line";

function StatTile({ value, label, color, seed }: { value: string; label: string; color: string; seed: number }) {
  const Art = seed % 2 ? PixelBars : PixelGrid;
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="relative h-28 bg-panel">
        <Art color={color} seed={seed} className="absolute inset-0 h-full w-full opacity-70" />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-transparent" />
        <span
          className="absolute bottom-2 left-3 font-pixel text-4xl text-white"
          style={{ textShadow: "2px 2px 0 #03140f" }}
        >
          {value}
        </span>
      </div>
      <p
        className="px-3 py-2.5 font-mono text-xs font-bold uppercase leading-snug"
        style={{ background: `${color}33`, color }}
      >
        {label}
      </p>
    </div>
  );
}

export default async function Home() {
  const featured = projects.filter((p) => p.featured);
  const stars = await Promise.all(featured.map((p) => (p.repo ? getStars(p.repo, p.starsFallback) : undefined)));
  const tracciaStars = stars[0];

  const stats = [
    { value: "2", label: "First-author arXiv papers" },
    ...(tracciaStars ? [{ value: String(tracciaStars), label: "GitHub stars on traccia-py" }] : []),
    { value: "30", label: "Agent repos assessed with AgentStripes" },
    { value: "15", label: "Coal mines in the mine-water study" },
  ];

  return (
    <>
      <header className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-mono text-sm text-accent">
            <span className="text-muted">$</span> echo &quot;hello, world&quot;
          </p>
          <h1 className="mt-4 font-pixel text-5xl uppercase leading-[0.95] text-mint sm:text-7xl">
            Nutan
            <br />
            Kumar Naik
          </h1>
          <p className="mt-5 inline-block rounded bg-accent px-2 py-1 font-mono text-sm font-bold uppercase text-paper">
            #ai-ml-engineer #geoscientist
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">{profile.tagline}</p>
          <p className="mt-3 font-mono text-sm text-muted">{profile.positions.join("  //  ")}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            <a href={profile.github} className={btn}>
              <GitHubIcon /> GitHub
            </a>
            <a href={profile.linkedin} className={btn}>
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className={btn}>
              <MailIcon /> Email
            </a>
            <a
              href={profile.resumePdf}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-bold text-paper hover:brightness-110"
            >
              <FileIcon /> Resume.pdf
            </a>
          </div>
        </div>
        <Terminal />
      </header>

      <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatTile key={s.label} {...s} color={tileColors[i]} seed={i + 3} />
        ))}
      </div>

      <Section index="01" title="About">
        <div className="grid gap-6 lg:grid-cols-2">
          {profile.summary.map((p) => (
            <p key={p} className="text-[17px] leading-relaxed text-body">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section index="02" title="Experience">
        <ol className="relative space-y-12 border-l-2 border-line pl-8">
          {experience.map((role) => (
            <li key={role.title} className="relative">
              <span className="absolute -left-[41px] top-1 h-4 w-4 border-2 border-paper bg-accent" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="font-mono text-xl font-bold text-mint">{role.title}</h3>
                  <p className="mt-1 text-muted">
                    {role.org}, {role.place}
                  </p>
                </div>
                <span className="rounded border border-accent px-2 py-0.5 font-mono text-xs font-bold text-accent">
                  {role.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-[15.5px] leading-relaxed">
                {role.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="font-mono text-accent">›</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Chips items={role.stack} />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="03" title="Projects">
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((p, i) => (
            <ProjectCard key={p.name} project={p} stars={stars[i]} color={tileColors[i]} seed={i + 11} />
          ))}
        </div>
        <Link
          href="/projects/"
          className="mt-6 inline-block font-mono text-sm font-bold uppercase text-accent hover:underline"
        >
          cd ./projects →
        </Link>
      </Section>

      <Section index="04" title="Publications">
        <ul className="space-y-4">
          {publications.map((pub) => (
            <li key={pub.title} className="rounded-xl border border-line bg-surface p-5">
              <span className="rounded bg-accent px-2 py-0.5 font-mono text-xs font-bold text-paper">
                {pub.venue.split(" ")[0]}
              </span>
              <a
                href={pub.links[0].url}
                className="mt-3 block font-mono text-lg font-bold leading-snug text-mint hover:text-accent"
              >
                {pub.title}
              </a>
              <p className="mt-1 font-mono text-xs uppercase text-muted">{pub.year} // first author</p>
            </li>
          ))}
        </ul>
        <Link
          href="/publications/"
          className="mt-6 inline-block font-mono text-sm font-bold uppercase text-accent hover:underline"
        >
          cat ./publications --bibtex →
        </Link>
      </Section>

      <Section index="05" title="Stack">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-mono text-sm font-bold uppercase text-ink">
                <span className="text-accent">./</span>
                {s.label.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}
              </h3>
              <div className="mt-4">
                <Chips items={s.items} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section index="06" title="Field Training">
        <div className="grid gap-4 md:grid-cols-3">
          {training.map((t) => (
            <div key={t.org} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-mono font-bold text-accent">{t.org}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="07" title="Education">
        <div className="divide-y divide-line rounded-xl border border-line bg-surface">
          {education.map((e) => (
            <div key={e.degree} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 p-5">
              <div>
                <h3 className="font-mono font-bold text-mint">{e.degree}</h3>
                <p className="text-muted">{e.school}</p>
                {e.detail && <p className="mt-1 max-w-2xl text-sm text-body">{e.detail}</p>}
              </div>
              <span className="font-mono text-sm font-bold text-accent">{e.period}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section index="08" title="High Scores">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recognition.map((r) => (
            <div key={r.label} className="min-w-0 rounded-xl border border-line bg-surface p-5">
              <p className="font-pixel text-2xl text-accent">{r.value}</p>
              <p className="mt-2 font-mono text-xs uppercase leading-snug text-muted">{r.label}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
