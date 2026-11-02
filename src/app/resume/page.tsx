import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/Section";
import { FileIcon } from "@/components/Icons";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Resume | Nutan Kumar Naik" };

export default function Resume() {
  return (
    <>
      <PageTitle
        path="resume"
        title="Resume"
        intro="One page covering AI research at Algen AI, open-source projects, doctoral research at NIT Rourkela, industrial training at ONGC and CMPDI, publications and technical skills."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={profile.resumePdf}
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-paper hover:opacity-90"
        >
          <FileIcon /> Download PDF
        </a>
        <Link
          href="/"
          className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:border-muted"
        >
          View profile online
        </Link>
      </div>
      <p className="mt-6 text-sm text-muted">
        For a phone number or a role-specific version, write to{" "}
        <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
          {profile.email}
        </a>
        .
      </p>
      <iframe
        src={profile.resumePdf}
        title="Resume preview"
        className="mt-10 hidden h-[1100px] w-full rounded-lg border border-line md:block"
      />
    </>
  );
}
