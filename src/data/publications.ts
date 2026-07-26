export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "conference" | "journal" | "preprint";
  abstract: string;
  link?: string;
}

export const publications: Publication[] = [
  {
    title:
      "A Framework for Observable Agentic AI Systems using OpenTelemetry",
    authors: "Nutan Kumar Naik, et al.",
    venue: "Preprint",
    year: 2025,
    type: "preprint",
    abstract:
      "A comprehensive framework for adding observability to agentic AI systems using OpenTelemetry, enabling tracing, monitoring, and debugging of multi-agent workflows in production environments.",
    link: "https://arxiv.org",
  },
  {
    title:
      "Deep Learning Approaches for Land Cover Classification Using Multispectral Satellite Imagery",
    authors: "Nutan Kumar Naik, et al.",
    venue: "Journal of Geospatial AI",
    year: 2024,
    type: "journal",
    abstract:
      "Evaluates CNN and transformer-based architectures for land cover classification across diverse geographical regions using publicly available multispectral satellite data.",
    link: "https://example.com",
  },
  {
    title:
      "LLM Observability: Tracing, Monitoring, and Evaluation in Production",
    authors: "Nutan Kumar Naik",
    venue: "Conference on AI Infrastructure",
    year: 2024,
    type: "conference",
    abstract:
      "Practical techniques for implementing observability in LLM-powered applications, including token-level tracing, cost attribution, quality evaluation, and safety monitoring.",
    link: "https://example.com",
  },
  {
    title:
      "Geospatial AI for Urban Development Tracking: A Case Study",
    authors: "Nutan Kumar Naik, et al.",
    venue: "International Conference on Geoinformatics",
    year: 2023,
    type: "conference",
    abstract:
      "Applies ML techniques to satellite imagery time-series for automated urban development tracking, demonstrating practical applications for city planning and infrastructure monitoring.",
  },
];
