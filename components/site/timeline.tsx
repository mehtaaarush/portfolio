"use client";

import { ArrowRight, Briefcase, Flag, GraduationCap, Rocket, type LucideIcon } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { EASE_OUT } from "@/lib/motion";
import { journey, type JourneyKind } from "@/lib/portfolio";

const KIND: Record<JourneyKind, { icon: LucideIcon; label: string }> = {
  education: { icon: GraduationCap, label: "Education" },
  work: { icon: Briefcase, label: "Internship" },
  projects: { icon: Rocket, label: "Projects" },
  next: { icon: Flag, label: "Up next" },
};

/** Experience and education on a rail that fills with ink as you scroll down it. */
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative mt-12 space-y-5 sm:space-y-7">
      <span aria-hidden className="absolute bottom-6 left-5 top-6 w-px -translate-x-1/2 bg-foreground/15 md:left-[176px]" />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-6 left-5 top-6 w-[2px] origin-top -translate-x-1/2 rounded-full bg-primary md:left-[176px]"
      />

      {journey.map((item) => {
        const { icon: Icon, label } = KIND[item.kind];
        const next = item.kind === "next";
        return (
          <li key={item.title} className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 md:grid-cols-[140px_40px_minmax(0,1fr)]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden pt-5 text-right font-mono text-sm text-muted-foreground md:block"
            >
              {item.when}
            </motion.p>

            <motion.span
              initial={{ scale: 0.3, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -25% 0px" }}
              transition={{ type: "spring", stiffness: 320, damping: 17 }}
              className={`relative z-10 mt-3.5 grid size-10 place-items-center rounded-full border-2 ${
                next ? "border-dashed border-primary/70 bg-background text-primary" : "border-primary bg-card text-primary shadow-paper"
              }`}
            >
              <Icon className="size-[18px]" aria-hidden />
            </motion.span>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.75, ease: EASE_OUT }}
            >
              <div
                className={`rounded-2xl border p-5 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 sm:p-6 ${
                  next ? "border-dashed border-primary/40 bg-background/70" : "bg-card shadow-paper hover:shadow-lift"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${next ? "bg-primary/10 text-primary" : "bg-secondary"}`}>
                    {label}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground md:hidden">{item.when}</span>
                </div>
                <h3 className="mt-3 font-heading text-xl font-semibold tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-0.5 text-sm font-semibold text-primary">{item.org}</p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
                {next && (
                  <a href="#contact" className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Let&apos;s talk about a role
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
