"use client";

import { motion, type Variants } from "motion/react";
import { useSyncExternalStore } from "react";

import { NOW, PROFILE } from "@/lib/site-content";

const clock = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 15_000);
  return () => clearInterval(id);
};
const now = () => clock.format(new Date()).toLowerCase();

/* token colours, one dark editor theme in both site themes */
const C = {
  kw: "text-[#c792ea]",
  cls: "text-[#ffcb6b]",
  str: "text-[#c3e88d]",
  num: "text-[#f78c6c]",
  com: "text-[#6b7592] italic",
  op: "text-[#89ddff]",
  id: "text-[#e4e8f4]",
};
type Tok = [keyof typeof C, string];

const s = (v: string): Tok => ["str", `"${v}"`];
const attr = (name: string, value: Tok, comment?: string): Tok[] => [
  ["id", `    ${name} `],
  ["op", "= "],
  value,
  ...(comment ? ([["com", `  # ${comment}`]] as Tok[]) : []),
];

function buildLines(time: string): Tok[][] {
  return [
    [["kw", "class "], ["cls", "Aarush"], ["op", "("], ["cls", "Student"], ["op", "):"]],
    attr("university", s(PROFILE.university)),
    attr("degree", s(PROFILE.degree)),
    attr("graduating", ["num", String(PROFILE.graduating)]),
    attr("local_time", s(time || "--:--"), "IST, Dehradun"),
    [["id", "    open_to "], ["op", "= ["], ["str", '"remote"'], ["op", ", "], ["str", '"on-site"'], ["op", "]"]],
    [],
    [["id", "    now "], ["op", "= ["]],
    ...NOW.map((item): Tok[] => [["id", "        "], s(item.text), ["op", ","], ...(item.done ? ([["com", "  # done"]] as Tok[]) : [])]),
    [["op", "    ]"]],
  ];
}

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } };
const line: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/** A small editor window that introduces me as a Python class, with the live time in Dehradun. */
export function CodeCard() {
  const time = useSyncExternalStore(subscribe, now, () => "");
  const lines = buildLines(time);

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d15] text-[#e4e8f4] shadow-lift">
      <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.025] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff6159]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#28c941]" />
        </span>
        <span className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-0.5 font-mono text-[11px] text-white/80">aarush.py</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">about me</span>
      </div>

      <motion.pre
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        aria-hidden
        className="py-4 font-mono text-[11.5px] leading-[1.75] sm:text-[12.5px]"
      >
        <code className="block">
          {lines.map((toks, i) => {
            // long lines soft-wrap with a hanging indent, like an editor with word wrap on
            const indent = toks[0]?.[1].match(/^ */)?.[0].length ?? 0;
            const body = toks.map(([kind, text], j): Tok => [kind, j === 0 ? text.slice(indent) : text]);
            return (
              <motion.span key={i} variants={line} className="flex pr-4">
                <span className="w-10 shrink-0 select-none pr-4 text-right text-white/20">{i + 1}</span>
                <span className="min-w-0 whitespace-pre-wrap break-words" style={{ paddingLeft: `${indent + 2}ch`, textIndent: "-2ch" }}>
                  {body.map(([kind, text], j) => (
                    <span key={j} className={C[kind]}>
                      {text}
                    </span>
                  ))}
                  {i === lines.length - 1 && <span className="caret ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-[#8f9dff]" />}
                </span>
              </motion.span>
            );
          })}
        </code>
      </motion.pre>

      <p className="sr-only">
        {PROFILE.degree} at {PROFILE.university}, graduating {PROFILE.graduating}. Open to remote or on-site roles. Right now:{" "}
        {NOW.map((n) => (n.done ? `${n.text} (done)` : n.text)).join("; ")}.
      </p>

      <figcaption className="flex items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.025] px-4 py-2 font-mono text-[10px] text-white/45">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
          Python · UTF-8
        </span>
        <span>Dehradun{time && ` · ${time} IST`}</span>
      </figcaption>
    </figure>
  );
}
