"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

import { EASE_IN_OUT } from "@/lib/motion";

/** Count-to-100 intro that wipes upward to reveal the hero. */
export function Preloader() {
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const bar = useTransform(count, (v) => v / 100);

  useEffect(() => {
    window.scrollTo(0, 0);
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.__introDone = true;
      window.__lenis?.start();
      setDone(true);
    };
    const controls = animate(count, 100, {
      duration: 0.95,
      ease: [0.65, 0, 0.35, 1],
      onComplete: finish,
    });
    // animation frames pause in background tabs; never leave the page locked behind the intro
    const fallback = setTimeout(finish, 3000);
    return () => {
      controls.stop();
      clearTimeout(fallback);
    };
  }, [count]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: EASE_IN_OUT }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#f2f2f0] p-6 text-[#0a0a0a] sm:p-10"
          aria-hidden
        >
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.25em]">
            <span>Aarush Mehta</span>
            <span className="text-black/50">Portfolio — 2026</span>
          </div>
          <div>
            <motion.p className="text-[clamp(5rem,22vw,18rem)] font-black leading-[0.8] tracking-[-0.06em] tabular-nums">
              {label}
            </motion.p>
            <div className="mt-6 h-px w-full bg-black/15">
              <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-black" />
            </div>
            <p className="mt-3 font-hand text-2xl text-black/60">hey, thanks for stopping by, one sec…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
