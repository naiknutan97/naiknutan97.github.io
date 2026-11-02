import Link from "next/link";
import Section, { Tags } from "@/components/Section";
import CareerTrace from "@/components/CareerTrace";
import ProjectCard from "@/components/ProjectCard";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { education, experience, profile, recognition, skills, status, training } from "@/data/profile";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { getStars } from "@/lib/github";

const ghost =
  "inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-muted";

function Dot() {
  return <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />;
}

export default async function Home() {
  const featured = projects.filter((p) => p.featured);
  const stars = await Promise.all(featured.map((p) => (p.repo ? getStars(p.repo, p.starsFallback) : undefined)));
  const tracciaStars = stars[0];

  const metrics = [
    { key: "papers.first_author", value: "2", label: "arXiv papers on AI observability and agent assessment" },
    ...(tracciaStars
      ? [{ key: "traccia_py.stars", value: String(tracciaStars), label: "GitHub stars on the Traccia Python SDK" }]
      : []),
    { key: "repos.assessed", value: "30", label: "open-source agent repositories scored with AgentStripes" },
    { key: "mines.sampled", value: "15", label: "MCL coal mines in the mine-water chemistry study" },
  ];

  return (
    <>
      <header className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-body">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            {status}
          </p>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-[3.4rem]">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-sm text-accent">ai/ml engineer · geoscientist</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{profile.tagline}</p>
          <p className="mt-3 text-sm text-muted">{profile.positions.join("  ·  ")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a
              href={profile.resumePdf}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition hover:brightness-110"
            >
              <FileIcon /> Download resume
            </a>
            <a href={profile.github} className={ghost}>
              <GitHubIcon /> GitHub
            </a>
            <a href={profile.linkedin} className={ghost}>
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className={ghost}>
              <MailIcon />
            </a>
          </div>
          <p className="mt-5 hidden font-mono text-xs text-muted md:block">
            press <kbd className="rounded border border-line px-1">ctrl</kbd>{" "}
            <kbd className="rounded border border-line px-1">k</kbd> to jump anywhere
          </p>
        </div>
        <CareerTrace />
      </header>

      <dl className="mt-20 grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.key}
            className={`py-6 pr-4 ${i % 2 ? "pl-4 border-l border-line" : ""} ${
              i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""
            } ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <dt className="font-mono text-[11px] text-muted">{m.key}</dt>
            <dd className="mt-2 font-display text-3xl font-medium text-ink">{m.value}</dd>
            <dd className="mt-1 text-xs leading-snug text-muted">{m.label}</dd>
          </div>
        ))}
      </dl>

      <Section id="about" index="01" title="About">
        <div className="max-w-2xl space-y-5 text-[17px] leading-relaxed">
          {profile.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="experience" index="02" title="Experience">
        <div className="divide-y divide-line">
          {experience.map((role) => (
            <article key={role.title} className="py-8 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-lg font-medium text-ink">{role.title}</h3>
                <span className="font-mono text-xs text-muted">{role.period}</span>
              </div>
              <p className="mt-1 text-muted">
                {role.org}, {role.place}
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-[15.5px] leading-relaxed">
                {role.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Dot />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Tags items={role.stack} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="projects" index="03" title="Projects">
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p, i) => (
            <ProjectCard key={p.name} project={p} stars={stars[i]} />
          ))}
        </div>
        <Link href="/projects/" className="mt-6 inline-block font-mono text-sm text-accent hover:underline">
          all projects and research →
        </Link>
      </Section>

      <Section id="publications" index="04" title="Publications">
        <ul className="divide-y divide-line">
          {publications.map((pub) => (
            <li key={pub.title} className="grid gap-1 py-5 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <span className="font-mono text-xs text-accent">{pub.venue.split(" ")[0]}</span>
              <div>
                <a href={pub.links[0].url} className="font-medium leading-snug text-ink hover:text-accent">
                  {pub.title}
                </a>
                <p className="mt-1 text-sm text-muted">{pub.year} · first author</p>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/publications/" className="mt-6 inline-block font-mono text-sm text-accent hover:underline">
          abstracts and bibtex →
        </Link>
      </Section>

      <Section id="skills" index="05" title="Skills">
        <dl className="divide-y divide-line">
          {skills.map((s) => (
            <div key={s.label} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs text-muted">{s.label.toLowerCase()}</dt>
              <dd className="text-[15px] leading-relaxed text-ink">{s.items.join("  ·  ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="training" index="06" title="Industrial Training">
        <ul className="space-y-4 text-[15.5px] leading-relaxed">
          {training.map((t) => (
            <li key={t.org} className="flex gap-3">
              <Dot />
              <span>
                <span className="font-medium text-ink">{t.org}.</span> {t.text}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" index="07" title="Education">
        <div className="divide-y divide-line">
          {education.map((e) => (
            <div key={e.degree} className="py-5 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-medium text-ink">{e.degree}</h3>
                <span className="font-mono text-xs text-muted">{e.period}</span>
              </div>
              <p className="text-muted">{e.school}</p>
              {e.detail && <p className="mt-1 max-w-2xl text-sm">{e.detail}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section id="recognition" index="08" title="Recognition">
        <dl className="grid gap-x-8 sm:grid-cols-2">
          {recognition.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="text-[15px] text-ink">{r.label}</dt>
              <dd className="font-mono text-sm text-accent">{r.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
