export interface Project {
  title: string;
  description: string;
  problem: string;
  approach: string;
  tech: string[];
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    title: "Traccia AI Observability Platform",
    description:
      "End-to-end observability platform for AI systems, providing deep visibility into LLM behavior, agent workflows, and model performance metrics.",
    problem:
      "AI systems operate as black boxes — understanding why an LLM produced a specific output or why an agent took a particular action requires specialized observability tooling that didn't exist.",
    approach:
      "Built an OpenTelemetry-native platform that traces agent decisions, captures LLM call chains, and surfaces real-time performance metrics with custom dashboards.",
    tech: ["OpenTelemetry", "TypeScript", "Python", "React", "ClickHouse"],
    links: [],
  },
  {
    title: "Agentic AI Systems",
    description:
      "Framework and tooling for building reliable, observable multi-agent AI systems with structured reasoning, tool use, and human-in-the-loop workflows.",
    problem:
      "Production agentic systems are notoriously brittle — they fail silently, make unpredictable decisions, and are nearly impossible to debug without structured observability.",
    approach:
      "Designed a modular agent framework with built-in tracing, structured output validation, and hierarchical task decomposition with human oversight gates.",
    tech: ["Python", "LangGraph", "OpenTelemetry", "Docker", "FastAPI"],
    links: [],
  },
  {
    title: "ML-based Environmental Models",
    description:
      "Machine learning models for environmental monitoring and prediction, combining satellite imagery with ground-truth data for actionable insights.",
    problem:
      "Traditional environmental monitoring relies on sparse sensor networks that miss spatial and temporal patterns only visible through ML analysis of remote sensing data.",
    approach:
      "Developed deep learning pipelines processing multispectral satellite imagery and integrating heterogeneous sensor data for land cover classification and change detection.",
    tech: ["Python", "PyTorch", "GDAL", "SageMaker", "GeoPandas"],
    links: [],
  },
  {
    title: "Remote Sensing Applications",
    description:
      "Geospatial AI applications leveraging satellite and aerial imagery for land-use classification, vegetation health analysis, and urban development tracking.",
    problem:
      "Analyzing petabyte-scale remote sensing datasets requires specialized ML pipelines that most organizations lack the expertise to build and maintain.",
    approach:
      "Built scalable geospatial ML pipelines with automated data ingestion, feature extraction, and model inference using open-source tools and cloud infrastructure.",
    tech: ["Python", "TensorFlow", "Rasterio", "AWS", "PostGIS"],
    links: [],
  },
];
