import Link from "next/link";
import Section from "@/components/Section";
import { education, experience, profile, recognition, skills, training } from "@/data/profile";
import { publications } from "@/data/publications";

function Row({ left, right }: { left: React.ReactNode; right: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div>{left}</div>
      <span className="shrink-0 text-sm text-muted">{right}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{profile.name}</h1>
        <p className="mt-2 text-lg text-ink">{profile.role}</p>
        <p className="mt-1 text-muted">{profile.positions.join("  ·  ")}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href={`mailto:${profile.email}`} className="text-accent hover:underline">{profile.email}</a>
          <a href={profile.linkedin} className="text-accent hover:underline">LinkedIn</a>
          <a href={profile.github} className="text-accent hover:underline">GitHub</a>
          <a href={profile.resumePdf} className="text-accent hover:underline">Resume (PDF)</a>
        </div>
      </header>

      <Section title="Professional Profile">
        <p className="leading-relaxed text-ink">{profile.summary}</p>
      </Section>

      <Section title="Experience">
        <div className="space-y-7">
          {experience.map((role) => (
            <div key={role.title}>
              <Row
                left={
                  <>
                    <h3 className="font-medium text-ink">{role.title}</h3>
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
            </div>
          ))}
        </div>
      </Section>

      <Section title="Publications">
        <ul className="space-y-3">
          {publications.map((pub) => (
            <li key={pub.title} className="leading-relaxed">
              <a href={pub.links[0].url} className="font-medium text-ink hover:text-accent hover:underline">
                {pub.title}
              </a>
              <span className="text-muted">. {pub.venue}, {pub.year}. First author.</span>
            </li>
          ))}
        </ul>
        <Link href="/publications/" className="mt-4 inline-block text-sm text-accent hover:underline">
          Publications and articles →
        </Link>
      </Section>

      <Section title="Industrial Training">
        <ul className="space-y-2 text-[15px] leading-relaxed">
          {training.map((t) => (
            <li key={t.org}>
              <span className="font-medium">{t.org}.</span> <span className="text-ink">{t.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <div className="space-y-4">
          {education.map((e) => (
            <Row
              key={e.degree}
              left={
                <>
                  <h3 className="font-medium text-ink">{e.degree}</h3>
                  <p className="text-sm text-muted">{e.school}</p>
                  {e.detail && <p className="mt-1 text-sm text-muted">{e.detail}</p>}
                </>
              }
              right={e.period}
            />
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-[11rem_1fr]">
          {skills.map((s) => (
            <div key={s.label} className="contents">
              <dt className="font-medium text-ink">{s.label}</dt>
              <dd className="mb-2 text-ink sm:mb-0">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Recognition">
        <ul className="list-disc space-y-1 pl-5 text-[15px] marker:text-muted">
          {recognition.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
