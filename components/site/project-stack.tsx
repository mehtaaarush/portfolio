"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";

import type { Work } from "@/lib/portfolio";

function StackCard({
  work,
  i,
  total,
  progress,
}: {
  work: Work;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // card i rises from below with a 3D tilt during its slice of scroll,
  // then recedes (shrinks, lifts, darkens) as the next card covers it
  const start = (i - 1) / total;
  const end = i / total;
  const next = Math.min(1, end + 1 / total);
  const first = i === 0;
  const lastCard = i === total - 1;
  const enterY = useTransform(progress, [Math.max(0, start), end], first ? ["0%", "0%"] : ["115%", "0%"]);
  const leaveY = useTransform(progress, [end, next], ["0%", lastCard ? "0%" : "-3%"]);
  const y = useTransform(() => `calc(${enterY.get()} + ${leaveY.get()})`);
  const rotateX = useTransform(progress, [Math.max(0, start), end], first ? [0, 0] : [12, 0]);
  const scale = useTransform(progress, [Math.max(0, start), end, next], first ? [1, 1, lastCard ? 1 : 0.94] : [0.95, 1, lastCard ? 1 : 0.94]);
  const dim = useTransform(progress, [end, next], [0, lastCard ? 0 : 0.5]);

  return (
    <motion.article
      style={{ y, scale, rotateX, zIndex: i + 1, transformPerspective: 1400 }}
      className="absolute inset-0 origin-top overflow-hidden rounded-3xl border border-white/10 bg-[#f2f2f0] text-[#0a0a0a] shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.9)]"
    >
      <div className="grid h-full gap-6 p-6 sm:p-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-10">
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-black/50">{work.period}</span>
          </div>
          <h3 className="mt-auto text-[clamp(1.9rem,4.2vw,3.6rem)] font-extrabold uppercase leading-[0.92] tracking-tighter text-balance">
            {work.title}
          </h3>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/15 pt-4 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="text-black/60">{work.kind}</span>
            {work.metric && (
              <span>
                <span className="text-ember">{work.metric.value}</span> {work.metric.label}
              </span>
            )}
          </div>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-black/70">{work.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {work.live && (
              <a href={work.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white hover:bg-ember hover:text-black">
                Live site <ArrowUpRight className="size-3.5" />
              </a>
            )}
            {work.code && (
              <a href={work.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-black/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] hover:border-black">
                View code <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </div>
        <div className="relative hidden min-h-0 overflow-hidden rounded-2xl bg-black md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={work.slide.src} alt={work.slide.alt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {work.stack.slice(0, 4).map((s) => (
              <span key={s} className="rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
    </motion.article>
  );
}

export function ProjectStack({ works }: { works: Work[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [page, setPage] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setPage(Math.min(works.length, Math.floor(p * works.length) + 1));
  });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} style={{ height: `${works.length * 110}svh` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center px-3 pt-20 pb-6 sm:px-10">
        <div className="relative mx-auto h-[min(640px,78svh)] w-full max-w-6xl">
          {works.map((w, i) => (
            <StackCard key={w.slug} work={w} i={i} total={works.length} progress={scrollYProgress} />
          ))}
        </div>
        <div className="mx-auto mt-5 flex w-full max-w-6xl items-center gap-4 px-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Page</span>
          <span className="relative h-px w-28 bg-white/15">
            <motion.span style={{ width: bar }} className="absolute inset-y-0 left-0 bg-white" />
          </span>
          <span className="tabular-nums text-foreground">
            {page} / {works.length}
          </span>
        </div>
      </div>
    </div>
  );
}
