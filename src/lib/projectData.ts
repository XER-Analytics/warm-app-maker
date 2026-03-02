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
  { id: "wbs_depth", label: "WBS-djup", description: "Hur detaljerad är projektets nedbrytningsstruktur?", axis: "x", weight: 0.15, value: 50 },
  { id: "schedule_detail", label: "Tidplansdetalj", description: "Hur granulär är tidplanen (milstolpar vs dagliga aktiviteter)?", axis: "x", weight: 0.20, value: 50 },
  { id: "code_volume", label: "Kodmängd", description: "Hur många aktiviteter/koder finns i tidplanen? Fler koder ger högre flexibilitet och analysmöjlighet.", axis: "x", weight: 0.40, value: 50 },
  { id: "reporting_freq", label: "Rapporteringsfrekvens", description: "Hur ofta samlas och rapporteras data?", axis: "x", weight: 0.25, value: 50 },
  // Y-axis factors (datamängd)
  { id: "resource_detail", label: "Resursplanering", description: "Hur detaljerat är resurser tilldelade och planerade?", axis: "y", weight: 0.25, value: 50 },
  { id: "risk_detail", label: "Riskhantering", description: "Hur noggrant är risker identifierade och kvantifierade?", axis: "y", weight: 0.15, value: 50 },
  { id: "historical_data", label: "Historisk data", description: "Hur mycket historisk projektdata finns tillgänglig?", axis: "y", weight: 0.25, value: 50 },
  { id: "kpi_tracking", label: "KPI-uppföljning", description: "Hur många nyckeltal följs upp kontinuerligt?", axis: "y", weight: 0.15, value: 50 },
  { id: "data_integration", label: "Dataintegration", description: "Hur väl integrerade är datakällorna (ERP, tidrapporter etc.)?", axis: "y", weight: 0.2, value: 50 },
];

export const demoProjects: Project[] = [
  {
    id: "survey-1",
    name: "Ringhals Revisionsplanering",
    description: "Kärnkraft, 10-20k aktiviteter, timgranulering, daglig avstämning, SAP-import",
    x: 84, y: 68,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 80, schedule_detail: 85, code_volume: 80, resource_detail: 70, risk_detail: 60, historical_data: 65, kpi_tracking: 60, data_integration: 75, reporting_freq: 90 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-2",
    name: "E02 - Centralen",
    description: "Level 3, 20k+ aktiviteter, SPI/CPI/EV, 50+ resurser, individnivå",
    x: 74, y: 77,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 55, schedule_detail: 60, code_volume: 90, resource_detail: 90, risk_detail: 60, historical_data: 70, kpi_tracking: 90, data_integration: 75, reporting_freq: 70 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-3",
    name: "NKT Castling",
    description: "5-10k aktiviteter, 50+ resurser, multi-nivå resursplanering, 6 delprojekt",
    x: 54, y: 57,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 50, schedule_detail: 50, code_volume: 60, resource_detail: 85, risk_detail: 50, historical_data: 55, kpi_tracking: 45, data_integration: 50, reporting_freq: 50 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-4",
    name: "E05 Korsvägen",
    description: "Level 5, 20k+ aktiviteter, veckoavstemning, EV & kritiska kedjor",
    x: 83, y: 63,
    color: "hsl(var(--chart-4))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 90, schedule_detail: 80, code_volume: 90, resource_detail: 55, risk_detail: 70, historical_data: 60, kpi_tracking: 75, data_integration: 55, reporting_freq: 70 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-5",
    name: "Andion",
    description: "Mindre projekt, 1-5k aktiviteter, månadsrapporter, inga resurser",
    x: 28, y: 14,
    color: "hsl(var(--chart-5))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 20, schedule_detail: 25, code_volume: 30, resource_detail: 10, risk_detail: 15, historical_data: 15, kpi_tracking: 10, data_integration: 10, reporting_freq: 30 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-6",
    name: "Volvo Cars TBA",
    description: "1-5k aktiviteter, veckoavstemning, månadsrapport & kritisk linje",
    x: 35, y: 29,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 30, schedule_detail: 35, code_volume: 30, resource_detail: 25, risk_detail: 30, historical_data: 25, kpi_tracking: 35, data_integration: 20, reporting_freq: 45 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-7",
    name: "Volvo Cars Näst",
    description: "Tidigt skede, 0-1k aktiviteter, enkel månadsrapport",
    x: 15, y: 12,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 10, schedule_detail: 15, code_volume: 10, resource_detail: 10, risk_detail: 10, historical_data: 10, kpi_tracking: 10, data_integration: 10, reporting_freq: 25 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-8",
    name: "Barsebäck - Nedmonteringen",
    description: "Level 4, 1-5k aktiviteter, 15-50 resurser, individ- & rollnivå",
    x: 45, y: 52,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 70, schedule_detail: 55, code_volume: 30, resource_detail: 75, risk_detail: 50, historical_data: 50, kpi_tracking: 40, data_integration: 45, reporting_freq: 45 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-9",
    name: "BSH - Helsingborg",
    description: "1-5k aktiviteter, kritisk linje, blandat engagemang bland PL",
    x: 29, y: 25,
    color: "hsl(var(--chart-4))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 25, schedule_detail: 30, code_volume: 30, resource_detail: 20, risk_detail: 25, historical_data: 25, kpi_tracking: 35, data_integration: 20, reporting_freq: 30 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-10",
    name: "Mälarbanan",
    description: "1-5k aktiviteter, månadsgranulering, floatanalys, fältförteckning",
    x: 29, y: 35,
    color: "hsl(var(--chart-5))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 30, schedule_detail: 25, code_volume: 30, resource_detail: 30, risk_detail: 35, historical_data: 35, kpi_tracking: 40, data_integration: 40, reporting_freq: 30 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-11",
    name: "E08 Haga (Västlänken)",
    description: "Level 5, SPI/CPI/EV, kostnadsimport, fältförteckning",
    x: 65, y: 63,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 90, schedule_detail: 70, code_volume: 55, resource_detail: 50, risk_detail: 55, historical_data: 60, kpi_tracking: 85, data_integration: 70, reporting_freq: 60 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-29",
  },
  {
    id: "survey-12",
    name: "Bravida FSE 905",
    description: "Level 5, 5-10k aktiviteter, disciplinnivå, tvåveckorsrapport",
    x: 64, y: 41,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 90, schedule_detail: 65, code_volume: 60, resource_detail: 55, risk_detail: 40, historical_data: 35, kpi_tracking: 35, data_integration: 30, reporting_freq: 55 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-11-02",
  },
  {
    id: "survey-13",
    name: "E05 Korsvägen - Design",
    description: "Level 5, 10-20k aktiviteter, veckoavstemning, KPI-rapporter, leveranslogg-import",
    x: 79, y: 68,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { wbs_depth: 90, schedule_detail: 80, code_volume: 80, resource_detail: 60, risk_detail: 65, historical_data: 65, kpi_tracking: 80, data_integration: 70, reporting_freq: 70 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
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
