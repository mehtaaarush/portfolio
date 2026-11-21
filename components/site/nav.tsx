"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/site/theme-toggle";
import { EASE_OUT } from "@/lib/motion";

const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/** Sticky header that tightens into a floating bar once you scroll, with a pill that follows the section you're reading. */
export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // scroll-spy: the section crossing a band just above the middle of the screen is "active"
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    const top = document.getElementById("top");
    const heroObserver = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-40% 0px -55% 0px" });
    if (top) heroObserver.observe(top);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main"
        className={`mx-auto flex items-center justify-between gap-3 rounded-2xl border py-2 pl-3 pr-2 transition-[max-width,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || open
            ? "max-w-5xl border-border bg-card/85 shadow-paper backdrop-blur-md"
            : "max-w-6xl border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Aarush Mehta, back to top">
          <span className="grid size-9 place-items-center rounded-xl bg-foreground font-heading text-sm font-bold text-background transition-transform duration-300 group-hover:-rotate-6">
            AM
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-[15px] font-semibold">Aarush Mehta</span>
            <span className="block font-mono text-[10.5px] text-muted-foreground">B.Tech CSE · Class of 2027</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative isolate block rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Let&apos;s talk <ArrowUpRight className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border bg-card/70 md:hidden"
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 -z-10 bg-background/40 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="menu"
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="mx-auto mt-2 max-w-5xl origin-top rounded-2xl border bg-card p-2 shadow-lift md:hidden"
            >
              <ul>
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.35, ease: EASE_OUT }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium ${
                        active === l.id ? "bg-secondary text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {l.label}
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
