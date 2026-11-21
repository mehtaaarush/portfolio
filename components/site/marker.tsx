"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

/** A yellow highlighter stroke that swipes across the words once they scroll into view. */
export function Marker({
  children,
  delay = 0,
  play,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  /** start on demand instead of when scrolled into view */
  play?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <span ref={ref} data-on={play ?? inView} className={`marker ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </span>
  );
}
