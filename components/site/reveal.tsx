"use client";

import { motion } from "motion/react";

import { EASE_OUT } from "@/lib/motion";

/** Slides content up out of a mask the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0, filter: "blur(6px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
