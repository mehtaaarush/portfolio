"use client";

import { motion, type Variants } from "motion/react";

import { EASE_OUT } from "@/lib/motion";

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 0.75, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const group: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({ transition: { staggerChildren: 0.08, delayChildren: delay } }),
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const tags = { div: motion.div, ul: motion.ul, ol: motion.ol } as const;

/** Reveals its <StaggerItem> children one after another. */
export function Stagger({
  children,
  as = "div",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  as?: keyof typeof tags;
  delay?: number;
  className?: string;
}) {
  const Tag = tags[as];
  return (
    <Tag variants={group} custom={delay} initial="hidden" whileInView="show" viewport={VIEWPORT} className={className}>
      {children}
    </Tag>
  );
}

const itemTags = { div: motion.div, li: motion.li } as const;

export function StaggerItem({
  children,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  as?: keyof typeof itemTags;
  className?: string;
}) {
  const Tag = itemTags[as];
  return (
    <Tag variants={staggerItem} className={className}>
      {children}
    </Tag>
  );
}
