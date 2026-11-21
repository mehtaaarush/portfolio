export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "site": a live page in a browser frame that scrolls on hover. "figure": an image or plot from the repo. */
  frame?: "site" | "figure";
  /** CSS object-position; a dashboard screenshot keeps its top-left corner, where the title is, in view */
  position?: string;
  /** a white-background plot: shown as a notebook output, inverted in the dark theme */
  plot?: boolean;
  /** small label in the corner of a figure */
  caption?: string;
}

/** Filter groups on the projects grid. */
export type Area = "data" | "ai" | "web";

export interface Work {
  slug: string;
  kind: string;
  title: string;
  period: string;
  /** one sentence for the project card; the full blurb opens in the details view */
  summary: string;
  blurb: string;
  areas: Area[];
  metric?: { value: string; label: string };
  stack: string[];
  live?: string;
  code?: string;
  /** a screenshot of the live project or an image from its repo; projects without one get a drawn cover */
  shot?: Screenshot;
}

export const works: Work[] = [
  {
    slug: "transit-forecasting",
    kind: "Forecasting · Time series",
    title: "Chicago transit ridership forecasting",
    period: "2026 · Live",
    summary:
      "Forecasts daily Chicago bus and train ridership two weeks ahead, with a what-if planner that runs in the browser.",
    blurb:
      "Daily ridership forecasts two weeks ahead for the Chicago Transit Authority, from 25 years of boardings joined to weather and holiday data. A gradient-boosting model, checked with a leak-free rolling backtest, has 56% less error than a seasonal-naive forecast and runs in the browser for what-if planning.",
    areas: ["data"],
    metric: { value: "4.3%", label: "WAPE on 5,005 forecasts" },
    stack: ["Scikit-Learn", "Pandas", "Time series", "Plotly", "REST APIs"],
    live: "https://mehtaaarush.github.io/transit-ridership-forecasting/",
    code: "https://github.com/mehtaaarush/transit-ridership-forecasting",
    shot: { src: "/work/transit-ridership.webp", alt: "Ridership forecasting dashboard showing a 4.3% forecast error and recent ridership figures", width: 1400, height: 1475, position: "left top" },
  },
  {
    slug: "ab-uplift",
    kind: "Experimentation · Causal ML",
    title: "A/B testing and uplift modelling",
    period: "2026 · Live",
    summary:
      "Analyses a 64,000-customer e-mail experiment end to end, then uses uplift models to decide whom to target.",
    blurb:
      "A randomised e-mail experiment on 64,000 customers, analysed end to end: randomisation checks, Holm-corrected confidence intervals and bootstrap robustness checks, then uplift models that find whom each e-mail persuades and an off-policy evaluation of targeting rules.",
    areas: ["data"],
    metric: { value: "+$0.77", label: "revenue lift per customer" },
    stack: ["Statsmodels", "SciPy", "Scikit-Learn", "Uplift modelling", "Plotly"],
    live: "https://mehtaaarush.github.io/ab-testing-uplift-modeling/",
    code: "https://github.com/mehtaaarush/ab-testing-uplift-modeling",
    shot: { src: "/work/ab-uplift.webp", alt: "Experiment dashboard showing a $0.77 revenue lift per customer and passed randomisation checks", width: 1400, height: 1475, position: "left top" },
  },
  {
    slug: "retail-analytics",
    kind: "Customer analytics · SQL",
    title: "E-commerce customer analytics",
    period: "2026 · Live",
    summary:
      "Cleans 1.07 million invoice lines in SQL, then builds cohorts, RFM segments and a repurchase model.",
    blurb:
      "Two years of online retail transactions, 1.07 million invoice lines, cleaned and reconciled in SQL (DuckDB), then turned into trading KPIs, cohort retention, RFM segments and market-basket rules. A repurchase model validated out of time beats the RFM rule it would replace.",
    areas: ["data"],
    metric: { value: "0.802", label: "ROC AUC, held-out quarter" },
    stack: ["SQL", "DuckDB", "Pandas", "Scikit-Learn", "Plotly"],
    live: "https://mehtaaarush.github.io/ecommerce-customer-analytics/",
    code: "https://github.com/mehtaaarush/ecommerce-customer-analytics",
    shot: { src: "/work/retail-analytics.webp", alt: "Customer analytics dashboard showing £9.29M net revenue with orders and average order value", width: 1400, height: 1475, position: "left top" },
  },
  {
    slug: "cloud-removal",
    kind: "Major project · Generative vision",
    title: "Cloud removal from satellite images",
    period: "2026",
    summary:
      "A generative model that removes clouds from satellite images and maps how sure it is about every pixel.",
    blurb:
      "My major project: a Fourier, uncertainty-aware generative model. A SwinIR branch with Fourier Units handles the global picture, a TransGAN branch the local detail, and the two are fused band by band with wavelets. An uncertainty head predicts the expected error at each pixel and weights the adversarial loss, so the model invents content only where the ground is hidden. Trained on RICE1 (haze) and RICE2 (thick cloud), with a Flask demo.",
    areas: ["ai"],
    metric: { value: "35.6 dB", label: "PSNR on RICE1 test (cloudy input: 19.2)" },
    stack: ["PyTorch", "SwinIR", "TransGAN", "Wavelets", "Flask"],
    code: "https://github.com/mehtaaarush/Major-Project",
    shot: {
      src: "/work/cloud-removal.webp",
      alt: "A cloudy RICE2 test image, the model's cloud-free output and its predicted uncertainty map, side by side",
      width: 1280,
      height: 800,
      frame: "figure",
    },
  },
  {
    slug: "vision-nav",
    kind: "Computer vision · IIT Roorkee",
    title: "Vision-Nav: GPS-free UAV localization",
    period: "Jun – Jul 2026",
    summary:
      "Lets a drone work out where it is from its camera alone, by matching frames against satellite tiles.",
    blurb:
      "A drone works out where it is from its camera alone. DINOv2 embeddings retrieve candidate satellite tiles from a FAISS index, and EfficientLoFTR with RANSAC refines the match to a lat/lon estimate.",
    areas: ["ai"],
    metric: { value: "<1 ms", label: "FAISS tile retrieval" },
    stack: ["PyTorch", "DINOv2", "EfficientLoFTR", "FAISS", "OpenCV"],
    code: "https://github.com/mehtaaarush/uav-gps-free-localization",
    shot: {
      src: "/work/vision-nav.webp",
      alt: "Aerial map of the IIT Roorkee campus with building, junction, court and complex landmarks marked for localization",
      width: 1400,
      height: 658,
      frame: "figure",
      caption: "landmark map · IIT Roorkee",
    },
  },
  {
    slug: "path-planning",
    kind: "Robotics · IIT Roorkee",
    title: "Landmark-aware A* path planning",
    period: "Jun – Jul 2026",
    summary:
      "Plans drone routes with landmarks and A* search, fusing optical flow with satellite matching to limit drift.",
    blurb:
      "Routes the drone toward a target using map landmarks and A* search. Optical-flow tracking is fused with periodic satellite matching to keep drift low, validated on real aerial imagery of the IIT Roorkee campus.",
    areas: ["ai"],
    stack: ["Python", "A* search", "Optical flow", "Satellite imagery"],
    code: "https://github.com/mehtaaarush/uav-gps-free-localization",
  },
  {
    slug: "docintel",
    kind: "Full-stack GenAI",
    title: "DocIntel",
    period: "2026 · Live",
    summary:
      "Upload documents, ask questions and get answers with page-level citations, deployed as a three-tier app.",
    blurb:
      "Upload documents, ask questions and get answers with page-level citations. Built as a Next.js client, a containerized FastAPI service and PostgreSQL, with async ingestion into per-document FAISS indexes.",
    areas: ["ai", "web"],
    metric: { value: "3-tier", label: "Vercel · Render · PostgreSQL" },
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Gemini"],
    live: "https://docintel-ashen.vercel.app",
    code: "https://github.com/mehtaaarush/docintel",
    shot: { src: "/work/docintel.webp", alt: "DocIntel home page: Ask your documents anything, with a drag-and-drop upload box", width: 1400, height: 875 },
  },
  {
    slug: "agentic-rag",
    kind: "Agents · RAG",
    title: "Agentic RAG Research Assistant",
    period: "2026",
    summary:
      "A LangGraph agent that answers questions over 12 research papers and is graded by its own evaluator.",
    blurb:
      "A LangGraph ReAct agent that answers questions over 12 CV and deep-learning papers. It routes between FAISS retrieval and Tavily web search, and is scored by a custom LLM-as-judge harness.",
    areas: ["ai"],
    metric: { value: "1.0", label: "faithfulness, zero hallucination" },
    stack: ["LangChain", "LangGraph", "FAISS", "Gemini", "Tavily"],
    code: "https://github.com/mehtaaarush/agentic-rag-assistant",
  },
  {
    slug: "deeplure",
    kind: "Computer vision · metric learning",
    title: "Colour-invariant saree design recognition",
    period: "2026",
    summary:
      "Face recognition for textiles: recognises a saree's design whatever colours it was woven in.",
    blurb:
      "A 128-d embedding that captures a saree's design (motifs, layout, weave) and ignores its colourway. Each training image is split into colour regions and repainted with new palettes, and a MobileNetV3 is trained with a supervised contrastive loss. On held-out real sarees it reaches a core AUC of 0.89, against 0.66 for zero-shot DINOv2, at about 10 ms per image on a CPU.",
    areas: ["ai"],
    metric: { value: "0.89", label: "core AUC (zero-shot DINOv2: 0.66)" },
    stack: ["PyTorch", "MobileNetV3", "Metric learning", "SupCon loss", "DINOv2"],
    code: "https://github.com/mehtaaarush/deeplure",
    shot: {
      src: "/work/deeplure.webp",
      alt: "Verification ROC curves comparing the trained embedding with zero-shot and colour-histogram baselines",
      width: 1430,
      height: 585,
      frame: "figure",
      plot: true,
      caption: "verification ROC",
    },
  },
  {
    slug: "ai-receptionist",
    kind: "Full-stack GenAI",
    title: "AI Receptionist for small businesses",
    period: "2026",
    summary:
      "A chat assistant for clinic and shop websites that answers questions and turns visitors into booking requests.",
    blurb:
      "A Node.js server plus a chat widget that goes on any site with one script tag. The assistant answers from one JSON file per business (hours, prices, policies) and books appointments through a validated tool call. Leads land on a password-protected dashboard or a Google Sheet. It runs on Claude or Gemini, streams replies, and rate-limits each visitor to keep costs predictable.",
    areas: ["ai", "web"],
    metric: { value: "1 tag", label: "to add it to any website" },
    stack: ["Node.js", "Express", "Claude API", "Gemini API", "Tool calling"],
    code: "https://github.com/mehtaaarush/ai-receptionist",
    shot: {
      src: "/work/ai-receptionist.webp",
      alt: "Demo dental clinic website with the AI assistant's chat window open, offering suggested questions",
      width: 1400,
      height: 875,
    },
  },
  {
    slug: "fraud",
    kind: "Data science",
    title: "Credit Card Fraud Detection",
    period: "2026",
    summary:
      "A recall-first fraud model on 284,807 card transactions, because a missed fraud case costs the most.",
    blurb:
      "Fraud is a tiny minority of the data, so the model is tuned for recall. It uses SMOTE oversampling, a Random Forest and ROC-AUC evaluation, because a missed fraud case costs more than a false alarm.",
    areas: ["data"],
    metric: { value: "284,807", label: "transactions modelled" },
    stack: ["Scikit-Learn", "SMOTE", "Pandas", "Random Forest"],
    code: "https://github.com/mehtaaarush/Credit-Card-Fraud-Detection",
    shot: {
      src: "/work/fraud.webp",
      alt: "Two notebook plots: the class distribution, where fraud is a sliver next to normal transactions, and a ROC curve hugging the top-left corner",
      width: 1236,
      height: 503,
      frame: "figure",
      plot: true,
      caption: "notebook output",
    },
  },
  {
    slug: "olist-dashboard",
    kind: "Power BI · Data visualization",
    title: "Olist E-Commerce Analytics Dashboard",
    period: "2025",
    summary:
      "A Power BI report on 89K Brazilian e-commerce orders that shows where delivery and reviews slip.",
    blurb:
      "An interactive Power BI report over the Brazilian Olist e-commerce dataset. KPI cards track orders, revenue, payments, late-delivery rate and review score, while a category breakdown, an on-time vs late split, a delivery-time against review-score scatter and a state-by-year matrix show where the experience slips.",
    areas: ["data"],
    metric: { value: "89K", label: "orders analysed" },
    stack: ["Power BI", "DAX", "Power Query", "Data modelling", "Olist dataset"],
  },
  {
    slug: "deploy",
    kind: "Backend · infrastructure",
    title: "Shipping DocIntel to production",
    period: "2026",
    summary:
      "Migrations, a typed REST contract and an out-of-scope filter that took DocIntel from demo to production.",
    blurb:
      "Versioned Alembic migrations run automatically when the container starts. A designed REST contract connects Next.js and FastAPI, and a similarity threshold tuned on real score distributions rejects out-of-scope questions.",
    areas: ["web"],
    stack: ["Docker", "Alembic", "SQLAlchemy", "REST API design", "Render"],
    code: "https://github.com/mehtaaarush/docintel",
  },
  {
    slug: "indianeers",
    kind: "Web development · Indianeers",
    title: "indianeers.org",
    period: "Jun – Jul 2024",
    summary: "Designed and shipped the company website during my web development internship.",
    blurb:
      "Designed and deployed the company's official website with WordPress, HTML and CSS. Also restructured Excel data models for faster retrieval and handled client communication.",
    areas: ["web"],
    stack: ["WordPress", "HTML", "CSS", "MS Excel"],
    live: "https://indianeers.org",
    shot: { src: "/work/indianeers.webp", alt: "indianeers.org home page: India’s Youth. United. Skilled. Ready.", width: 1400, height: 875 },
  },
];

/** What the projects grid shows: the planning and deployment write-ups are folded into their parent projects. */
export const featured = works.filter((w) => !["path-planning", "deploy"].includes(w.slug));

export const skills: { group: string; items: string[] }[] = [
  { group: "Data science", items: ["NumPy", "Pandas", "SciPy", "Statsmodels", "Scikit-Learn", "XGBoost", "DuckDB", "Matplotlib", "Plotly", "EDA", "A/B testing", "Uplift modelling", "Time-series forecasting", "Power BI"] },
  { group: "Generative AI", items: ["LLMs", "RAG", "LangChain", "LangGraph", "AI agents", "Tool calling", "FAISS", "Embeddings", "Prompt engineering", "LLM evaluation", "Gemini API", "Claude API"] },
  { group: "Vision & deep learning", items: ["PyTorch", "OpenCV", "Transformers", "ViT", "DINOv2", "Swin Transformer", "GANs", "Metric learning", "Transfer learning"] },
  { group: "Web & deployment", items: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express", "FastAPI", "Docker", "PostgreSQL", "SQLAlchemy", "Alembic", "Vercel", "Render", "Git"] },
  { group: "Languages & core CS", items: ["Python", "Java", "C", "SQL", "TypeScript", "JavaScript", "DSA", "DBMS", "OS", "Networks"] },
];

export const certifications = [
  { by: "Microsoft Applied Skills", title: "Developing Agents in Microsoft Foundry" },
  { by: "IBM SkillsBuild", title: "Retrieval-Augmented Generation for Enhanced AI Outputs" },
];

export type JourneyKind = "education" | "work" | "projects" | "next";

export const journey: { when: string; kind: JourneyKind; title: string; org: string; text: string }[] = [
  { when: "2023", kind: "education", title: "Started B.Tech CSE", org: "UPES Dehradun · Data Science & AI/ML", text: "Core CS plus the Data Science & AI/ML specialization: data structures and algorithms, DBMS, operating systems, networks and machine learning." },
  { when: "Jun – Jul 2024", kind: "work", title: "Web Development Intern", org: "Indianeers Private Ltd", text: "Designed and deployed the company website, indianeers.org, and restructured Excel data models for faster retrieval." },
  { when: "2026", kind: "projects", title: "Shipped DocIntel & Agentic RAG", org: "Independent projects", text: "A deployed three-tier document Q&A platform, plus a LangGraph research agent that scored 1.0 on faithfulness." },
  { when: "Jun – Jul 2026", kind: "work", title: "Research Intern", org: "IIT Roorkee", text: "Built a vision-based localization pipeline using DINOv2 embeddings and FAISS retrieval, with A* path planning and optical-flow fusion." },
  { when: "Nov 2026", kind: "projects", title: "Three data science case studies", org: "Independent projects", text: "Ridership forecasting, an A/B test with uplift modelling and e-commerce customer analytics in SQL and Python, each published with a live dashboard." },
  { when: "2027", kind: "next", title: "Graduating", org: "UPES Dehradun", text: "Looking for SWE and ML roles where I can ship AI systems end to end." },
];

export const links = {
  email: "aarushmehta902@gmail.com",
  github: "https://github.com/mehtaaarush",
  linkedin: "https://linkedin.com/in/aarushmehta",
  leetcode: "https://leetcode.com/u/mehtaaarush/",
};
