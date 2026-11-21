/*
 * Text you might want to tweak after deploying lives here.
 * Edit, commit, push — Vercel redeploys automatically.
 */

/** The pill at the top of the hero. Set `open` to false to hide the green "available" dot. */
export const AVAILABILITY = {
  open: true,
  text: "Open to 2027 new-grad roles & internships",
};

/** Hero copy. The `highlight` words get the yellow highlighter. */
export const HERO = {
  hello: "Hi, I’m Aarush.",
  lead: "I build data & AI projects that make it",
  highlight: "out of the notebook.",
  intro:
    "Final-year B.Tech CSE student at UPES Dehradun, specialising in Data Science & AI/ML and graduating in 2027. I like forecasting, experiments and retrieval-augmented AI, and most of my projects ship with a live demo you can try.",
};

/** The "Currently" card in the About section. `done: true` draws a tick in the box. */
export const NOW: { text: string; done?: boolean }[] = [
  { text: "shipped three data science case studies, each with a live dashboard", done: true },
  { text: "sharpening DSA, one problem at a time" },
  { text: "next up: hybrid search for my RAG agent" },
  { text: "going deeper on tool-calling agents & LLM evals" },
];
