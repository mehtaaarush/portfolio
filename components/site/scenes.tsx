"use client";

import { BrainCircuit, ChartSpline, Rocket } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CountUp } from "@/components/site/count-up";
import { HandNote } from "@/components/site/hand";
import { Hero } from "@/components/site/hero";
import { ScrollWords } from "@/components/site/scroll-words";
import { clamp01, EASE_OUT } from "@/lib/motion";
import { FOCUS_QUOTE } from "@/lib/site-content";

/** Scroll progress (0–1) of a tall wrapper whose child is pinned for the duration. */
function useScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return { ref, p: scrollYProgress };
}

function Pill({ children, style }: { children: React.ReactNode; style?: { opacity: MotionValue<number> } }) {
  return (
    <motion.p
      style={style}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
    >
      <span className="size-1.5 rounded-full bg-ember" />
      {children}
    </motion.p>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero recedes into the distance, the "core focus" frame zooms in  */
/* ------------------------------------------------------------------ */

export function HeroFocusScene() {
  const { ref, p } = useScene();

  // The hero settles back while an opaque panel irises open from the scroll button
  // in the bottom-right corner. The panel covers the hero completely, so the big hero
  // type and the quote are never on screen at the same time.
  const heroScale = useTransform(p, [0, 0.3], [1, 0.93]);
  const heroEvents = useTransform(p, (v) => (v < 0.1 ? "auto" : "none"));
  // the iris is fully open (covers the whole screen) by 0.3, before any quote text appears
  const iris = useTransform(p, [0.02, 0.3], ["circle(0% at 93% 90%)", "circle(160% at 93% 90%)"]);
  const ring = useTransform(p, [0.02, 0.3], [0, 1]);

  const frameOpacity = useTransform(p, [0.26, 0.36], [0, 1]);
  const frameY = useTransform(p, [0.26, 0.4], [40, 0]);
  const cornerInset = useTransform(p, [0.3, 0.42], ["-16px", "-3.5px"]);
  const labelsOpacity = useTransform(p, [0.34, 0.42], [0, 1]);
  const [noteOn, setNoteOn] = useState(false);
  useMotionValueEvent(p, "change", (v) => setNoteOn(v > 0.66));

  return (
    <section ref={ref} id="top" className="relative" style={{ height: "440svh" }}>
      <span id="focus" className="absolute left-0 top-[250svh]" aria-hidden />
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={{ scale: heroScale, pointerEvents: heroEvents }}
          className="absolute inset-0 overflow-hidden will-change-transform"
        >
          <Hero />
        </motion.div>

        <motion.div style={{ clipPath: iris }} className="absolute inset-0 bg-background">
          <motion.div
            aria-hidden
            style={{ opacity: ring }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_85%,rgb(242_107_72/0.10),transparent_70%)]"
          />
          <motion.div
            style={{ opacity: frameOpacity, y: frameY }}
            className="absolute inset-0 flex items-center justify-center px-4 pt-20 pb-6 sm:px-10"
          >
            <div className="relative w-full max-w-6xl border border-white/10 px-6 py-10 sm:px-14 sm:py-14">
              {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((c) => (
                <motion.span
                  key={c}
                  aria-hidden
                  style={{
                    [c.startsWith("top") ? "top" : "bottom"]: cornerInset,
                    [c.endsWith("left") ? "left" : "right"]: cornerInset,
                  }}
                  className="absolute size-1.5 rounded-full bg-ember"
                />
              ))}
              <motion.div style={{ opacity: labelsOpacity }} className="flex flex-wrap justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="text-ember">Core focus</span>
                <span className="text-muted-foreground">Data science · AI/ML · Full-stack</span>
              </motion.div>
              <h2 className="mt-8 text-[clamp(2.3rem,7vw,6rem)] leading-[0.98] tracking-tighter sm:mt-10">
                <ScrollWords
                  progress={p}
                  from={0.38}
                  to={0.64}
                  segments={[
                    { text: `“${FOCUS_QUOTE.line1}`, className: "font-extrabold" },
                    { text: "\n" },
                    { text: FOCUS_QUOTE.line2, className: "font-extrabold text-muted-foreground" },
                    { text: "\n" },
                    { text: `${FOCUS_QUOTE.line3}”`, className: "font-serif font-normal italic" },
                  ]}
                />
              </h2>
              {FOCUS_QUOTE.note && (
                <HandNote
                  play={noteOn}
                  arrow="up"
                  arrowFirst
                  rotate={-3}
                  className="absolute -bottom-10 right-6 hidden sm:inline-flex sm:right-14"
                >
                  {FOCUS_QUOTE.note}
                </HandNote>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Statistics panel rises like a sheet, words light up, stats pop   */
/* ------------------------------------------------------------------ */

export function StatsScene({ toolCount }: { toolCount: number }) {
  const { ref, p } = useScene();
  const [play, setPlay] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.62) setPlay(true);
  });

  const panelY = useTransform(p, [0, 0.3], ["85%", "0%"]);
  const panelScale = useTransform(p, [0, 0.3], [0.94, 1]);
  const pillOpacity = useTransform(p, [0.22, 0.32], [0, 1]);
  const statsY = useTransform(p, [0.58, 0.75], [80, 0]);
  const statsOpacity = useTransform(p, [0.58, 0.72], [0, 1]);

  const stats = [
    { label: "Projects shipped", value: 5 },
    { label: "RAG faithfulness", value: 1, decimals: 1 },
    { label: "Internships", value: 2 },
    { label: "Tech & tools", value: toolCount, suffix: "+" },
  ];

  return (
    <section ref={ref} className="relative" style={{ height: "300svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden px-3 pt-20 sm:px-6">
        <motion.div
          style={{ y: panelY, scale: panelScale }}
          className="mx-auto flex h-full max-w-7xl origin-top flex-col items-center justify-center rounded-t-[2.5rem] border border-b-0 border-white/10 bg-gradient-to-b from-[#121214] to-background px-5 text-center will-change-transform sm:px-10"
        >
          <Pill style={{ opacity: pillOpacity }}>By the numbers</Pill>
          <h2 className="mx-auto mt-8 max-w-[22ch] text-[clamp(1.9rem,4.6vw,3.8rem)] font-extrabold leading-[1.04] tracking-tighter">
            <ScrollWords
              progress={p}
              from={0.28}
              to={0.58}
              segments={[
                { text: "Retrieval that cites. Evals that keep it honest." },
                { text: "And the numbers to back it up.", className: "text-muted-foreground" },
              ]}
            />
          </h2>
          <motion.dl
            style={{ y: statsY, opacity: statsOpacity }}
            className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-2 gap-y-8 rounded-2xl border border-white/10 bg-card px-4 py-8 md:grid-cols-4 md:divide-x md:divide-white/10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</dt>
                <dd className="mt-3 text-4xl font-extrabold tracking-tight">
                  <CountUp value={s.value} decimals={s.decimals} play={play} />
                  {s.suffix && <span className="text-lg text-muted-foreground">{s.suffix}</span>}
                </dd>
              </div>
            ))}
          </motion.dl>
          <HandNote play={play} delay={1.2} arrow="up" arrowFirst rotate={-2} className="mt-2 self-start md:ml-[22%]">
            took a lot of eval runs to get that 1.0
          </HandNote>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. "About me" type zooms toward the camera and opens onto the story */
/* ------------------------------------------------------------------ */

export function AboutScene() {
  const { ref, p } = useScene();

  // The title stays fully inside the screen: it eases back slightly, lifts up and fades,
  // instead of zooming past the edges. The story only arrives once the title is gone.
  const textScale = useTransform(p, [0.06, 0.34], [1, 0.9]);
  const textY = useTransform(p, [0.06, 0.34], ["0vh", "-14vh"]);
  const textOpacity = useTransform(p, [0.16, 0.32], [1, 0]);
  const textBlur = useTransform(p, [0.16, 0.32], ["blur(0px)", "blur(6px)"]);
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);
  const storyOpacity = useTransform(p, [0.36, 0.52], [0, 1]);
  const storyY = useTransform(p, [0.36, 0.56], [40, 0]);
  const photoRotate = useTransform(p, [0.36, 0.6], [12, 3]);
  const photoY = useTransform(p, [0.36, 0.6], [80, 0]);

  return (
    <section ref={ref} id="about" className="relative" style={{ height: "300svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.h2
          style={{ scale: textScale, y: textY, opacity: textOpacity, filter: textBlur }}
          className="absolute inset-0 grid place-items-center px-5 will-change-transform"
        >
          <span className="flex overflow-hidden whitespace-nowrap pb-[0.08em] text-[clamp(3.2rem,12vw,11rem)] font-black uppercase leading-none tracking-[-0.05em]">
            {"About me".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.04 }}
                className="chrome-text inline-block"
              >
                {ch === " " ? "\u00a0" : ch}
              </motion.span>
            ))}
          </span>
        </motion.h2>
        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          ↓ Scroll to explore
        </motion.p>

        <motion.div
          style={{ opacity: storyOpacity, y: storyY }}
          className="absolute inset-0 flex items-center px-5 pt-16 sm:px-10"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_15rem_minmax(0,1.1fr)] lg:items-center lg:gap-12">
            <div>
              <div className="flex items-center gap-3">
                {/* small avatar stands in for the polaroid on narrow screens */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/aarush.png" alt="" className="size-10 rounded-full object-cover ring-1 ring-white/15 lg:hidden" />
                <Pill>My short story</Pill>
              </div>
              <h3 className="chrome-text mt-6 text-[clamp(2.4rem,5.2vw,4.6rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Engineering
                <br />
                AI that
                <br />
                holds up.
              </h3>
            </div>

            <motion.figure style={{ rotate: photoRotate, y: photoY }} className="relative hidden lg:block">
              <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-3 bg-[#e8dfc9]/70 shadow-sm" />
              <div className="bg-[#f3efe8] p-2.5 pb-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/aarush.png" alt="Aarush Mehta" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="mt-2 text-center font-hand text-xl leading-none text-[#3a342c]">
                  me, away from the keyboard
                </figcaption>
              </div>
            </motion.figure>

            <div>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                I&apos;m a CS undergrad at UPES Dehradun, majoring in Data Science &amp; AI/ML and graduating in 2027. What pulled me into AI was the gap between a cool demo and something you can actually rely on. So far that&apos;s meant a document Q&amp;A app that would rather say &ldquo;I don&apos;t know&rdquo; than guess, a research agent that gets graded by its own evaluator, and a vision project from my internship at IIT Roorkee.
              </p>
              <div className="mt-6 max-w-sm -rotate-1 rounded-sm border border-white/10 bg-[#1b1814] px-5 py-4 shadow-[4px_6px_0_rgb(0_0_0/0.35)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Right now</p>
                <ul className="mt-2 space-y-1 font-hand text-xl leading-snug text-foreground/90">
                  <li>• sharpening DSA, one problem at a time</li>
                  <li>• next up: hybrid search for my RAG agent</li>
                  <li>• going deeper on tool-calling agents &amp; LLM evals</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Three features swap in place: tiles flip, copy slides through    */
/* ------------------------------------------------------------------ */

const features = [
  {
    no: "01",
    icon: BrainCircuit,
    title: "Retrieval & agents",
    text: "RAG pipelines and tool-using agents that stay grounded. That means sentence-aware chunking, tuned similarity thresholds, citations on every answer, and an LLM-as-judge harness that measures faithfulness instead of assuming it.",
    tags: ["RAG pipelines", "LangGraph agents", "Tool calling", "Vector search", "LLM evaluation"],
    tiles: ["RAG", "LLM", "FAISS", "AGENT", "", "EVAL"],
    tone: "text-ember",
    glow: "rgb(255 90 54 / 0.18)",
  },
  {
    no: "02",
    icon: ChartSpline,
    title: "Data science & ML",
    text: "Good models start with the data. I begin with EDA and feature engineering, handle class imbalance properly, and choose metrics that fit the problem: recall over accuracy when a missed fraud case is the expensive mistake. When the problem calls for it, I reach for deep learning and computer vision.",
    tags: ["EDA", "Feature engineering", "Scikit-Learn & XGBoost", "Imbalanced data", "PyTorch & CV"],
    tiles: ["EDA", "ML", "F1", "DATA", "", "CV"],
    tone: "text-volt",
    glow: "rgb(91 140 255 / 0.2)",
  },
  {
    no: "03",
    icon: Rocket,
    title: "Shipping products",
    text: "A model nobody can use is just a notebook. So I build the rest too: Next.js clients, containerized FastAPI services, PostgreSQL with versioned migrations, and REST contracts that keep them talking.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "REST API design"],
    tiles: ["API", "SQL", "UI", "DOCKER", "", "TS"],
    tone: "text-emerald-400",
    glow: "rgb(52 211 153 / 0.16)",
  },
];

function Segment({ p, i }: { p: MotionValue<number>; i: number }) {
  const fill = useTransform(p, (v) => clamp01(v * 3 - i));
  return (
    <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
      <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-white" />
    </span>
  );
}

export function FeaturesScene() {
  const { ref, p } = useScene();
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(p, "change", (v) => setIdx(Math.min(2, Math.floor(v * 3))));
  const f = features[idx];
  const Icon = f.icon;

  return (
    <section ref={ref} className="relative" style={{ height: "400svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 transition-[background] duration-700"
          style={{ background: `radial-gradient(45% 50% at 28% 55%, ${f.glow}, transparent 70%)` }}
        />
        <p aria-hidden className="pointer-events-none absolute -bottom-[0.12em] right-0 select-none text-[clamp(10rem,34vw,30rem)] font-black leading-none tracking-[-0.08em] text-white/[0.03]">
          {f.no}
        </p>

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center gap-8 px-5 pt-20 pb-8 sm:px-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="mx-auto w-full max-w-[min(64vw,420px)] [perspective:1000px] lg:max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={f.no}
                className="grid grid-cols-3 gap-2.5 sm:gap-3"
                initial="enter"
                animate="show"
                exit="leave"
                transition={{ staggerChildren: 0.05 }}
              >
                {f.tiles.map((t, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      enter: { rotateY: -60, opacity: 0, z: -40 },
                      show: { rotateY: 0, opacity: 1, z: 0, transition: { duration: 0.6, ease: EASE_OUT } },
                      leave: { rotateY: 60, opacity: 0, z: -40, transition: { duration: 0.3 } },
                    }}
                    className="grid aspect-square place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a1d] to-[#0b0b0c] shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_20px_40px_-20px_rgb(0_0_0)]"
                  >
                    {t === "" ? (
                      <Icon className={`size-9 sm:size-11 ${f.tone}`} strokeWidth={1.5} />
                    ) : (
                      <span className={`font-mono text-xs font-medium tracking-[0.14em] sm:text-sm ${i % 2 ? "text-muted-foreground" : f.tone}`}>{t}</span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="mb-6 flex max-w-xs gap-2" aria-hidden>
              {features.map((x, i) => (
                <Segment key={x.no} p={p} i={i} />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={f.no}
                initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Feature — {f.no} <span className="h-px w-12 bg-white/20" />
                </p>
                <h3 className="mt-4 text-[clamp(2.1rem,5vw,4.2rem)] font-extrabold uppercase leading-[0.92] tracking-tighter">{f.title}</h3>
                <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground sm:text-lg">{f.text}</p>
                <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
                  {f.tags.map((t) => (
                    <li key={t} className="rounded-lg border border-white/10 bg-card px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em]">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Journey: vertical scroll drives a horizontal timeline            */
/* ------------------------------------------------------------------ */

export interface JourneyItem {
  when: string;
  title: string;
  org: string;
  text: string;
}

export function JourneyScene({ items }: { items: JourneyItem[] }) {
  const { ref, p } = useScene();
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const x = useTransform(p, (v) => -distance * clamp01((v - 0.08) / 0.84));
  const line = useTransform(p, (v) => clamp01((v - 0.08) / 0.84));

  return (
    <section ref={ref} id="journey" className="relative" style={{ height: "420svh" }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-16">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-6 px-5 will-change-transform sm:gap-10 sm:px-10">
          <div className="flex w-[min(86vw,560px)] shrink-0 flex-col justify-center">
            <h2 className="chrome-text text-[clamp(3rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.05em]">
              The
              <br />
              journey
            </h2>
            <p className="mt-5 max-w-[40ch] text-muted-foreground">
              From my first CS classes to my first research internship. Keep scrolling and the timeline moves sideways.
            </p>
          </div>

          {items.map((j, i) => (
            <article
              key={j.title}
              className="relative flex w-[min(80vw,380px)] shrink-0 flex-col rounded-3xl border border-white/10 bg-card p-7"
            >
              <div className="flex items-center justify-between">
                <span className={`size-3 rounded-full ${i === items.length - 1 ? "border border-white/40" : "bg-ember shadow-[0_0_20px_rgb(255_90_54/0.7)]"}`} />
                <span className="font-mono text-xs tabular-nums text-muted-foreground">0{i + 1}</span>
              </div>
              <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-ember">{j.when}</p>
              <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight">{j.title}</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{j.org}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{j.text}</p>
              {i === items.length - 1 && (
                <span className="mt-auto -rotate-2 pt-4 font-hand text-xl text-ember/90">(fingers crossed)</span>
              )}
            </article>
          ))}
        </motion.div>

        <div className="mx-5 mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:mx-10">
          <span>2023</span>
          <span className="relative h-px flex-1 bg-white/10">
            <motion.span style={{ scaleX: line }} className="absolute inset-0 origin-left bg-gradient-to-r from-ember to-white" />
          </span>
          <span>2027</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Full-screen panels that slide over one another                   */
/* ------------------------------------------------------------------ */

export function StackPanel({ children, id, last = false }: { children: React.ReactNode; id?: string; last?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.95]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, last ? 0 : 0.55]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [0, last ? 0 : 28]);

  return (
    <div ref={ref} id={id} className={last ? "relative" : "relative md:sticky md:top-0 md:h-svh"}>
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative flex h-full origin-top flex-col justify-center overflow-hidden bg-background will-change-transform"
      >
        {children}
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
      </motion.div>
    </div>
  );
}
