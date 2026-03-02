export interface AssessmentFactor {
  id: string;
  label: string;
  description: string;
  axis: "x" | "y";
  weight: number;
  value: number; // 0-100
}

export interface Project {
  id: string;
  name: string;
  description: string;
  x: number; // 0-100: 0=Grov detaljering, 100=Hög detaljnivå
  y: number; // 0-100: 0=Låg datamängd, 100=Stor datamängd
  color: string;
  isUserProject?: boolean;
  factors: AssessmentFactor[];
  createdAt: string;
}

export const defaultFactors: AssessmentFactor[] = [
  // X-axis factors (detaljnivå)
  // X-axis factors (detaljnivå)
  { id: "wbs_depth", label: "WBS-djup", description: "Hur detaljerad är projektets nedbrytningsstruktur?", axis: "x", weight: 0.5, value: 50 },
  { id: "schedule_detail", label: "Tidplansdetalj", description: "Hur granulär är tidplanen (milstolpar vs dagliga aktiviteter)?", axis: "x", weight: 0.5, value: 50 },
  // Y-axis factors (datamängd)
  { id: "resource_detail", label: "Resursplanering", description: "Hur detaljerat är resurser tilldelade och planerade?", axis: "y", weight: 0.2, value: 50 },
  { id: "risk_detail", label: "Riskhantering", description: "Hur noggrant är risker identifierade och kvantifierade?", axis: "y", weight: 0.15, value: 50 },
  { id: "historical_data", label: "Historisk data", description: "Hur mycket historisk projektdata finns tillgänglig?", axis: "y", weight: 0.25, value: 50 },
  { id: "kpi_tracking", label: "KPI-uppföljning", description: "Hur många nyckeltal följs upp kontinuerligt?", axis: "y", weight: 0.15, value: 50 },
  { id: "data_integration", label: "Dataintegration", description: "Hur väl integrerade är datakällorna (ERP, tidrapporter etc.)?", axis: "y", weight: 0.15, value: 50 },
  { id: "reporting_freq", label: "Rapporteringsfrekvens", description: "Hur ofta samlas och rapporteras data?", axis: "y", weight: 0.1, value: 50 },
];

export const demoProjects: Project[] = [
  {
    id: "survey-1",
    name: "Ringhals Revisionsplanering",
    description: "Kärnkraft, 10-20k aktiviteter, timgranulering, daglig avstämning, SAP-import",
    x: 75, y: 70,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 75 : 70 })),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-2",
    name: "E02 - Centralen",
    description: "Level 3, 20k+ aktiviteter, SPI/CPI/EV, 50+ resurser, individnivå",
    x: 80, y: 85,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 80 : 85 })),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-3",
    name: "NKT Castling",
    description: "5-10k aktiviteter, 50+ resurser, multi-nivå resursplanering, 6 delprojekt",
    x: 55, y: 68,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 55 : 68 })),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-4",
    name: "E05 Korsvägen",
    description: "Level 5, 20k+ aktiviteter, veckoavstemning, EV & kritiska kedjor",
    x: 85, y: 65,
    color: "hsl(var(--chart-4))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 85 : 65 })),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-5",
    name: "Andion",
    description: "Mindre projekt, 1-5k aktiviteter, månadsrapporter, inga resurser",
    x: 25, y: 20,
    color: "hsl(var(--chart-5))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 25 : 20 })),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-6",
    name: "Volvo Cars TBA",
    description: "1-5k aktiviteter, veckoavstemning, månadsrapport & kritisk linje",
    x: 35, y: 25,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 35 : 25 })),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-7",
    name: "Volvo Cars Näst",
    description: "Tidigt skede, 0-1k aktiviteter, enkel månadsrapport",
    x: 15, y: 15,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 15 : 15 })),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-8",
    name: "Barsebäck - Nedmonteringen",
    description: "Level 4, 1-5k aktiviteter, 15-50 resurser, individ- & rollnivå",
    x: 60, y: 55,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 60 : 55 })),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-9",
    name: "BSH - Helsingborg",
    description: "1-5k aktiviteter, kritisk linje, blandat engagemang bland PL",
    x: 30, y: 30,
    color: "hsl(var(--chart-4))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 30 : 30 })),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-10",
    name: "Mälarbanan",
    description: "1-5k aktiviteter, månadsgranulering, floatanalys, fältförteckning",
    x: 35, y: 35,
    color: "hsl(var(--chart-5))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 35 : 35 })),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-11",
    name: "E08 Haga (Västlänken)",
    description: "Level 5, SPI/CPI/EV, kostnadsimport, fältförteckning",
    x: 55, y: 65,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 55 : 65 })),
    createdAt: "2025-10-29",
  },
  {
    id: "survey-12",
    name: "Bravida FSE 905",
    description: "Level 5, 5-10k aktiviteter, disciplinnivå, tvåveckorsrapport",
    x: 60, y: 40,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 60 : 40 })),
    createdAt: "2025-11-02",
  },
  {
    id: "survey-13",
    name: "E05 Korsvägen - Design",
    description: "Level 5, 10-20k aktiviteter, veckoavstemning, KPI-rapporter, leveranslogg-import",
    x: 80, y: 80,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 80 : 80 })),
    createdAt: "2025-11-06",
  },
];

export function calculatePosition(factors: AssessmentFactor[]): { x: number; y: number } {
  const xFactors = factors.filter(f => f.axis === "x");
  const yFactors = factors.filter(f => f.axis === "y");

  const x = xFactors.reduce((sum, f) => sum + f.value * f.weight, 0) / xFactors.reduce((sum, f) => sum + f.weight, 0);
  const y = yFactors.reduce((sum, f) => sum + f.value * f.weight, 0) / yFactors.reduce((sum, f) => sum + f.weight, 0);

  return { x: Math.round(x), y: Math.round(y) };
}

export function getMatrixZone(x: number, y: number): string {
  if (x < 40 && y < 40) return "Tidigt skede";
  if (x >= 40 && x < 70 && y < 40) return "Strukturerad start";
  if (x >= 70 && y < 40) return "Detaljerat men datafattigt";
  if (x < 40 && y >= 40 && y < 70) return "Datarikt men ostrukturerat";
  if (x >= 40 && x < 70 && y >= 40 && y < 70) return "Balanserat";
  if (x >= 70 && y >= 40 && y < 70) return "Välplanerat";
  if (x < 40 && y >= 70) return "Dataöverflöd utan struktur";
  if (x >= 40 && x < 70 && y >= 70) return "Datadrivet";
  return "Optimalt läge";
}
