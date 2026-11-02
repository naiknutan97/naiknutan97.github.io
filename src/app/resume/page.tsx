import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/Section";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Resume | Nutan Kumar Naik" };

export default function Resume() {
  return (
    <>
      <PageTitle
        title="Resume"
        intro="A one-page resume covering experience at Algen AI and NIT Rourkela, industrial training at ONGC and CMPDI, education, publications and skills."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={profile.resumePdf}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-paper hover:opacity-90"
        >
          Download resume (PDF)
        </a>
        <Link
          href="/"
          className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:border-muted"
        >
          View profile online
        </Link>
      </div>
      <p className="mt-8 text-sm text-muted">
        For a phone number or a role-specific version, write to{" "}
        <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
          {profile.email}
        </a>
        .
      </p>
    </>
  );
}
