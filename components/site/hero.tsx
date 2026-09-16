"use client";

import { ArrowDownRight, Bot, ChartSpline, CodeXml, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { HandNote } from "@/components/site/hand";
import { INTRO_DELAY as D } from "@/lib/motion";

const ease = [0.16, 1, 0.3, 1] as const;

function Line({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay }}
        className={`flex items-center ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function IconChip({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span
      className={`mx-[0.08em] inline-grid size-[0.78em] shrink-0 place-items-center rounded-[0.18em] border border-white/10 ${className}`}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <div className="hero-spotlight relative flex h-full flex-col overflow-hidden">
      {/* vertical availability tab */}
      <a
        href="#contact"
        className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-r-2xl bg-white px-2.5 py-6 text-black md:block"
      >
        <span className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          <span className="size-1.5 rounded-full bg-emerald-500" /> Available for internships
        </span>
      </a>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-28 pb-10 sm:px-10">
        <div className="relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: D + 0.7, duration: 0.8 }}
            className="mb-6 max-w-[30ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground lg:absolute lg:left-0 lg:top-[0.6em] lg:mb-0 lg:max-w-[24ch] lg:text-right"
          >
            Hi, I&apos;m Aarush. I like building AI that shows its work.
          </motion.p>

          <HandNote
            play
            delay={D + 1.6}
            arrow="down-right"
            rotate={-6}
            className="absolute -top-16 right-[6%] hidden lg:inline-flex"
          >
            hi, that&apos;s me
          </HandNote>

          <h1 className="chrome-text text-[clamp(3.2rem,12.5vw,10.5rem)] font-black uppercase leading-[0.86] tracking-[-0.055em]">
            <span className="sr-only">Aarush Mehta, data and AI software engineer</span>
            <span aria-hidden>
              <Line delay={D + 0.05} className="lg:justify-end lg:pr-[4%]">
                Data &amp; AI
              </Line>
              <Line delay={D + 0.17} className="lg:pl-[6%]">
                Soft
                <IconChip className="bg-[#101a33] text-volt">
                  <ChartSpline className="size-[0.5em]" strokeWidth={2.25} />
                </IconChip>
                ware
              </Line>
              <Line delay={D + 0.29} className="lg:-ml-[4%]">
                En
                <IconChip className="bg-[#2a1208] text-ember">
                  <Bot className="size-[0.5em]" strokeWidth={2.25} />
                </IconChip>
                gineer
              </Line>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: D + 0.9, duration: 0.8 }}
            className="mt-6 max-w-[28ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground lg:absolute lg:bottom-[0.5em] lg:right-0 lg:mt-0"
          >
            Currently looking for SWE / ML internships. Remote or on-site is fine.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-5 pb-10 sm:px-10">
        <div className="flex gap-2">
          <a href="https://github.com/mehtaaarush" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-9 place-items-center rounded-full border border-white/10 text-muted-foreground hover:text-foreground">
            <CodeXml className="size-4" />
          </a>
          <a href="mailto:aarushmehta902@gmail.com" aria-label="Email" className="grid size-9 place-items-center rounded-full border border-white/10 text-muted-foreground hover:text-foreground">
            <Mail className="size-4" />
          </a>
        </div>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease, delay: D + 0.4 }}
          className="h-px flex-1 origin-left bg-gradient-to-r from-transparent via-white/25 to-white/10"
        />
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Dehradun, IN — 2026
        </p>
        <a
          href="#focus"
          aria-label="Scroll to core focus"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-black transition-transform hover:rotate-[-45deg]"
        >
          <ArrowDownRight className="size-5" />
        </a>
      </div>
    </div>
  );
}
