"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

import { HandNote } from "@/components/site/hand";
import { HeroChart } from "@/components/site/hero-chart";
import { Marker } from "@/components/site/marker";
import { links } from "@/lib/portfolio";
import { AVAILABILITY, HERO } from "@/lib/site-content";

/* The hero text enters with a CSS animation (.rise in globals.css), so it shows on first paint without waiting for JavaScript. */
const delay = (s: number) => ({ animationDelay: `${s}s` });

function StickyNote({
  children,
  className,
  rotate,
  delay,
  tone = "yellow",
}: {
  children: React.ReactNode;
  className: string;
  rotate: number;
  delay: number;
  tone?: "yellow" | "blue";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.25, rotate: rotate * 3 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
      className={`absolute z-10 ${className}`}
    >
      <div
        className={`bob rounded-[3px] px-3.5 py-3 shadow-paper ${
          tone === "yellow" ? "bg-sticky" : "bg-tint-ai"
        }`}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Polaroid() {
  return (
    <div className="relative mx-auto w-[min(72vw,330px)] lg:mr-4 lg:ml-auto">
      <HandNote
        arrow="down-right"
        rotate={-8}
        delay={1.5}
        play
        className="absolute -left-28 -top-12 hidden xl:inline-flex"
      >
        hi, that&apos;s me!
      </HandNote>

      <motion.div
        initial={{ opacity: 0, y: 50, rotate: 9, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, rotate: 2.5, scale: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.3 }}
      >
        <figure className="relative rounded-[4px] bg-polaroid p-3 pb-14 shadow-lift transition-[rotate,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-rotate-3 hover:scale-[1.025]">
          <span aria-hidden className="tape absolute -top-3.5 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3" />
          <div className="relative aspect-square overflow-hidden rounded-[2px] bg-muted">
            <Image
              src="/aarush.png"
              alt="Aarush Mehta sitting at a table on a boat deck on a sunny day"
              fill
              sizes="(min-width: 1024px) 330px, 72vw"
              loading="eager"
              className="object-cover"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-3 text-center font-hand text-[1.6rem] font-bold leading-none text-[#16213a]">
            Aarush · CSE ’27
          </figcaption>
        </figure>
      </motion.div>

      <StickyNote rotate={-6} delay={1.0} className="-left-6 top-8 sm:-left-16">
        <p className="font-heading text-2xl font-bold leading-none tracking-tight text-foreground">4.3%</p>
        <p className="mt-1 max-w-[12ch] font-mono text-[10px] uppercase leading-snug tracking-wide text-muted-foreground">forecast error (WAPE), ridership</p>
      </StickyNote>
      <StickyNote rotate={5} delay={1.2} tone="blue" className="-right-5 bottom-24 sm:-right-12">
        <p className="font-heading text-2xl font-bold leading-none tracking-tight text-foreground">+$0.77</p>
        <p className="mt-1 max-w-[12ch] font-mono text-[10px] uppercase leading-snug tracking-wide text-muted-foreground">lift per customer, A/B test</p>
      </StickyNote>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
        <div>
          <p
            style={delay(0.05)}
            className="rise inline-flex items-center gap-2.5 rounded-full border bg-card/80 py-1.5 pl-3 pr-4 text-sm font-medium shadow-paper backdrop-blur"
          >
            {AVAILABILITY.open && (
              <span className="relative flex size-2.5" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
            )}
            {AVAILABILITY.text}
          </p>

          <h1 className="mt-7 font-heading">
            <span
              style={delay(0.15)}
              className="rise block text-[clamp(3rem,7.2vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            >
              {HERO.hello}
            </span>
            <span
              style={delay(0.28)}
              className="rise mt-4 block max-w-[24ch] text-[clamp(1.55rem,3vw,2.45rem)] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground/85"
            >
              {HERO.lead} <Marker delay={0.9}>{HERO.highlight}</Marker>
            </span>
          </h1>

          <p style={delay(0.4)} className="rise mt-6 max-w-[58ch] text-[17px] leading-relaxed text-muted-foreground">
            {HERO.intro}
          </p>

          <div style={delay(0.52)} className="rise mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-[0_12px_28px_-12px_var(--primary)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-12px_var(--primary)]"
            >
              See my projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full border border-foreground/15 bg-card/80 px-6 font-semibold transition-[translate,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-card"
            >
              Get in touch
            </a>
            <span className="flex items-center gap-4 px-2 text-sm font-semibold text-muted-foreground">
              {[
                ["GitHub", links.github],
                ["LinkedIn", links.linkedin],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-0.5 transition-colors hover:text-foreground">
                  {label}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </span>
          </div>
        </div>

        <Polaroid />
      </div>

      <HeroChart />
    </section>
  );
}
