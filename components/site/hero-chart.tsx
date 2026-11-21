"use client";

import { motion } from "motion/react";

/*
 * A small hand-drawn time series under the hero: a solid history line, then a
 * dashed forecast with its uncertainty band. The data is synthetic (weekly
 * seasonality plus trend and noise) and generated deterministically, so the
 * server and the browser draw the same picture.
 */

const W = 1200;
const H = 170;
const N = 64;
const SPLIT = 49; // last observed point; the rest is forecast

function makeSeries() {
  let seed = 11;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: N }, (_, i) => {
    const trend = 40 + i * 0.42;
    const season = 8 * Math.sin((i / 7) * Math.PI * 2) + 3 * Math.sin((i / 3.5) * Math.PI * 2 + 1);
    const noise = i <= SPLIT ? (rand() - 0.5) * 8 : 0;
    return trend + season + noise;
  });
}

const values = makeSeries();
const lo = Math.min(...values) - 10;
const hi = Math.max(...values) + 12;
const px = (i: number) => (i / (N - 1)) * W;
const py = (v: number) => H - 12 - ((v - lo) / (hi - lo)) * (H - 24);

/** Catmull-Rom spline through the points, as cubic Bézier segments. */
function smooth(points: [number, number][]) {
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const pts = values.map((v, i) => [px(i), py(v)] as [number, number]);
const history = smooth(pts.slice(0, SPLIT + 1));
const forecast = smooth(pts.slice(SPLIT));
const band = (() => {
  const upper = pts.slice(SPLIT).map(([x, y], k) => [x, y - 4 - k * 2.2] as [number, number]);
  const lower = pts.slice(SPLIT).map(([x, y], k) => [x, y + 4 + k * 2.2] as [number, number]).reverse();
  return `${smooth(upper)} L${lower.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")} Z`;
})();
const end = pts[N - 1];
const splitX = (SPLIT / (N - 1)) * 100;

export function HeroChart() {
  return (
    <figure aria-hidden className="relative mx-auto mt-14 max-w-6xl px-5 sm:mt-16 sm:px-8">
      <motion.div
        initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
        animate={{
          clipPath: [
            "inset(-20% 100% -20% 0)",
            `inset(-20% ${100 - splitX}% -20% 0)`,
            `inset(-20% ${100 - splitX}% -20% 0)`,
            "inset(-20% -2% -20% 0)",
          ],
        }}
        transition={{ duration: 2.8, times: [0, 0.6, 0.68, 1], ease: ["easeInOut", "linear", "easeOut"], delay: 0.6 }}
        className="relative"
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-[72px] w-full overflow-visible sm:h-[110px] lg:h-[130px]">
          {/* weekly ticks on the baseline */}
          {Array.from({ length: Math.floor(N / 7) + 1 }, (_, k) => (
            <line key={k} x1={px(k * 7)} x2={px(k * 7)} y1={H - 2} y2={H + 6} className="stroke-foreground/25" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
          <line x1={0} x2={W} y1={H - 2} y2={H - 2} className="stroke-foreground/20" strokeWidth={1} strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />
          <line x1={px(SPLIT)} x2={px(SPLIT)} y1={6} y2={H - 2} className="stroke-foreground/20" strokeWidth={1} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
          <path d={band} className="fill-primary/10" />
          <path d={history} fill="none" className="stroke-foreground/70" strokeWidth={2.25} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={forecast} fill="none" className="stroke-primary" strokeWidth={2.25} strokeDasharray="7 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(end[0] / W) * 100}%`, top: `${(end[1] / H) * 100}%` }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
          <span className="absolute inset-0 rounded-full border-2 border-card bg-primary" />
        </span>
      </motion.div>
      <figcaption className="mt-4 flex items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
        <span>fig. 1 · a time series with a 14-day forecast</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-foreground/70" />observed</span>
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded border-t-2 border-dashed border-primary" />forecast</span>
        </span>
      </figcaption>
    </figure>
  );
}
