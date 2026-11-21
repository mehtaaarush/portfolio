import { ArrowUp, Award, BrainCircuit, ChartSpline, Code, Layers, Rocket, ScanEye, type LucideIcon } from "lucide-react";

import { Contact } from "@/components/site/contact";
import { CountUp } from "@/components/site/count-up";
import { GithubStats } from "@/components/site/github-stats";
import { Signature } from "@/components/site/hand";
import { Hero } from "@/components/site/hero";
import { Marker } from "@/components/site/marker";
import { Nav } from "@/components/site/nav";
import { NowCard } from "@/components/site/now-card";
import { Projects } from "@/components/site/projects";
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SectionHeading } from "@/components/site/section-heading";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Timeline } from "@/components/site/timeline";
import { certifications, featured, skills } from "@/lib/portfolio";

const facts = [
  { value: featured.length, label: "projects on this page" },
  { value: featured.filter((w) => w.live).length, label: "with a live demo" },
  { value: 2, label: "internships, incl. IIT Roorkee" },
  { value: 2027, from: 2023, label: "graduating, B.Tech CSE" },
];

const focus: { icon: LucideIcon; title: string; text: string; tags: string[] }[] = [
  {
    icon: ChartSpline,
    title: "Data science & ML",
    text: "Good models start with the data. I begin with SQL and EDA, validate the way the model will be used, out of time rather than on shuffled rows, and choose metrics that fit the problem: recall when a missed fraud case is the expensive mistake, uplift when the question is whom to target.",
    tags: ["SQL & EDA", "Forecasting", "A/B testing & uplift", "Scikit-Learn & XGBoost"],
  },
  {
    icon: BrainCircuit,
    title: "Retrieval & agents",
    text: "RAG pipelines and tool-using agents that stay grounded. That means sentence-aware chunking, tuned similarity thresholds, citations on every answer, and an LLM-as-judge harness that measures faithfulness instead of assuming it.",
    tags: ["RAG pipelines", "LangGraph agents", "Vector search", "LLM evaluation"],
  },
  {
    icon: Rocket,
    title: "Shipping products",
    text: "A model nobody can use is just a notebook. So I build the rest too: Next.js clients, containerized FastAPI services, PostgreSQL with versioned migrations, and REST contracts that keep them talking.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
  },
];

const SKILL_ICONS: Record<string, LucideIcon> = {
  "Data science": ChartSpline,
  "Generative AI": BrainCircuit,
  "Vision & deep learning": ScanEye,
  "Web & deployment": Layers,
  "Languages & core CS": Code,
};

const tape = ["Python", "SQL", "Pandas", "Scikit-Learn", "XGBoost", "Statsmodels", "PyTorch", "LangGraph", "FAISS", "DuckDB", "Plotly", "FastAPI", "Next.js", "Docker"];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <Nav />

      <main className="flex-1">
        <Hero />

        {/* at a glance */}
        <section aria-label="At a glance" className="px-5 pt-14 sm:px-8 sm:pt-20">
          <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-paper md:grid-cols-4">
            {facts.map((f) => (
              <StaggerItem key={f.label} className="bg-card p-5 sm:p-7">
                <p className="font-heading text-[clamp(2.2rem,4.4vw,3.2rem)] font-bold leading-none tracking-[-0.04em]">
                  <CountUp value={f.value} from={f.from} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{f.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* about */}
        <section id="about" className="px-5 pt-28 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
              <div>
                <SectionHeading
                  n="01"
                  label="About me"
                  title={
                    <>
                      Curious about data, <Marker>careful with results.</Marker>
                    </>
                  }
                />
                <Reveal delay={0.1} className="mt-7 max-w-[62ch] space-y-4 text-[17px] leading-relaxed text-foreground/85">
                  <p>
                    I&apos;m a final-year CS student at UPES Dehradun, majoring in Data Science &amp; AI/ML and graduating in 2027. What pulled me into AI was the gap between a cool demo and something you can actually rely on.
                  </p>
                  <p>
                    So far that&apos;s meant a document Q&amp;A app that would rather say &ldquo;I don&apos;t know&rdquo; than guess, a research agent that gets graded by its own evaluator, a vision project from my research internship at IIT Roorkee, and three data science case studies, from ridership forecasts to an A/B test, each with a live dashboard.
                  </p>
                  <p>
                    Next, I&apos;d like to join a team where I can learn from strong engineers and ship work that people use.
                  </p>
                  <Signature className="pt-2 text-[2.2rem] text-foreground" />
                </Reveal>
              </div>
              <Reveal delay={0.2} className="lg:pt-10">
                <NowCard />
              </Reveal>
            </div>

            <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-3">
              {focus.map((f, i) => (
                <StaggerItem key={f.title}>
                  <div className="group h-full rounded-2xl border bg-card p-6 shadow-paper transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lift sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <f.icon className="size-5" aria-hidden />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-semibold tracking-[-0.01em]">{f.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{f.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {f.tags.map((t) => (
                        <li key={t} className="rounded-md border bg-background/70 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* projects */}
        <section id="projects" className="px-5 pt-28 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              n="02"
              label="Projects"
              title="Things I’ve built"
              intro="From forecasting and experiments to RAG agents and full-stack apps. Most of them have a live demo; open any card for the full story."
            />
            <Projects />
          </div>
        </section>

        {/* experience */}
        <section id="experience" className="px-5 pt-28 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              n="03"
              label="Experience"
              title="Experience & education"
              intro="Two internships, a degree in its final year and a lot of projects in between."
            />
            <Timeline />
          </div>
        </section>

        {/* masking-tape marquee */}
        <div className="overflow-hidden py-24 sm:py-32">
          <p className="sr-only">Tools I use most: {tape.join(", ")}</p>
          <div
            aria-hidden
            className="relative left-1/2 w-[120vw] -translate-x-1/2 -rotate-2 border-y border-[#16213a]/10 bg-[#ffe27a] py-3.5 text-[#16213a] shadow-paper dark:bg-[#e8cd5c]"
          >
            <div className="marquee flex w-max">
              {[0, 1].map((k) => (
                <div key={k} className="flex shrink-0 items-center">
                  {tape.map((t) => (
                    <span key={t} className="flex items-center gap-7 pr-7 font-heading text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
                      {t}
                      <span className="text-[#16213a]/35">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* skills */}
        <section id="skills" className="px-5 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading n="04" label="Skills" title="My toolkit" intro="The libraries and tools I reach for, grouped by what I use them for." />
            <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((s) => {
                const Icon = SKILL_ICONS[s.group] ?? Code;
                return (
                  <StaggerItem key={s.group}>
                    <div className="h-full rounded-2xl border bg-card p-6 shadow-paper">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-[18px]" aria-hidden />
                        </span>
                        <h3 className="font-heading text-lg font-semibold">{s.group}</h3>
                        <span className="ml-auto font-mono text-xs text-muted-foreground">{s.items.length}</span>
                      </div>
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {s.items.map((t) => (
                          <li
                            key={t}
                            className="cursor-default rounded-lg border bg-background/70 px-2.5 py-1 text-[13px] font-medium transition-[translate,border-color,color,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                );
              })}
              <StaggerItem>
                <div className="h-full rounded-2xl border border-dashed bg-tint-ai/60 p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-card text-primary shadow-paper">
                      <Award className="size-[18px]" aria-hidden />
                    </span>
                    <h3 className="font-heading text-lg font-semibold">Certifications</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {certifications.map((c) => (
                      <li key={c.title} className="rounded-xl border bg-card p-4 shadow-paper">
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{c.by}</p>
                        <p className="mt-1 font-semibold leading-snug">{c.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* github */}
        <section id="github" className="px-5 pt-28 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <GithubStats />
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground sm:px-8">
        <p>© 2026 Aarush Mehta · built in Dehradun with Next.js &amp; Motion</p>
        <a href="#top" className="group inline-flex items-center gap-1.5 font-medium transition-colors hover:text-foreground">
          Back to top
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </footer>
    </>
  );
}
