"use client";

import { ArrowUp, AtSign, CodeXml, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import "@/lib/motion";

const links = [
  { href: "#focus", label: "Focus" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#journey", label: "Journey" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

function useClock() {
  const [now, setNow] = useState<string>("--:--:--");
  const [hour, setHour] = useState<number | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => {
      const t = fmt.format(new Date());
      setNow(t);
      setHour(Number(t.slice(0, 2)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return { now, hour };
}

function statusFor(hour: number | null) {
  if (hour === null) return "";
  if (hour < 7) return "probably asleep";
  if (hour < 10) return "early start";
  if (hour < 19) return "probably building";
  return "debugging something";
}

export function Nav() {
  const { now: time, hour } = useClock();
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-[#0c0c0d]/80 pl-5 pr-2 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] backdrop-blur-xl">
          <p className="font-mono text-lg font-medium tracking-[0.08em] tabular-nums" aria-label={`Local time in Dehradun ${time}`}>
            {time}
            <span className="ml-2 hidden text-[10px] tracking-[0.2em] text-muted-foreground sm:inline">IST</span>
            <span className="ml-3 hidden font-hand text-base font-medium tracking-normal text-muted-foreground md:inline">
              {statusFor(hour) && `· ${statusFor(hour)}`}
            </span>
          </p>
          <nav className="flex items-center gap-1" aria-label="Quick links">
            <a
              href="https://github.com/mehtaaarush"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <CodeXml className="size-4" />
            </a>
            <a
              href="mailto:aarushmehta902@gmail.com"
              aria-label="Email"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <AtSign className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <Menu className="size-4" />
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#f2f2f0] px-6 pb-6 text-[#0a0a0a] sm:px-12"
          >
            {/* mirrors the nav bar exactly, so the close button lands where the menu button was */}
            <div className="-mx-6 px-3 pt-3 sm:-mx-12 sm:px-6 sm:pt-5">
              <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-black/10 pl-5 pr-2">
                <p className="font-mono text-xs uppercase tracking-[0.2em]">Menu</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full bg-black text-white transition-transform hover:rotate-90"
                  autoFocus
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <ul className="mt-auto flex flex-col">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="border-t border-black/10"
                >
                  <a
                    href={l.href}
                    onClick={(e) => {
                      const lenis = window.__lenis;
                      setOpen(false);
                      if (!lenis) return;
                      e.preventDefault();
                      e.stopPropagation();
                      lenis.start();
                      lenis.scrollTo(l.href, { duration: 1.6, force: true });
                    }}
                    className="group flex items-baseline justify-between py-2 text-[clamp(2.4rem,8vw,6rem)] font-extrabold uppercase leading-none tracking-tighter"
                  >
                    <span className="transition-transform group-hover:translate-x-3">{l.label}</span>
                    <span className="font-mono text-xs font-normal tracking-normal text-black/40">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-black/50">
              Dehradun, IN · aarushmehta902@gmail.com
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            aria-label="Back to top"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-white text-black shadow-lg"
          >
            <ArrowUp className="size-5" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
