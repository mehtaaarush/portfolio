"use client";

import { motion } from "motion/react";

/*
 * Small hand-drawn touches: margin notes, arrows and underlines that
 * "draw themselves" once, like someone annotating their own page.
 */

const ARROWS = {
  "down-right": { d: "M6 6 C 10 34, 34 52, 70 54", head: "M58 44 L71 54 L57 62" },
  "down-left": { d: "M70 6 C 66 34, 42 52, 8 54", head: "M20 44 L7 54 L21 62" },
  up: { d: "M40 58 C 28 44, 30 24, 42 8", head: "M32 16 L42 7 L50 18" },
  right: { d: "M4 30 C 24 14, 50 44, 74 26", head: "M63 20 L75 26 L65 36" },
} as const;

type ArrowDir = keyof typeof ARROWS;

function drawProps(play: boolean | undefined) {
  const hidden = { pathLength: 0, opacity: 0 };
  const shown = { pathLength: 1, opacity: 1 };
  return play === undefined
    ? { initial: hidden, whileInView: shown, viewport: { once: true, margin: "-10% 0px" } }
    : { initial: hidden, animate: play ? shown : hidden };
}

export function HandArrow({
  dir = "down-right",
  className = "",
  delay = 0,
  play,
}: {
  dir?: ArrowDir;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  const a = ARROWS[dir];
  const base = drawProps(play);
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden className={`h-12 w-16 overflow-visible ${className}`}>
      <motion.path
        d={a.d}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        {...base}
        transition={{ duration: 0.7, ease: "easeInOut", delay }}
      />
      <motion.path
        d={a.head}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...base}
        transition={{ duration: 0.25, ease: "easeOut", delay: delay + 0.65 }}
      />
    </svg>
  );
}

/** A slightly tilted handwritten margin note, optionally with an arrow. */
export function HandNote({
  children,
  arrow,
  arrowFirst = false,
  rotate = -4,
  delay = 0,
  play,
  className = "",
}: {
  children: React.ReactNode;
  arrow?: ArrowDir;
  arrowFirst?: boolean;
  rotate?: number;
  delay?: number;
  play?: boolean;
  className?: string;
}) {
  const text = (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      {...(play === undefined
        ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10% 0px" } }
        : { animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 } })}
      transition={{ duration: 0.5, delay: delay + (arrowFirst ? 0.6 : 0) }}
      className="font-hand text-[1.35rem] leading-[1.05] text-ember/90"
    >
      {children}
    </motion.span>
  );
  const drawn = arrow && (
    <HandArrow dir={arrow} play={play} delay={delay + (arrowFirst ? 0 : 0.35)} className="shrink-0 text-ember/70" />
  );
  return (
    <span className={`pointer-events-none inline-flex select-none items-end gap-1 ${className}`} style={{ rotate: `${rotate}deg` }}>
      {arrowFirst ? drawn : text}
      {arrowFirst ? text : drawn}
    </span>
  );
}

/** Wraps a word with a scribbled underline that draws once in view. */
export function HandUnderline({ children, delay = 0.2 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden className="absolute -bottom-[0.28em] left-[-4%] h-[0.4em] w-[108%] overflow-visible text-ember">
        <motion.path
          d="M2 9 C 22 3, 48 12, 72 6 S 108 4, 118 8"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: "easeInOut", delay }}
        />
      </svg>
    </span>
  );
}

/** Handwritten sign-off that writes itself left to right. */
export function Signature({ className = "" }: { className?: string }) {
  return (
    <motion.span
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.4, ease: [0.45, 0, 0.2, 1], delay: 0.3 }}
      className={`inline-block font-hand font-bold leading-none ${className}`}
    >
      — Aarush
    </motion.span>
  );
}
