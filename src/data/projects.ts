// Real, public work only. `repo` (owner/name) enables the build-time star count.

export interface Project {
  name: string;
  repo?: string;
  role: string;
  summary: string;
  points: string[];
  stack: string[];
  links: { label: string; url: string }[];
  featured?: boolean;
  starsFallback?: number;
}

export const projects: Project[] = [
  {
    name: "Traccia SDKs",
    repo: "traccia-ai/traccia-py",
    role: "Research lead, Algen AI",
    summary:
      "OpenTelemetry-native SDKs for AI agent observability, tracing, evaluation, governance and runtime policy enforcement.",
    points: [
      "Framework-agnostic: instruments OpenAI Agents, LangGraph, CrewAI and plain LLM applications.",
      "Python SDK (traccia-py) and TypeScript SDK (traccia-node).",
      "Architecture and evaluation published as arXiv:2607.14309.",
    ],
    stack: ["Python", "TypeScript", "OpenTelemetry"],
    links: [
      { label: "traccia-py", url: "https://github.com/traccia-ai/traccia-py" },
      { label: "traccia-node", url: "https://github.com/traccia-ai/traccia-node" },
      { label: "Paper", url: "https://arxiv.org/abs/2607.14309" },
    ],
    featured: true,
    starsFallback: 131,
  },
  {
    name: "AgentStripes engine",
    repo: "naiknutan97/evidence-graded-agent-maturity-model",
    role: "Author",
    summary: "Assessment engine for the AgentStripes maturity model, with the full replication package for the paper.",
    points: [
      "Rates one release of an AI agent on 40 capabilities in 12 process areas, each with a 0–3 rating and a separately graded evidence level (E0–E5).",
      "Language-model judges interpret the evidence; the scoring arithmetic is deterministic. The engine uses only the Python standard library.",
      "Scripts regenerate every number, table and figure of the paper from stored results on 30 public agent repositories.",
    ],
    stack: ["Python", "LLM-as-judge", "LaTeX"],
    links: [
      { label: "Code", url: "https://github.com/naiknutan97/evidence-graded-agent-maturity-model" },
      { label: "Paper", url: "https://arxiv.org/abs/2610.18603" },
    ],
    featured: true,
  },
  {
    name: "Traccia reference agent",
    repo: "naiknutan97/traccia-paper-examples",
    role: "Author",
    summary: "Reference implementation of the AI loan-approval assistant in Section 4.8 of the Traccia paper.",
    points: [
      "Loan-approval agent instrumented end to end with the Traccia SDK.",
      "Reproducible OpenTelemetry traces and governance artifacts generated in a sandbox.",
      "Featured in the SciPapermill AI research digest, July 2026.",
    ],
    stack: ["Python", "OpenTelemetry", "Traccia"],
    links: [
      { label: "Code", url: "https://github.com/naiknutan97/traccia-paper-examples" },
      {
        label: "SciPapermill",
        url: "https://scipapermill.com/2026/07/18/data-privacy-and-secure-ai-unpacking-the-latest-breakthroughs-in-federated-learning-transparency-and-automotive-security/",
      },
    ],
    featured: true,
  },
  {
    name: "AI Water Tracker",
    repo: "naiknutan97/ai_water_tracker",
    role: "Author",
    summary: "Daily water-intake tracker with an LLM agent that gives personalised hydration feedback.",
    points: [
      "FastAPI REST backend and Streamlit dashboard over SQLite.",
      "LangChain agent, traced end to end with Traccia.",
      "Dependencies and environments managed with uv.",
    ],
    stack: ["Python", "FastAPI", "Streamlit", "LangChain", "SQLite"],
    links: [{ label: "Code", url: "https://github.com/naiknutan97/ai_water_tracker" }],
    featured: true,
  },
  {
    name: "naiknutan97.github.io",
    repo: "naiknutan97/naiknutan97.github.io",
    role: "Author",
    summary: "This site: a statically exported Next.js app, deployed to GitHub Pages by GitHub Actions.",
    points: [
      "TypeScript, App Router and Tailwind CSS, with all content in typed data files.",
      "Repository star counts are fetched from the GitHub API at build time.",
      "Node scripts sync a field-photo gallery from Google Drive over OAuth.",
    ],
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "GitHub Actions"],
    links: [{ label: "Source", url: "https://github.com/naiknutan97/naiknutan97.github.io" }],
  },
];

export const research = [
  {
    name: "Satellite water quality",
    role: "Doctoral research, NIT Rourkela",
    summary:
      "Estimating estuarine water quality from Sentinel-2 imagery with machine learning, calibrated on seasonal field measurements in the Bhitarkanika mangroves, Odisha.",
    stack: ["Python", "Machine learning", "Sentinel-2", "Field sampling"],
  },
  {
    name: "Mine-water chemistry",
    role: "Industry project, MCL and IMFA",
    summary: "Hydrogeochemical assessment of mine water across 15 MCL coal mines and IMFA operations.",
    stack: ["Hydrogeochemistry", "Ion chromatography", "UV-Vis"],
  },
];
