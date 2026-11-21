"use client";

import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useSyncExternalStore } from "react";

import { NOW } from "@/lib/site-content";

const clock = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 15_000);
  return () => clearInterval(id);
};
const now = () => clock.format(new Date());

/** A hand-drawn checkbox; the tick draws itself when the card scrolls into view. */
function Box({ done, delay }: { done?: boolean; delay: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="mt-1 size-[22px] shrink-0 overflow-visible text-foreground/70">
      <path d="M3.5 4.2 C 9 3.4, 15 3.5, 20.2 4 C 20.7 9.5, 20.6 14.5, 20 20.1 C 14.5 20.6, 9 20.5, 3.9 20 C 3.3 14.5, 3.2 9.5, 3.5 4.2 Z" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      {done && (
        <motion.path
          d="M6.5 12.5 L 10.5 16.5 L 19 5"
          className="text-pen"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay }}
        />
      )}
    </svg>
  );
}

/** The "Currently" sticky note: a short to-do list plus the local time in Dehradun. */
export function NowCard() {
  const time = useSyncExternalStore(subscribe, now, () => "");
  return (
    <div className="relative rotate-1 rounded-[4px] bg-sticky px-6 pb-6 pt-8 shadow-lift transition-[rotate] duration-500 hover:rotate-0">
      <span aria-hidden className="tape absolute -top-3 left-10 h-6 w-24 -rotate-6" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-hand text-[2rem] font-bold leading-none">Currently</h3>
        <p className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
          <MapPin className="size-3" aria-hidden />
          Dehradun{time && <> · {time} IST</>}
        </p>
      </div>
      <ul className="mt-5 space-y-3">
        {NOW.map((item, i) => (
          <li key={item.text} className="flex gap-3">
            <Box done={item.done} delay={0.3 + i * 0.15} />
            <span className={`font-hand text-[1.4rem] leading-[1.15] ${item.done ? "text-foreground/60" : ""}`}>
              {item.done && <span className="sr-only">Done: </span>}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-dashed border-foreground/20 pt-4 text-sm text-foreground/80">
        Remote or on-site, both work for me.
      </p>
    </div>
  );
}
