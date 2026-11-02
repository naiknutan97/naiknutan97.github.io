export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  summary: string;
  links: { label: string; url: string }[];
}

export const publications: Publication[] = [
  {
    title: "AgentStripes: An Evidence-Graded Maturity Model for AI Agents",
    authors: "Nutan Kumar Naik, Vijay Prasad Poudel, Aditya Kumar Saroj, Saurav Samantray, Abhishek Patel",
    venue: "arXiv:2610.18603 [cs.AI]",
    year: 2026,
    summary:
      "A maturity model that rates AI agents on 40 capabilities in 12 areas and gives credit only for evidence, such as verified code quotes and instrument checks. Piloted on 30 public open-source agent repositories.",
    links: [{ label: "arXiv", url: "https://arxiv.org/abs/2610.18603" }],
  },
  {
    title: "Traccia: An OpenTelemetry-Based Governance Platform for AI Systems",
    authors: "Nutan Kumar Naik, Aditya Kumar Saroj, Vijay Prasad Poudel, Saurav Samantray, Abhishek Patel",
    venue: "arXiv:2607.14309 [cs.AI]",
    year: 2026,
    summary:
      "An OpenTelemetry-based governance framework for AI systems that links regulatory requirements such as the EU AI Act to runtime telemetry, passive semantic guardrail assessment, and execution lineage recorded in a hashed trace ledger with tamper-resistant compliance evidence.",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2607.14309" },
      { label: "Code", url: "https://github.com/traccia-ai/traccia-py" },
    ],
  },
];

export interface Article {
  title: string;
  outlet: string;
  date: string;
  url: string;
}

export const articles: Article[] = [
  {
    title: "An AI agent deleted a production database in 9 seconds. What should have stopped it?",
    outlet: "Indie Hackers",
    date: "October 2026",
    url: "https://www.indiehackers.com/post/an-ai-agent-deleted-a-production-database-in-9-seconds-what-should-have-stopped-it-1fde961ff7",
  },
];
