import {
  siDocker,
  siDuckdb,
  siFastapi,
  siGit,
  siGooglegemini,
  siJupyter,
  siLangchain,
  siLanggraph,
  siNextdotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPlotly,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRender,
  siScikitlearn,
  siScipy,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

/* Two rows of the tools I use, drifting in opposite directions. Logos sit in grey and pick up their brand colour on hover. */
const rows: { label: string; icon: SimpleIcon }[][] = [
  [
    { label: "Python", icon: siPython },
    { label: "Pandas", icon: siPandas },
    { label: "NumPy", icon: siNumpy },
    { label: "scikit-learn", icon: siScikitlearn },
    { label: "SciPy", icon: siScipy },
    { label: "PyTorch", icon: siPytorch },
    { label: "OpenCV", icon: siOpencv },
    { label: "Jupyter", icon: siJupyter },
    { label: "Plotly", icon: siPlotly },
    { label: "DuckDB", icon: siDuckdb },
    { label: "LangChain", icon: siLangchain },
    { label: "LangGraph", icon: siLanggraph },
  ],
  [
    { label: "Gemini API", icon: siGooglegemini },
    { label: "FastAPI", icon: siFastapi },
    { label: "PostgreSQL", icon: siPostgresql },
    { label: "Docker", icon: siDocker },
    { label: "Next.js", icon: siNextdotjs },
    { label: "React", icon: siReact },
    { label: "TypeScript", icon: siTypescript },
    { label: "Tailwind CSS", icon: siTailwindcss },
    { label: "Git", icon: siGit },
    { label: "Vercel", icon: siVercel },
    { label: "Render", icon: siRender },
  ],
];

/** Brand colours that would vanish on a dark page (Next.js, Vercel, NumPy navy…) fall back to the text colour. */
function brand(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.25 ? "var(--foreground)" : `#${hex}`;
}

function Row({ items, reverse }: { items: (typeof rows)[number]; reverse?: boolean }) {
  return (
    <div className="fade-x marquee-pause overflow-hidden">
      <div className="marquee flex w-max" style={reverse ? { animationDirection: "reverse", animationDuration: "52s" } : undefined}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-3 pr-3">
            {items.map(({ label, icon }) => (
              <li
                key={label}
                style={{ "--brand": brand(icon.hex) } as React.CSSProperties}
                className="group/tool inline-flex items-center gap-2.5 rounded-full border bg-card/60 py-2 pl-3 pr-4 text-sm font-medium text-muted-foreground transition-[color,border-color,background-color] duration-300 hover:border-[color-mix(in_oklab,var(--brand)_45%,transparent)] hover:bg-card hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-[18px] fill-current transition-colors duration-300 group-hover/tool:text-(--brand)">
                  <path d={icon.path} />
                </svg>
                {label}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function ToolStrip() {
  return (
    <section aria-label="Tools I work with" className="pt-16 sm:pt-20">
      <p className="px-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Tools I reach for</p>
      <p className="sr-only">{rows.flat().map((t) => t.label).join(", ")}</p>
      <div aria-hidden className="mx-auto mt-6 max-w-[1400px] space-y-3">
        <Row items={rows[0]} />
        <Row items={rows[1]} reverse />
      </div>
    </section>
  );
}
