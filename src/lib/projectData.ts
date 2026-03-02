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
  { id: "wbs_depth", label: "WBS-djup", description: "Hur detaljerad är projektets nedbrytningsstruktur?", axis: "x", weight: 0.25, value: 50 },
  { id: "schedule_detail", label: "Tidplansdetalj", description: "Hur granulär är tidplanen (milstolpar vs dagliga aktiviteter)?", axis: "x", weight: 0.25, value: 50 },
  { id: "resource_detail", label: "Resursplanering", description: "Hur detaljerat är resurser tilldelade och planerade?", axis: "x", weight: 0.25, value: 50 },
  { id: "risk_detail", label: "Riskhantering", description: "Hur noggrant är risker identifierade och kvantifierade?", axis: "x", weight: 0.25, value: 50 },
  // Y-axis factors (datamängd)
  { id: "historical_data", label: "Historisk data", description: "Hur mycket historisk projektdata finns tillgänglig?", axis: "y", weight: 0.3, value: 50 },
  { id: "kpi_tracking", label: "KPI-uppföljning", description: "Hur många nyckeltal följs upp kontinuerligt?", axis: "y", weight: 0.25, value: 50 },
  { id: "data_integration", label: "Dataintegration", description: "Hur väl integrerade är datakällorna (ERP, tidrapporter etc.)?", axis: "y", weight: 0.25, value: 50 },
  { id: "reporting_freq", label: "Rapporteringsfrekvens", description: "Hur ofta samlas och rapporteras data?", axis: "y", weight: 0.2, value: 50 },
];

export const demoProjects: Project[] = [
  {
    id: "demo-1",
    name: "Stadsutveckling Norra",
    description: "Stort infrastrukturprojekt med omfattande planering",
    x: 78, y: 82,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 78 : 82 })),
    createdAt: "2025-11-01",
  },
  {
    id: "demo-2",
    name: "IT-migration Fas 2",
    description: "Medelstor IT-transformation med begränsad data",
    x: 62, y: 35,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 62 : 35 })),
    createdAt: "2025-09-15",
  },
  {
    id: "demo-3",
    name: "Kontorsrenovering",
    description: "Mindre projekt i tidigt skede",
    x: 25, y: 20,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 25 : 20 })),
    createdAt: "2026-01-10",
  },
  {
    id: "demo-4",
    name: "Produktlansering Alpha",
    description: "Produktutveckling med mycket data men grov plan",
    x: 30, y: 72,
    color: "hsl(var(--chart-4))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 30 : 72 })),
    createdAt: "2025-12-20",
  },
  {
    id: "demo-5",
    name: "Logistikoptimering",
    description: "Detaljerat projekt med medelmåttig data",
    x: 85, y: 55,
    color: "hsl(var(--chart-5))",
    factors: defaultFactors.map(f => ({ ...f, value: f.axis === "x" ? 85 : 55 })),
    createdAt: "2026-02-01",
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
