"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

export interface WordSegment {
  text: string;
  className?: string;
}

function Word({
  word,
  className,
  progress,
  range,
}: {
  word: string;
  className?: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, ["0.18em", "0em"]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${className ?? ""}`}>
      {word}
    </motion.span>
  );
}

/** Lights up words one after another as `progress` moves through [from, to]. */
export function ScrollWords({
  segments,
  progress,
  from,
  to,
}: {
  segments: WordSegment[];
  progress: MotionValue<number>;
  from: number;
  to: number;
}) {
  const words = segments.flatMap((s) =>
    s.text === "\n"
      ? [{ word: "\n", className: undefined }]
      : s.text.split(" ").filter(Boolean).map((w) => ({ word: w, className: s.className })),
  );
  const real = words.filter((w) => w.word !== "\n").length;
  const step = (to - from) / real;
  let n = 0;

  return (
    <>
      {words.map((w, i) => {
        if (w.word === "\n") return <br key={i} />;
        const start = from + step * n++;
        return (
          <span key={i}>
            <Word word={w.word} className={w.className} progress={progress} range={[start, start + step * 1.6]} />{" "}
          </span>
        );
      })}
    </>
  );
}
