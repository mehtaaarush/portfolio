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

/**
 * The "aarush.py" code card in the About section.
 * `now` is what I'm up to; `done: true` marks an item with a "# done" comment.
 */
export const PROFILE = {
  university: "UPES Dehradun",
  degree: "B.Tech CSE (DS & AI/ML)",
  graduating: 2027,
};

export const NOW: { text: string; done?: boolean }[] = [
  { text: "shipped 3 data science case studies", done: true },
  { text: "sharpening DSA, one problem at a time" },
  { text: "hybrid search for my RAG agent" },
  { text: "tool-calling agents & LLM evals" },
];
