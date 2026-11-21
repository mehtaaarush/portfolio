import type Lenis from "lenis";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
