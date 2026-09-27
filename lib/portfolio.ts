export interface CarouselSlide {
  src: string;
  alt: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export interface Work {
  slug: string;
  kind: string;
  title: string;
  period: string;
  blurb: string;
  metric?: { value: string; label: string };
  stack: string[];
  live?: string;
  code?: string;
  slide: CarouselSlide;
}

/** Ordered to match the carousel: one slide per piece of work. */
export const works: Work[] = [
  {
    slug: "vision-nav",
    kind: "Computer vision · IIT Roorkee",
    title: "Vision-Nav: GPS-free UAV localization",
    period: "Jun – Jul 2026",
    blurb:
      "A drone works out where it is from its camera alone. DINOv2 embeddings retrieve candidate satellite tiles from a FAISS index, and EfficientLoFTR with RANSAC refines the match to a lat/lon estimate.",
    metric: { value: "<1 ms", label: "FAISS tile retrieval" },
    stack: ["PyTorch", "DINOv2", "EfficientLoFTR", "FAISS", "OpenCV"],
    code: "https://github.com/mehtaaarush/uav-gps-free-localization",
    slide: { src: unsplash("1473968512647-3e447244af8f"), alt: "White quadcopter drone flying over a forest" },
  },
  {
    slug: "path-planning",
    kind: "Robotics · IIT Roorkee",
    title: "Landmark-aware A* path planning",
    period: "Jun – Jul 2026",
    blurb:
      "Routes the drone toward a target using map landmarks and A* search. Optical-flow tracking is fused with periodic satellite matching to keep drift low, validated on real aerial imagery of the IIT Roorkee campus.",
    stack: ["Python", "A* search", "Optical flow", "Satellite imagery"],
    code: "https://github.com/mehtaaarush/uav-gps-free-localization",
    slide: { src: unsplash("1446776811953-b23d57bd21aa"), alt: "Earth seen from orbit with a satellite in frame" },
  },
  {
    slug: "docintel",
    kind: "Full-stack GenAI",
    title: "DocIntel",
    period: "2026 · Live",
    blurb:
      "Upload documents, ask questions and get answers with page-level citations. Built as a Next.js client, a containerized FastAPI service and PostgreSQL, with async ingestion into per-document FAISS indexes.",
    metric: { value: "3-tier", label: "Vercel · Render · PostgreSQL" },
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Gemini"],
    live: "https://docintel-ashen.vercel.app",
    code: "https://github.com/mehtaaarush/docintel",
    slide: { src: unsplash("1488590528505-98d2b5aba04b"), alt: "Laptop screen showing code in a dark editor" },
  },
  {
    slug: "agentic-rag",
    kind: "Agents · RAG",
    title: "Agentic RAG Research Assistant",
    period: "2026",
    blurb:
      "A LangGraph ReAct agent that answers questions over 12 CV and deep-learning papers. It routes between FAISS retrieval and Tavily web search, and is scored by a custom LLM-as-judge harness.",
    metric: { value: "1.0", label: "faithfulness, zero hallucination" },
    stack: ["LangChain", "LangGraph", "FAISS", "Gemini", "Tavily"],
    code: "https://github.com/mehtaaarush/agentic-rag-assistant",
    slide: { src: unsplash("1677442136019-21780ecad995"), alt: "Glowing blue 3D letters spelling AI" },
  },
  {
    slug: "fraud",
    kind: "Data science",
    title: "Credit Card Fraud Detection",
    period: "2026",
    blurb:
      "Fraud is a tiny minority of the data, so the model is tuned for recall. It uses SMOTE oversampling, a Random Forest and ROC-AUC evaluation, because a missed fraud case costs more than a false alarm.",
    metric: { value: "284,807", label: "transactions modelled" },
    stack: ["Scikit-Learn", "SMOTE", "Pandas", "Random Forest"],
    code: "https://github.com/mehtaaarush/Credit-Card-Fraud-Detection",
    slide: { src: unsplash("1563013544-824ae1b704d3"), alt: "Hands holding a credit card over a laptop keyboard" },
  },
  {
    slug: "olist-dashboard",
    kind: "Power BI · Data visualization",
    title: "Olist E-Commerce Analytics Dashboard",
    period: "2025",
    blurb:
      "An interactive Power BI report over the Brazilian Olist e-commerce dataset. KPI cards track orders, revenue, payments, late-delivery rate and review score, while a category breakdown, an on-time vs late split, a delivery-time against review-score scatter and a state-by-year matrix show where the experience slips.",
    metric: { value: "89K", label: "orders analysed" },
    stack: ["Power BI", "DAX", "Power Query", "Data modelling", "Olist dataset"],
    slide: { src: unsplash("1551288049-bebda4e38f71"), alt: "Analytics dashboard with charts on a screen" },
  },
  {
    slug: "deploy",
    kind: "Backend · infrastructure",
    title: "Shipping DocIntel to production",
    period: "2026",
    blurb:
      "Versioned Alembic migrations run automatically when the container starts. A designed REST contract connects Next.js and FastAPI, and a similarity threshold tuned on real score distributions rejects out-of-scope questions.",
    stack: ["Docker", "Alembic", "SQLAlchemy", "REST API design", "Render"],
    code: "https://github.com/mehtaaarush/docintel",
    slide: { src: unsplash("1558494949-ef010cbdcc31"), alt: "Server racks with bundled network cables" },
  },
  {
    slug: "indianeers",
    kind: "Web development · Indianeers",
    title: "indianeers.org",
    period: "Jun – Jul 2024",
    blurb:
      "Designed and deployed the company's official website with WordPress, HTML and CSS. Also restructured Excel data models for faster retrieval and handled client communication.",
    stack: ["WordPress", "HTML", "CSS", "MS Excel"],
    live: "https://indianeers.org",
    slide: { src: unsplash("1555949963-ff9fe0c870eb"), alt: "Close-up of colourful code on a monitor" },
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Generative AI", items: ["LLMs", "RAG", "LangChain", "LangGraph", "AI agents", "Tool calling", "FAISS", "Embeddings", "Prompt engineering", "LLM evaluation", "Gemini API"] },
  { group: "Vision & deep learning", items: ["PyTorch", "OpenCV", "Transformers", "ViT", "DINOv2", "Swin Transformer", "GANs", "Transfer learning"] },
  { group: "Web & deployment", items: ["Next.js", "React", "Tailwind CSS", "FastAPI", "Docker", "PostgreSQL", "SQLAlchemy", "Alembic", "Vercel", "Render", "Git"] },
  { group: "Data science", items: ["NumPy", "Pandas", "Scikit-Learn", "XGBoost", "Matplotlib", "EDA", "Power BI"] },
  { group: "Languages & core CS", items: ["Python", "Java", "C", "SQL", "TypeScript", "JavaScript", "DSA", "DBMS", "OS", "Networks"] },
];
