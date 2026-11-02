// Runs at build time (static export). Falls back quietly when the API is unreachable or rate-limited.
export async function getStars(repo: string, fallback?: number): Promise<number | undefined> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? fallback;
  } catch {
    return fallback;
  }
}
