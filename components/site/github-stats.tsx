"use client";

import { ArrowUpRight, GitCommitHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { CountUp } from "@/components/site/count-up";

const USER = "mehtaaarush";

interface Stats {
  repos: number;
  activeThisYear: number;
  lastPush: string | null;
  languages: string[];
}

/** Live numbers from the public GitHub API; falls back to known values if the request fails. */
export function GithubStats() {
  const [stats, setStats] = useState<Stats>({ repos: 13, activeThisYear: 13, lastPush: null, languages: ["Python", "Jupyter Notebook", "TypeScript", "Java"] });
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://api.github.com/users/${USER}`).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`).then((r) => (r.ok ? r.json() : Promise.reject())),
    ])
      .then(([user, repos]: [{ public_repos: number }, { pushed_at: string; language: string | null; fork: boolean }[]]) => {
        if (cancelled) return;
        const own = repos.filter((r) => !r.fork);
        setStats({
          repos: user.public_repos,
          activeThisYear: own.filter((r) => new Date(r.pushed_at).getFullYear() === new Date().getFullYear()).length,
          lastPush: own[0]?.pushed_at ?? null,
          languages: [...new Set(own.map((r) => r.language).filter((l): l is string => Boolean(l)))],
        });
        setLive(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const cells = [
    { label: "public repositories", value: stats.repos },
    { label: `updated in ${new Date().getFullYear()}`, value: stats.activeThisYear },
  ];

  return (
    <div className="grid gap-6 rounded-[1.75rem] border bg-card p-6 shadow-paper sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className={`size-1.5 rounded-full ${live ? "bg-emerald-500" : "bg-foreground/30"}`} />
          GitHub · {live ? "live from the API" : "cached"}
        </p>
        <h2 className="mt-5 font-heading text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          Built in the open, commit by commit.
        </h2>
        <p className="mt-4 max-w-[46ch] text-muted-foreground">
          These numbers come from the public GitHub API when the page loads. Most of the projects above link straight to their code.
        </p>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          github.com/{USER}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="rounded-2xl border border-dashed bg-background/60 p-5 sm:p-7">
        <dl className="grid grid-cols-2 gap-4">
          {cells.map((c) => (
            <div key={c.label}>
              <dd className="font-heading text-[clamp(2.4rem,5vw,3.4rem)] font-bold leading-none tracking-[-0.04em]">
                <CountUp value={c.value} />
              </dd>
              <dt className="mt-2 text-sm text-muted-foreground">{c.label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-6 grid gap-4 border-t border-dashed pt-5 text-sm sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Last push</p>
            <p className="mt-1 flex items-center gap-1.5 font-medium">
              <GitCommitHorizontal className="size-4 text-primary" aria-hidden />
              {stats.lastPush
                ? new Date(stats.lastPush).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                : "—"}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Languages</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {stats.languages.slice(0, 6).map((l) => (
                <li key={l} className="rounded-md border bg-card px-2 py-0.5 font-mono text-[11px]">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
