// Single source for the profile and resume content shown on the site.
// Keep in step with the resume built from research/petrochemical-companies/resume/build_resumes.py.

export const profile = {
  name: "Nutan Kumar Naik",
  handle: "naiknutan97",
  role: "AI/ML Engineer and Geoscientist",
  tagline: "I build observability and governance tooling for AI agents, and apply machine learning to Earth data.",
  positions: ["Lead AI Researcher, Algen AI", "Doctoral Researcher, NIT Rourkela"],
  summary: [
    "I build software for AI systems that need to be observable and accountable. At Algen AI I lead research on " +
      "Traccia, an open-source OpenTelemetry SDK for tracing, evaluating and governing AI agents, and I am first " +
      "author of two arXiv papers on AI observability and agent assessment. I work mostly in Python and TypeScript.",
    "I am also a trained geologist. I hold an M.Sc in Geology from IIT Kharagpur, trained in well-log interpretation " +
      "at ONGC and subsurface exploration at CMPDI, and my doctoral research at NIT Rourkela applies machine learning " +
      "to Sentinel-2 imagery for water quality. I bring both sides to energy, water and emissions problems.",
  ],
  email: "nutan.kn98@gmail.com",
  linkedin: "https://www.linkedin.com/in/nutan-kumar-naik-63878b242/",
  github: "https://github.com/naiknutan97",
  source: "https://github.com/naiknutan97/naiknutan97.github.io",
  resumePdf: "/Nutan_Kumar_Naik_Resume.pdf",
};

export const status = "Leading research on Traccia at Algen AI";

// Career drawn as an OpenTelemetry-style trace. Years only; months are used where the source gives them.
export const NOW = 2026.85;
export const trace = {
  start: 2018,
  end: 2027,
  spans: [
    { name: "msc.geology", attr: "iit_kgp", from: 2018, to: 2020 },
    { name: "phd.research", attr: "nit_rourkela", from: 2021, to: NOW },
    { name: "algen.lead_ai", attr: "traccia", from: 2025, to: NOW },
  ],
  events: [
    { name: "iit_jam", attr: "AIR 108", at: 2018 },
    { name: "gate", attr: "AIR 234", at: 2020 },
    { name: "csir_net", attr: "AIR 40", at: 2023.92 },
    { name: "arxiv.traccia", attr: "2607.14309", at: 2026.54 },
    { name: "arxiv.agentstripes", attr: "2610.18603", at: 2026.79 },
  ],
};

export interface Role {
  title: string;
  org: string;
  place: string;
  period: string;
  points: string[];
  stack: string[];
}

export const experience: Role[] = [
  {
    title: "Lead AI Researcher",
    org: "Algen AI Private Limited",
    place: "Bengaluru",
    period: "2025 – Present",
    points: [
      "Lead research on Traccia, an OpenTelemetry-native observability, governance and compliance platform for AI agents, shipped as open-source Python and TypeScript SDKs.",
      "Co-designed its telemetry pipeline, semantic guardrail assessment and hashed trace ledger, which turns runtime traces into tamper-resistant compliance evidence for regulations such as the EU AI Act.",
      "Built AgentStripes, an evidence-graded maturity model and assessment engine for AI agents (40 capabilities, LLM judges, deterministic scoring), and piloted it on 30 open-source agent repositories.",
    ],
    stack: ["Python", "TypeScript", "OpenTelemetry", "LLM-as-judge", "EU AI Act"],
  },
  {
    title: "Doctoral Researcher, Hydrogeochemistry & Remote Sensing",
    org: "National Institute of Technology Rourkela",
    place: "Odisha",
    period: "2021 – Present",
    points: [
      "Estimate estuarine water quality from Sentinel-2 satellite imagery with machine learning, calibrated on field measurements (Bhitarkanika, Odisha).",
      "Field sampling and laboratory analysis of water and sediment by ion chromatography, UV-Vis spectrophotometry and YSI ProDSS.",
      "Industry projects: mine-water chemistry for MCL (15 coal mines) and IMFA; slope stability for SAIL iron-ore mines; resistivity surveys for Indian Railways; rock mass rating of an underground coal mine.",
    ],
    stack: ["Python", "Machine learning", "Sentinel-2", "Ion chromatography"],
  },
];

export const training = [
  {
    org: "ONGC, Kolkata",
    text: "Well-log interpretation: lithology identification, multi-well horizon correlation, deltaic and deep-marine depositional systems.",
  },
  {
    org: "CMPDI, Bhubaneswar",
    text: "Coal exploration: borehole geophysical logging, drilling, and 3D geological modelling in MINEX.",
  },
  {
    org: "CGWB and RGNGWTRI, Raipur",
    text: "Groundwater management, rainwater harvesting and water budgeting.",
  },
];

export const education = [
  { degree: "Ph.D, Hydrogeochemistry & Remote Sensing", school: "NIT Rourkela", detail: "", period: "2021 – Present" },
  {
    degree: "M.Sc, Geology",
    school: "IIT Kharagpur",
    detail: "CGPA 8.54/10. Field mapping in the Eastern Ghats and Siwalik; dissertation on remote-sensing alteration mapping, Sakoli Fold Belt.",
    period: "2020",
  },
  { degree: "B.Sc", school: "Government Degree College, Sundargarh", detail: "", period: "2018" },
];

export const skills = [
  { label: "Languages", items: ["Python", "TypeScript", "SQL"] },
  {
    label: "AI/ML",
    items: ["PyTorch", "scikit-learn", "XGBoost", "SHAP", "LangChain", "LLM APIs", "LLM-as-judge evaluation"],
  },
  {
    label: "Engineering",
    items: [
      "OpenTelemetry", "FastAPI", "Streamlit", "Next.js", "React", "Tailwind CSS",
      "Docker", "GCP", "GitHub Actions", "Git", "uv", "SQLite",
    ],
  },
  {
    label: "Geoscience",
    items: ["Well-log interpretation", "Sedimentology", "Structural geology", "Hydrogeochemistry", "MINEX"],
  },
  { label: "Remote sensing & GIS", items: ["Sentinel-2", "ESA SNAP", "ENVI", "ArcGIS", "QGIS"] },
  {
    label: "Laboratory",
    items: ["Ion chromatography", "UV-Vis spectrophotometry", "YSI ProDSS", "Petrographic microscopy"],
  },
];

export const recognition = [
  { label: "IIT JAM 2018", value: "AIR 108" },
  { label: "GATE 2020", value: "AIR 234" },
  { label: "CSIR NET (LS), Dec 2023", value: "AIR 40" },
  { label: "Technical Society, NIT Rourkela", value: "Secretary, 2023–24" },
];
