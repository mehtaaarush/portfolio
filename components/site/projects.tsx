"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BotMessageSquare,
  ChartColumn,
  FileSearch,
  Globe,
  Satellite,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { EASE_OUT } from "@/lib/motion";
import { featured, type Area, type Work } from "@/lib/portfolio";

type Filter = "all" | Area;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "data", label: "Data science" },
  { id: "ai", label: "AI & ML" },
  { id: "web", label: "Full-stack & web" },
];

const ICONS: Record<string, LucideIcon> = {
  "vision-nav": Satellite,
  docintel: FileSearch,
  "agentic-rag": BotMessageSquare,
  fraud: ShieldCheck,
  "olist-dashboard": ChartColumn,
  indianeers: Globe,
};

const TINT: Record<Area, string> = { data: "bg-tint-data", ai: "bg-tint-ai", web: "bg-tint-web" };

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* ------------------------------------------------------------------ */

/** A live page in a browser frame. Tall pages scroll to the bottom on hover. */
function SiteShot({ work, large }: { work: Work; large?: boolean }) {
  const shot = work.shot!;
  const frame = large ? 9 / 16 : 10 / 16;
  const pan = Math.max(0, 1 - frame / (shot.height / shot.width)) * 100;
  return (
    <div className="border-b bg-secondary/70">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex gap-1" aria-hidden>
          <span className="size-2 rounded-full bg-[#ff6159]" />
          <span className="size-2 rounded-full bg-[#ffbd2e]" />
          <span className="size-2 rounded-full bg-[#28c941]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-card px-2 py-0.5 text-center font-mono text-[10px] text-muted-foreground">
          {work.live ? host(work.live) : work.title}
        </span>
      </div>
      <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={large ? "(min-width: 800px) 768px, 100vw" : "(min-width: 1024px) 370px, (min-width: 640px) 46vw, 92vw"}
          style={{ "--pan": `-${pan.toFixed(1)}%` } as React.CSSProperties}
          className="h-auto w-full transition-transform duration-[2600ms] ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:translate-y-[var(--pan)]"
        />
      </div>
    </div>
  );
}

/** An image or plot from the project's repo. Plots on white read as notebook output and flip to dark with the theme. */
function FigureShot({ work, large }: { work: Work; large?: boolean }) {
  const shot = work.shot!;
  const sizes = large ? "(min-width: 800px) 768px, 100vw" : "(min-width: 1024px) 370px, (min-width: 640px) 46vw, 92vw";
  return (
    <div className={`relative overflow-hidden border-b ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
      {shot.plot ? (
        <div className="absolute inset-0 isolate bg-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] dark:hue-rotate-180 dark:invert">
          <Image src={shot.src} alt={shot.alt} fill sizes={sizes} className="object-contain p-3 mix-blend-multiply sm:p-4" />
        </div>
      ) : (
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          style={{ objectPosition: shot.position ?? "center" }}
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
      )}
      {shot.caption && (
        <span className="glass absolute bottom-2.5 left-2.5 backdrop-blur-md rounded-md border border-foreground/10 px-2 py-0.5 font-mono text-[10px] text-foreground/80">
          {shot.caption}
        </span>
      )}
    </div>
  );
}

/* the agent's own evaluation run, from eval_results.json in the repo */
const RAG_EVAL = [
  { q: "Swin: shifted windows", f: "1.00" },
  { q: "DINOv2: visual features", f: "1.00" },
  { q: "GANs: the core idea", f: "1.00" },
  { q: "Why self-attention", f: "1.00" },
  { q: "CLIP: how it's trained", f: "1.00" },
];

/** A terminal replaying the RAG agent's LLM-as-judge evaluation. */
function TerminalCover({ large }: { large?: boolean }) {
  const rows = [
    <span key="cmd">
      <span className="text-[#8f9dff]">$</span> python src/evaluate.py
    </span>,
    ...RAG_EVAL.map((r) => (
      <span key={r.q} className="flex gap-2">
        <span className="text-[#c3e88d]">✓</span>
        <span className="min-w-0 flex-1 truncate text-white/75">{r.q}</span>
        <span className="text-white/40">faithful</span>
        <span className="text-[#ffcb6b]">{r.f}</span>
      </span>
    )),
    <span key="avg" className="mt-1 block border-t border-dashed border-white/15 pt-1.5 text-white/90">
      avg faithfulness <span className="text-[#c3e88d]">1.00</span> · relevancy <span className="text-[#ffcb6b]">0.75</span>
    </span>,
  ];
  return (
    <div className={`relative overflow-hidden border-b bg-[#0b0d15] ${large ? "aspect-[16/9] sm:aspect-[16/7]" : "aspect-[16/10]"}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3 py-2" aria-hidden>
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[10px] text-white/40">agentic-rag-assistant · zsh</span>
      </div>
      <motion.div
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        className={`flex flex-col gap-1 px-4 py-3 font-mono leading-snug text-white/85 ${large ? "text-[13px] sm:px-6 sm:py-5" : "text-[10.5px]"}`}
      >
        {rows.map((row, i) => (
          <motion.span key={i} variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }} className="block">
            {row}
          </motion.span>
        ))}
      </motion.div>
      <p className="sr-only">Evaluation run: five test questions, each answered with faithfulness 1.0; average relevancy 0.75.</p>
    </div>
  );
}

function TypeCover({ work, large }: { work: Work; large?: boolean }) {
  const Icon = ICONS[work.slug] ?? Sparkles;
  return (
    <div className={`relative overflow-hidden border-b ${TINT[work.areas[0]]} ${large ? "aspect-[16/9] sm:aspect-[16/7]" : "aspect-[16/10]"}`}>
      <div className="dots absolute inset-0 opacity-70" aria-hidden />
      <Icon
        aria-hidden
        strokeWidth={1.1}
        className="absolute -bottom-8 -right-6 size-44 text-foreground/[0.08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110"
      />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <span className="grid size-10 place-items-center rounded-xl bg-card shadow-paper" aria-hidden>
          <Icon className="size-5 text-primary" />
        </span>
        <div>
          <p className={`font-heading font-bold leading-none tracking-[-0.035em] ${large ? "text-5xl" : "text-[2.5rem]"}`}>
            {work.metric?.value ?? host(work.live ?? work.title)}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {work.metric?.label ?? "company website, live"}
          </p>
        </div>
      </div>
    </div>
  );
}

function Cover({ work, large }: { work: Work; large?: boolean }) {
  if (work.shot) return work.shot.frame === "figure" ? <FigureShot work={work} large={large} /> : <SiteShot work={work} large={large} />;
  if (work.slug === "agentic-rag") return <TerminalCover large={large} />;
  return <TypeCover work={work} large={large} />;
}

function ExtLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`group/link inline-flex items-center gap-1 ${className}`}>
      {children}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

/* ------------------------------------------------------------------ */

function ProjectCard({ work, onOpen }: { work: Work; onOpen: (work: Work, from: HTMLElement) => void }) {
  const ref = useRef<HTMLElement>(null);
  const track = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={track}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-paper transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-foreground/20 hover:shadow-lift"
    >
      <Cover work={work} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {work.kind} <span className="text-foreground/30">/</span> {work.period.replace(" · Live", "")}
        </p>
        <h3 className="mt-2 font-heading text-[1.3rem] font-semibold leading-snug tracking-[-0.015em]">
          <button
            type="button"
            onClick={() => ref.current && onOpen(work, ref.current)}
            className="text-left after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
          >
            {work.title}
          </button>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{work.summary}</p>
        {work.shot && work.metric && (
          <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
            <span className="font-heading text-2xl font-bold tracking-tight">
              <span className="marker" data-on="true">
                {work.metric.value}
              </span>
            </span>
            <span className="text-sm text-muted-foreground">{work.metric.label}</span>
          </p>
        )}
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
          {work.stack.slice(0, 4).map((s) => (
            <li key={s} className="rounded-md border bg-background/70 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-semibold">
          <span className="inline-flex items-center gap-1 text-primary" aria-hidden>
            Details <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {work.live && (
            <ExtLink href={work.live} className="relative z-10 text-foreground/80 hover:text-foreground">
              Live demo
            </ExtLink>
          )}
          {work.code && (
            <ExtLink href={work.code} className="relative z-10 text-foreground/80 hover:text-foreground">
              Code
            </ExtLink>
          )}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

interface Origin {
  x: number;
  y: number;
  scale: number;
}

/** Full write-up of one project. It zooms out of the card that opened it and back into it on close. */
function ProjectDialog({ work, origin, onClose }: { work: Work; origin: Origin; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    window.__lenis?.stop();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      window.__lenis?.start();
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);

  const from = { opacity: 0, x: origin.x, y: origin.y, scale: origin.scale };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[#0b1020]/50 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        data-lenis-prevent
        initial={from}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ ...from, transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } }}
        transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
        className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-2xl border bg-card shadow-lift"
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full border bg-card/90 shadow-paper backdrop-blur transition-transform hover:rotate-90"
        >
          <X className="size-[18px]" />
        </button>

        <Cover work={work} large />

        <div className="p-6 sm:p-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {work.kind} <span className="text-foreground/30">/</span> {work.period}
          </p>
          <h2 id="project-dialog-title" className="mt-2 font-heading text-[clamp(1.7rem,4vw,2.3rem)] font-bold leading-tight tracking-[-0.025em]">
            {work.title}
          </h2>
          {work.shot && work.metric && (
            <p className="mt-5 inline-flex flex-wrap items-baseline gap-x-2.5 rounded-xl bg-accent px-4 py-2.5">
              <span className="font-heading text-2xl font-bold tracking-tight">{work.metric.value}</span>
              <span className="text-sm text-foreground/75">{work.metric.label}</span>
            </p>
          )}
          <p className="mt-5 text-[17px] leading-relaxed text-foreground/85">{work.blurb}</p>

          <h3 className="mt-7 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Built with</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {work.stack.map((s) => (
              <li key={s} className="rounded-lg border bg-background/70 px-2.5 py-1 font-mono text-xs">
                {s}
              </li>
            ))}
          </ul>

          {(work.live || work.code) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {work.live && (
                <ExtLink
                  href={work.live}
                  className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Open live demo
                </ExtLink>
              )}
              {work.code && (
                <ExtLink
                  href={work.code}
                  className="h-11 rounded-full border border-foreground/15 px-5 text-sm font-semibold transition-[translate,border-color] hover:-translate-y-0.5 hover:border-foreground/30"
                >
                  View the code
                </ExtLink>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const cardIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: (i % 3) * 0.08 } }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<{ work: Work; origin: Origin } | null>(null);
  const shown = filter === "all" ? featured : featured.filter((w) => w.areas.includes(filter));

  const openCard = useCallback((work: Work, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const panelWidth = Math.min(window.innerWidth - 24, 768);
    setOpen({
      work,
      origin: {
        x: r.left + r.width / 2 - window.innerWidth / 2,
        y: r.top + r.height / 2 - window.innerHeight / 2,
        scale: Math.max(0.3, Math.min(1, r.width / panelWidth)),
      },
    });
  }, []);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f.id === "all" ? featured.length : featured.filter((w) => w.areas.includes(f.id as Area)).length;
          const on = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.id)}
              className={`relative isolate inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                on ? "border-primary/30 text-primary" : "bg-card/70 text-foreground/75 hover:border-foreground/25 hover:text-foreground"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                />
              )}
              {f.label}
              <span className={`font-mono text-[11px] ${on ? "text-primary/70" : "text-muted-foreground"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((w, i) => (
            <motion.li
              key={w.slug}
              layout
              custom={i}
              variants={cardIn}
              initial="hidden"
              whileInView="show"
              exit="exit"
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ layout: { type: "spring", stiffness: 300, damping: 32 } }}
            >
              <ProjectCard work={w} onOpen={openCard} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>{open && <ProjectDialog key={open.work.slug} work={open.work} origin={open.origin} onClose={close} />}</AnimatePresence>
    </>
  );
}
