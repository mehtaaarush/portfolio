"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin cobalt bar across the top of the window that fills as you read down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-primary"
    />
  );
}
