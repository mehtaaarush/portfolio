import type Lenis from "lenis";

/** Seconds the preloader occupies before the hero starts animating in. */
export const INTRO_DELAY = 1.45;

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

declare global {
  interface Window {
    __lenis?: Lenis;
    __introDone?: boolean;
  }
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
