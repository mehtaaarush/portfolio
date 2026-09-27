import { ArrowUpRight, Award } from "lucide-react";

import { GithubStats } from "@/components/site/github-stats";
import { HandNote, HandUnderline, Signature } from "@/components/site/hand";
import { Nav } from "@/components/site/nav";
import { Preloader } from "@/components/site/preloader";
import { ProjectStack } from "@/components/site/project-stack";
import { Reveal } from "@/components/site/reveal";
import {
  AboutScene,
  FeaturesScene,
  HeroFocusScene,
  JourneyScene,
  StackPanel,
  StatsScene,
} from "@/components/site/scenes";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { skills, works } from "@/lib/portfolio";

const EMAIL = "aarushmehta902@gmail.com";
const featured = works.filter((w) => !["path-planning", "deploy"].includes(w.slug));
const toolCount = skills.reduce((n, s) => n + s.items.length, 0);
const projectCount = featured.length;

const rowA = ["Python", "PyTorch", "LangChain", "LangGraph", "FAISS", "OpenCV", "DINOv2", "Gemini API", "Scikit-Learn", "Transformers"];
const rowB = ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Alembic", "Tailwind CSS", "Vercel", "Render", "Git"];

const journey = [
  { when: "2023", title: "Started B.Tech CSE", org: "UPES Dehradun · Data Science & AI/ML", text: "Core CS plus the Data Science & AI/ML specialization: data structures and algorithms, DBMS, operating systems, networks and machine learning." },
  { when: "Jun – Jul 2024", title: "Web Development Intern", org: "Indianeers Private Ltd", text: "Designed and deployed the company website, indianeers.org, and restructured Excel data models for faster retrieval." },
  { when: "2026", title: "Shipped DocIntel & Agentic RAG", org: "Independent projects", text: "A deployed three-tier document Q&A platform, plus a LangGraph research agent that scored 1.0 on faithfulness." },
  { when: "Jun – Jul 2026", title: "Research Intern", org: "IIT Roorkee", text: "Built a vision-based localization pipeline using DINOv2 embeddings and FAISS retrieval, with A* path planning and optical-flow fusion." },
  { when: "2027", title: "Graduating", org: "UPES Dehradun", text: "Looking for SWE and ML roles where I can ship AI systems end to end." },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]">
      <span className="size-1.5 rounded-full bg-ember" />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Nav />
      <main>
        <HeroFocusScene />

        {/* focus detail, continuing the frame */}
        <section className="px-4 pb-24 sm:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 border-x border-b border-white/10 px-6 py-12 sm:px-14 md:grid-cols-3">
            <Reveal>
              <p className="text-xl leading-snug">
                I build AI that has to be <HandUnderline><em className="font-serif text-[1.15em]">right</em></HandUnderline>, then put it somewhere real people can use it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em]">Research to runtime</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                From EDA and feature engineering to FAISS indexes and an evaluation harness that proves the system works. Every project ends with a number, not a claim.
              </p>
              <p className="mt-4 font-serif text-lg italic text-ember">Measured, not assumed.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em]">End-to-end</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Async ingestion pipelines, typed REST contracts, Dockerized services and managed Postgres, deployed on Vercel and Render.
              </p>
              <Signature className="mt-4 text-3xl text-foreground" />
            </Reveal>
          </div>
        </section>

        <StatsScene toolCount={toolCount} projectCount={projectCount} />

        <AboutScene />

        {/* tech marquee */}
        <section className="overflow-hidden pb-24">
          <div className="flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-label="Technologies">
            <p className="sr-only">{[...rowA, ...rowB].join(", ")}</p>
            {[rowA, rowB].map((row, r) => (
              <div key={r} className="flex w-max gap-4" aria-hidden>
                <div className={`flex gap-4 ${r ? "marquee-rev" : "marquee"}`}>
                  {[...row, ...row].map((t, i) => (
                    <span key={i} className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-card px-6 py-3 text-lg font-semibold">
                      <span className={`size-2 rounded-full ${i % 3 === 0 ? "bg-ember" : i % 3 === 1 ? "bg-volt" : "bg-emerald-400"}`} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <FeaturesScene />

        {/* work */}
        <section id="work" className="pt-28">
          <Reveal className="mx-auto max-w-6xl px-5 text-center sm:px-10">
            <Pill>Selected work</Pill>
            <h2 className="mx-auto mt-8 max-w-[20ch] text-[clamp(2rem,4.6vw,3.8rem)] font-extrabold leading-[1.02] tracking-tighter text-balance">
              {projectCount} builds, from raw data to production.{" "}
              <span className="font-serif font-normal italic text-muted-foreground">Keep scrolling.</span>
            </h2>
            <HandNote arrow="down-left" rotate={-3} className="mt-3 justify-center">
              the first one is live, go poke at it
            </HandNote>
          </Reveal>
          <ProjectStack works={featured} />
        </section>

        <JourneyScene items={journey} />

        {/* panels that slide over each other */}
        <div className="relative">
          <StackPanel>
            <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-10">
              <Reveal>
                <Pill>Certifications</Pill>
                <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tighter">
                  Verified by <span className="font-serif font-normal italic">industry.</span>
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-4 md:grid-cols-2">
                {[
                  { by: "Microsoft Applied Skills", title: "Developing Agents in Microsoft Foundry" },
                  { by: "IBM SkillsBuild", title: "Retrieval-Augmented Generation for Enhanced AI Outputs" },
                ].map((c, i) => (
                  <Reveal key={c.title} delay={i * 0.12}>
                    <div className="flex h-full items-start gap-5 rounded-3xl border border-white/10 bg-card p-7 transition-colors hover:border-white/25">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/5">
                        <Award className="size-6 text-ember" />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.by}</p>
                        <h3 className="mt-2 text-xl font-bold leading-snug">{c.title}</h3>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </StackPanel>

          <StackPanel id="github">
            <div className="mx-auto w-full max-w-6xl border-t border-white/10 px-5 py-24 sm:px-10">
              <GithubStats />
            </div>
          </StackPanel>

          <StackPanel id="contact" last>
            <div className="px-3 py-3 sm:px-6 sm:py-6">
              <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#f2f2f0] px-6 py-16 text-[#0a0a0a] sm:px-14 sm:py-24">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">Have a role or an idea?</p>
                  <p className="-rotate-2 font-hand text-2xl text-black/60">even just to say hi, that&apos;s fine too</p>
                </div>
                <a href={`mailto:${EMAIL}`} className="group mt-6 block">
                  <Reveal>
                    <span className="block text-[clamp(3.6rem,15vw,13rem)] font-black uppercase leading-[0.82] tracking-[-0.06em]">
                      Let&apos;s
                    </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <span className="flex items-center gap-[0.15em] text-[clamp(3.6rem,15vw,13rem)] font-black uppercase leading-[0.82] tracking-[-0.06em]">
                      talk
                      <span className="grid size-[0.7em] place-items-center rounded-full bg-black text-white transition-all group-hover:rotate-45 group-hover:bg-ember group-hover:text-black">
                        <ArrowUpRight className="size-[0.45em]" strokeWidth={2.5} />
                      </span>
                    </span>
                  </Reveal>
                </a>
                <div className="mt-14 grid gap-6 border-t border-black/15 pt-8 font-mono text-xs uppercase tracking-[0.14em] sm:grid-cols-3">
                  <a href={`mailto:${EMAIL}`} className="normal-case tracking-normal hover:text-ember">{EMAIL}</a>
                  <div className="flex flex-wrap gap-5">
                    {[
                      ["GitHub", "https://github.com/mehtaaarush"],
                      ["LinkedIn", "https://linkedin.com/in/aarushmehta"],
                      ["LeetCode", "https://leetcode.com/u/Aarush902/"],
                    ].map(([l, h]) => (
                      <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-ember">
                        {l} <ArrowUpRight className="size-3" />
                      </a>
                    ))}
                  </div>
                  <p className="text-black/50 sm:text-right">© 2026 Aarush Mehta · built by hand in Dehradun</p>
                </div>
              </div>
            </div>
          </StackPanel>
        </div>
      </main>
    </>
  );
}
