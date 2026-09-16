"use client";

import { ArrowUpRight } from "lucide-react";
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
  const [stats, setStats] = useState<Stats>({ repos: 5, activeThisYear: 5, lastPush: null, languages: ["Python", "Jupyter Notebook"] });
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://api.github.com/users/${USER}`).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`).then((r) => (r.ok ? r.json() : Promise.reject())),
    ])
      .then(([user, repos]: [{ public_repos: number; followers: number }, { stargazers_count: number; pushed_at: string; language: string | null; fork: boolean }[]]) => {
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
    { label: "Public repositories", value: stats.repos },
    { label: `Updated in ${new Date().getFullYear()}`, value: stats.activeThisYear },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className={`size-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-white/40"}`} />
          GitHub · {live ? "live data" : "cached"}
        </p>
        <h2 className="mt-6 text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.92] tracking-tighter">
          Built in the open,
          <br />
          <span className="font-serif text-[1.08em] font-normal italic tracking-tight text-muted-foreground">commit by commit.</span>
        </h2>
        <p className="mt-6 max-w-[46ch] text-muted-foreground">
          These numbers come straight from the public GitHub API when the page loads. The language breakdown is taken from my own repositories.
        </p>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-black hover:bg-ember"
        >
          github.com/{USER} <ArrowUpRight className="size-4" />
        </a>
      </div>
      <div className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
        <dl className="grid grid-cols-2 divide-x divide-white/10">
          {cells.map((c) => (
            <div key={c.label} className="px-3 first:pl-0 last:pr-0">
              <dd className="text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none tracking-tighter">
                <CountUp value={c.value} />
              </dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{c.label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 font-mono text-xs sm:grid-cols-2">
          <div>
            <p className="uppercase tracking-[0.16em] text-muted-foreground">Last push</p>
            <p className="mt-1 text-foreground">
              {stats.lastPush
                ? new Date(stats.lastPush).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                : "—"}
            </p>
          </div>
          <div>
            <p className="uppercase tracking-[0.16em] text-muted-foreground">Languages</p>
            <p className="mt-1 text-foreground">{stats.languages.join(" · ") || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
