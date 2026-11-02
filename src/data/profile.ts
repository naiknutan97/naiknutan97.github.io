// Single source for the profile and resume content shown on the site.
// Keep in step with the resume built from research/petrochemical-companies/resume/build_resumes.py.

export const profile = {
  name: "Nutan Kumar Naik",
  role: "AI/ML Engineer and Geoscientist",
  positions: ["Lead AI Researcher, Algen AI", "Doctoral Researcher, NIT Rourkela"],
  summary:
    "Geoscientist and AI engineer with an M.Sc in Geology from IIT Kharagpur and doctoral research at NIT Rourkela. " +
    "Lead AI Researcher at Algen AI and first author of two arXiv papers on AI observability and agent assessment. " +
    "Trained in well-log interpretation at ONGC and subsurface exploration at CMPDI. Brings machine learning, " +
    "LLM engineering and satellite remote sensing to subsurface, water and emissions problems in the energy " +
    "and petrochemical industry.",
  email: "kumarnaiknutan@gmail.com",
  linkedin: "https://www.linkedin.com/in/nutan-kumar-naik-63878b242/",
  github: "https://github.com/naiknutan97",
  resumePdf: "/Nutan_Kumar_Naik_Resume.pdf",
};

export interface Role {
  title: string;
  org: string;
  place: string;
  period: string;
  points: string[];
}

export const experience: Role[] = [
  {
    title: "Lead AI Researcher",
    org: "Algen AI Private Limited",
    place: "Bengaluru",
    period: "2025 – Present",
    points: [
      "Lead research on Traccia, an OpenTelemetry-native observability, governance and compliance platform for AI agents and LLM applications.",
      "Co-designed its telemetry pipeline, semantic guardrail assessment and hashed trace ledger, which produces tamper-resistant compliance evidence for regulations such as the EU AI Act.",
      "Created AgentStripes, an evidence-graded maturity model for AI agents, and piloted it on 30 open-source agent repositories.",
    ],
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
    org: "CGWB / RGNGWTRI, Raipur",
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
  { label: "AI & data", items: "Python, SQL, PyTorch, scikit-learn, XGBoost, SHAP, LLM APIs, OpenTelemetry, Docker, GCP" },
  { label: "Geoscience", items: "Well-log interpretation, sedimentology, structural geology, hydrogeochemistry, MINEX" },
  { label: "Remote sensing & GIS", items: "Sentinel-2, ESA SNAP, ENVI, ArcGIS, QGIS" },
  { label: "Laboratory", items: "Ion chromatography, UV-Vis spectrophotometry, YSI ProDSS, petrographic microscopy" },
];

export const recognition = [
  "IIT JAM 2018: AIR 108",
  "GATE 2020: AIR 234",
  "CSIR NET (LS), Dec 2023: AIR 40",
  "Secretary, Technical Society, NIT Rourkela (2023–24)",
];
