import Link from "next/link";
import { BlogPost } from "@/data/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
        <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/80 card-hover dark:border-neutral-800/50 dark:bg-neutral-900/80">
          <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[rgb(var(--accent))]/5 to-transparent" />
          </div>

          <div className="relative p-6">
            <div className="mb-4 flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
              <span>{post.date}</span>
              <span className="text-neutral-300 dark:text-neutral-700">/</span>
              <span>{post.readTime}</span>
              <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
            </div>

            <h3 className="text-base font-medium text-neutral-800 transition-colors group-hover:text-[rgb(var(--accent))] dark:text-neutral-100 dark:group-hover:text-[rgb(var(--accent))]">
              {post.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {post.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-neutral-200 bg-neutral-100/80 px-2.5 py-1 font-mono text-[11px] text-neutral-500 dark:border-neutral-700/30 dark:bg-neutral-800/80 dark:text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-1.5 font-mono text-[11px] text-neutral-400 transition-colors group-hover:text-[rgb(var(--accent))] dark:text-neutral-500 dark:group-hover:text-[rgb(var(--accent))]">
              Read article
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
  );
}
