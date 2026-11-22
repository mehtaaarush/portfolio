"use client";

import { ChevronDown, FileText } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { EASE_OUT } from "@/lib/motion";
import { resumes } from "@/lib/portfolio";

const MENU_WIDTH = 288;

/** A button that opens the three role-specific resumes. */
export function ResumeMenu() {
  const [open, setOpen] = useState(false);
  // open toward the left when the button sits too close to the right edge (on phones the row wraps)
  const [alignEnd, setAlignEnd] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          const r = button.current?.getBoundingClientRect();
          if (r) setAlignEnd(r.left + MENU_WIDTH > window.innerWidth - 16);
          setOpen((o) => !o);
        }}
        className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/15 bg-card/80 px-5 font-semibold transition-[translate,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-card"
      >
        <FileText className="size-[18px]" aria-hidden />
        Resume
        <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            style={{ width: MENU_WIDTH }}
            className={`absolute top-full z-30 mt-2 max-w-[calc(100vw-2.5rem)] rounded-2xl border bg-card p-1.5 shadow-lift ${alignEnd ? "right-0 origin-top-right" : "left-0 origin-top-left"}`}
          >
            {resumes.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:bg-secondary"
                >
                  {r.label}
                  <span className="font-mono text-[11px] font-medium text-muted-foreground">PDF</span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
