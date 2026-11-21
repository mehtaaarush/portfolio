import { ArrowUpRight } from "lucide-react";
import { siLeetcode } from "simple-icons";

import { getLeetCodeStats, LEETCODE_USER, type Difficulty } from "@/lib/leetcode";

/* LeetCode's own difficulty colours, always shown next to their label */
const TONE: Record<Difficulty, string> = { Easy: "#1cbbab", Medium: "#ffb800", Hard: "#f63737" };

/** DSA practice from my LeetCode profile, rendered on the server and refreshed twice a day. */
export async function LeetCodeCard() {
  const stats = await getLeetCodeStats();
  const levels = Object.entries(stats.byDifficulty) as [Difficulty, { solved: number; total: number }][];

  return (
    <div className="grid gap-8 rounded-[1.75rem] border bg-card p-6 shadow-paper sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill={`#${siLeetcode.hex}`}>
            <path d={siLeetcode.path} />
          </svg>
          LeetCode · {stats.live ? "live stats" : "cached"}
        </p>
        <h2 className="mt-5 font-heading text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          Practising DSA, one problem at a time.
        </h2>
        <p className="mt-4 max-w-[46ch] text-muted-foreground">
          The count comes straight from my profile and refreshes twice a day, so it grows as I go.
        </p>
        <a
          href={`https://leetcode.com/u/${LEETCODE_USER}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full border border-foreground/15 px-5 text-sm font-semibold transition-[translate,border-color] hover:-translate-y-0.5 hover:border-foreground/30"
        >
          leetcode.com/u/{LEETCODE_USER}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="rounded-2xl border border-dashed bg-background/60 p-5 sm:p-7">
        <p className="flex items-baseline gap-3">
          <span className="font-heading text-[clamp(2.4rem,5vw,3.4rem)] font-bold leading-none tracking-[-0.04em]">{stats.solved}</span>
          <span className="text-sm text-muted-foreground">problems solved</span>
        </p>
        {/* one bar split by difficulty, each segment's width its share of what I've solved */}
        <div className="mt-6 flex h-2.5 gap-[2px] overflow-hidden rounded-full bg-foreground/[0.07]" aria-hidden>
          {levels.map(([level, { solved }]) =>
            solved ? <span key={level} className="h-full first:rounded-l-full last:rounded-r-full" style={{ width: `${(solved / stats.solved) * 100}%`, background: TONE[level] }} /> : null,
          )}
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-3">
          {levels.map(([level, { solved }]) => (
            <div key={level} className="rounded-xl border bg-card/60 px-3 py-2.5">
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span aria-hidden className="size-2 rounded-full" style={{ background: TONE[level] }} />
                {level}
              </dt>
              <dd className="mt-1 font-heading text-xl font-bold tracking-tight">{solved}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
