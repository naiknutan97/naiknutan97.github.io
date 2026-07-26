export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Observability in Agentic AI: Why Traditional Monitoring Isn't Enough",
    description:
      "Agentic AI systems introduce unique challenges for observability. Here's how OpenTelemetry can help you understand what your agents are actually doing.",
    date: "2025-06-15",
    readTime: "8 min",
    tags: ["Agentic AI", "OpenTelemetry", "Observability"],
    slug: "observability-in-agentic-ai",
  },
  {
    title: "Building LLM Applications with OpenTelemetry",
    description:
      "A practical guide to instrumenting LLM applications for production-grade observability, covering traces, metrics, and logs.",
    date: "2025-05-20",
    readTime: "12 min",
    tags: ["LLM", "OpenTelemetry", "Tutorial"],
    slug: "building-llm-apps-with-opentelemetry",
  },
  {
    title: "AI Governance in Practice: A Framework for Responsible Development",
    description:
      "Practical approaches to implementing AI governance that balances innovation with safety, transparency, and accountability.",
    date: "2025-04-10",
    readTime: "10 min",
    tags: ["AI Governance", "Responsible AI"],
    slug: "ai-governance-in-practice",
  },
  {
    title: "From Research to Production: Deploying ML Models at Scale",
    description:
      "Lessons learned from deploying machine learning models in production environments, covering infrastructure, monitoring, and iteration strategies.",
    date: "2025-03-05",
    readTime: "15 min",
    tags: ["ML Engineering", "Production", "MLOps"],
    slug: "from-research-to-production",
  },
];
