"use client";

import { MotionConfig } from "motion/react";

/** Motion respects the visitor's reduced-motion setting everywhere: transforms are skipped, fades stay. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
