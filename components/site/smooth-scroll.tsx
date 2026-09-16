"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Inertial smooth scrolling for the whole page; anchor links glide instead of jumping. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, anchors: true });
    window.__lenis = lenis;
    if (!window.__introDone) lenis.stop();
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}
