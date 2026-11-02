import Link from "next/link";
import Section, { Chips } from "@/components/Section";
import Terminal from "@/components/Terminal";
import ProjectCard from "@/components/ProjectCard";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { education, experience, profile, recognition, skills, training } from "@/data/profile";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { getStars } from "@/lib/github";

function Row({ left, right }: { left: React.ReactNode; right: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div>{left}</div>
      <span className="shrink-0 font-mono text-xs text-muted">{right}</span>
    </div>
  );
}

const linkClass =
  "inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-muted";

export default async function Home() {
  const featured = projects.filter((p) => p.featured);
  const stars = await Promise.all(featured.map((p) => (p.repo ? getStars(p.repo, p.starsFallback) : undefined)));
  const tracciaStars = stars[0];

  const stats = [
    { value: "2", label: "first-author arXiv papers" },
    ...(tracciaStars ? [{ value: String(tracciaStars), label: "GitHub stars on traccia-py" }] : []),
    { value: "30", label: "agent repos assessed with AgentStripes" },
    { value: "15", label: "coal mines in the mine-water study" },
  ];

  return (
    <>
      <header className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="font-mono text-xs text-accent">{profile.role.toLowerCase().replace(/ and /, " · ")}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink">{profile.tagline}</p>
          <p className="mt-3 text-sm text-muted">{profile.positions.join("  ·  ")}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={profile.github} className={linkClass}>
              <GitHubIcon /> GitHub
            </a>
            <a href={profile.linkedin} className={linkClass}>
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className={linkClass}>
              <MailIcon /> Email
            </a>
            <a
              href={profile.resumePdf}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-paper hover:opacity-90"
            >
              <FileIcon /> Resume
            </a>
          </div>
        </div>
        <Terminal />
      </header>

      <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-paper px-4 py-4">
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-mono text-2xl font-semibold text-ink">{s.value}</dd>
            <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
          </div>
        ))}
      </dl>

      <Section id="about" title="About">
        <div className="max-w-2xl space-y-4 leading-relaxed text-ink">
          {profile.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        <div className="space-y-9">
          {experience.map((role) => (
            <div key={role.title}>
              <Row
                left={
                  <>
                    <h3 className="font-semibold text-ink">{role.title}</h3>
                    <p className="text-sm text-muted">
                      {role.org}, {role.place}
                    </p>
                  </>
                }
                right={role.period}
              />
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed marker:text-muted">
                {role.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="mt-3">
                <Chips items={role.stack} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((p, i) => (
            <ProjectCard key={p.name} project={p} stars={stars[i]} />
          ))}
        </div>
        <Link href="/projects/" className="mt-5 inline-block font-mono text-sm text-accent hover:underline">
          All projects and research →
        </Link>
      </Section>

      <Section id="publications" title="Publications">
        <ul className="space-y-4">
          {publications.map((pub) => (
            <li key={pub.title} className="leading-relaxed">
              <a href={pub.links[0].url} className="font-medium text-ink hover:text-accent hover:underline">
                {pub.title}
              </a>
              <p className="font-mono text-xs text-muted">
                {pub.venue} · {pub.year} · first author
              </p>
            </li>
          ))}
        </ul>
        <Link href="/publications/" className="mt-5 inline-block font-mono text-sm text-accent hover:underline">
          Abstracts, BibTeX and articles →
        </Link>
      </Section>

      <Section id="skills" title="Skills">
        <dl className="space-y-4">
          {skills.map((s) => (
            <div key={s.label} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium text-ink">{s.label}</dt>
              <dd>
                <Chips items={s.items} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="training" title="Industrial Training">
        <ul className="space-y-3 text-[15px] leading-relaxed">
          {training.map((t) => (
            <li key={t.org}>
              <span className="font-medium">{t.org}.</span> <span className="text-ink">{t.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education">
        <div className="space-y-5">
          {education.map((e) => (
            <Row
              key={e.degree}
              left={
                <>
                  <h3 className="font-semibold text-ink">{e.degree}</h3>
                  <p className="text-sm text-muted">{e.school}</p>
                  {e.detail && <p className="mt-1 max-w-2xl text-sm text-muted">{e.detail}</p>}
                </>
              }
              right={e.period}
            />
          ))}
        </div>
      </Section>

      <Section id="recognition" title="Recognition">
        <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {recognition.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 bg-paper px-4 py-3">
              <dt className="text-sm text-ink">{r.label}</dt>
              <dd className="font-mono text-sm font-medium text-accent">{r.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
