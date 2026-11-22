"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import { HandNote } from "@/components/site/hand";
import { Marker } from "@/components/site/marker";
import { Reveal } from "@/components/site/reveal";
import { links, resumes } from "@/lib/portfolio";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  return (
    <section id="contact" className="px-3 pt-24 sm:px-6 sm:pt-32">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border bg-card px-6 py-14 shadow-paper sm:px-14 sm:py-20">
          <div aria-hidden className="dots absolute inset-0 opacity-60 [mask-image:radial-gradient(120%_90%_at_100%_0%,#000,transparent_65%)]" />
          <div className="relative">
            <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span className="text-primary">05</span>
              <span className="h-px w-8 bg-foreground/20" />
              Contact
            </p>
            <h2 className="mt-5 font-heading text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.045em]">
              Let&apos;s <Marker>talk.</Marker>
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted-foreground">
              I&apos;m looking for 2027 new-grad roles and internships in data science, machine learning and software engineering. Got a role, a project or a question about something on this page? I&apos;d love to hear from you.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${links.email}`}
                className="group inline-flex h-12 min-w-0 items-center gap-2.5 rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-[0_12px_28px_-12px_var(--primary)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 sm:px-6"
              >
                <Mail className="size-[18px] shrink-0" aria-hidden />
                <span className="truncate">{links.email}</span>
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/15 bg-card px-5 font-semibold transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/30"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "copy"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    {copied ? <Check className="size-[18px] text-emerald-600 dark:text-emerald-400" aria-hidden /> : <Copy className="size-[18px]" aria-hidden />}
                    {copied ? "Copied!" : "Copy email"}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to the clipboard" : ""}
              </span>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-muted-foreground">Resume, by role</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {resumes.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex h-10 items-center gap-2 rounded-full border border-foreground/15 bg-card px-4 text-sm font-semibold transition-[translate,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:text-primary"
                  >
                    <FileText className="size-4 shrink-0" aria-hidden />
                    {r.label}
                    <span className="font-mono text-[11px] font-medium text-muted-foreground">PDF</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-dashed pt-6 text-sm font-semibold">
              {[
                ["GitHub", links.github],
                ["LinkedIn", links.linkedin],
                ["LeetCode", links.leetcode],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-primary">
                  {label}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>

          <HandNote arrow="down-left" arrowFirst rotate={-5} delay={0.4} className="absolute right-10 top-16 hidden md:inline-flex lg:right-20">
            even just to say hi is fine
          </HandNote>
        </div>
      </Reveal>
    </section>
  );
}
