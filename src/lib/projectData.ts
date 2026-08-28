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
  { id: "code_volume", label: "Kodmängd (antal aktiviteter)", description: "Hur många aktiviteter/koder innehåller planen?", axis: "x", weight: 0.33, value: 50 },
  { id: "wbs_depth", label: "WBS-djup", description: "Hur många nivåer är planen nedbruten i (WBS-struktur)?", axis: "x", weight: 0.12, value: 50 },
  { id: "schedule_detail", label: "Tidplansdetalj", description: "Hur granulär är tidplanen (milstolpar vs dagliga aktiviteter)?", axis: "x", weight: 0.17, value: 50 },
  { id: "reporting_freq", label: "Rapporteringsfrekvens", description: "Hur ofta samlas och rapporteras data?", axis: "x", weight: 0.20, value: 50 },
  { id: "historical_data", label: "Historisk data", description: "Hur mycket historisk projektdata finns tillgänglig?", axis: "x", weight: 0.18, value: 50 },
  // Y-axis factors (datamängd)
  { id: "resource_count", label: "Antal resurser", description: "Hur många resurser är kopplade till projektet?", axis: "y", weight: 0.30, value: 50 },
  { id: "resource_level", label: "Resursnivå", description: "På vilken nivå planeras resurserna (roll, disciplin, individ)?", axis: "y", weight: 0.25, value: 50 },
  { id: "risk_detail", label: "Riskhantering", description: "Hur noggrant är risker identifierade och kvantifierade?", axis: "y", weight: 0.15, value: 50 },
  { id: "kpi_tracking", label: "KPI-uppföljning", description: "Hur många nyckeltal följs upp kontinuerligt?", axis: "y", weight: 0.12, value: 50 },
  { id: "data_integration", label: "Dataintegration", description: "Hur väl integrerade är datakällorna (ERP, tidrapporter etc.)?", axis: "y", weight: 0.18, value: 50 },
];

export const demoProjects: Project[] = [
  {
    id: "survey-1",
    name: "Ringhals Revisionsplanering",
    description: "Kärnkraft, 10-20k aktiviteter, timgranulering, daglig avstämning, SAP-import",
    x: 80, y: 66,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 85, wbs_depth: 65, schedule_detail: 85, resource_count: 60, resource_level: 75, risk_detail: 60, historical_data: 65, kpi_tracking: 60, data_integration: 75, reporting_freq: 90 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-2",
    name: "E02 - Centralen",
    description: "Level 3, 20k+ aktiviteter, SPI/CPI/EV, 50+ resurser, individnivå",
    x: 72, y: 80,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 90, wbs_depth: 50, schedule_detail: 60, resource_count: 80, resource_level: 90, risk_detail: 60, historical_data: 70, kpi_tracking: 90, data_integration: 75, reporting_freq: 70 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-3",
    name: "NKT Castling",
    description: "5-10k aktiviteter, 50+ resurser, multi-nivå resursplanering, 6 delprojekt",
    x: 54, y: 62,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 65, wbs_depth: 35, schedule_detail: 50, resource_count: 75, resource_level: 70, risk_detail: 50, historical_data: 55, kpi_tracking: 45, data_integration: 50, reporting_freq: 50 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-4",
    name: "E05 Korsvägen",
    description: "Level 5, 20k+ aktiviteter, veckoavstemning, EV & kritiska kedjor",
    x: 79, y: 58,
    color: "hsl(var(--chart-4))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 95, wbs_depth: 75, schedule_detail: 80, resource_count: 50, resource_level: 55, risk_detail: 70, historical_data: 60, kpi_tracking: 75, data_integration: 55, reporting_freq: 70 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-5",
    name: "Andion",
    description: "Mindre projekt, 1-5k aktiviteter, månadsrapporter, inga resurser",
    x: 25, y: 11,
    color: "hsl(var(--chart-5))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 30, wbs_depth: 20, schedule_detail: 25, resource_count: 10, resource_level: 10, risk_detail: 15, historical_data: 15, kpi_tracking: 10, data_integration: 10, reporting_freq: 30 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-6",
    name: "Volvo Cars TBA",
    description: "1-5k aktiviteter, veckoavstemning, månadsrapport & kritisk linje",
    x: 33, y: 27,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 35, wbs_depth: 15, schedule_detail: 35, resource_count: 25, resource_level: 30, risk_detail: 30, historical_data: 25, kpi_tracking: 35, data_integration: 20, reporting_freq: 45 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-7",
    name: "Volvo Cars Näst",
    description: "Tidigt skede, 0-1k aktiviteter, enkel månadsrapport",
    x: 14, y: 10,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 10, wbs_depth: 10, schedule_detail: 15, resource_count: 10, resource_level: 10, risk_detail: 10, historical_data: 10, kpi_tracking: 10, data_integration: 10, reporting_freq: 25 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-27",
  },
  {
    id: "survey-8",
    name: "Barsebäck - Nedmonteringen",
    description: "Level 4, 1-5k aktiviteter, 15-50 resurser, individ- & rollnivå",
    x: 46, y: 49,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 45, wbs_depth: 30, schedule_detail: 55, resource_count: 40, resource_level: 65, risk_detail: 50, historical_data: 50, kpi_tracking: 40, data_integration: 45, reporting_freq: 45 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-9",
    name: "BSH - Helsingborg",
    description: "1-5k aktiviteter, kritisk linje, blandat engagemang bland PL",
    x: 28, y: 24,
    color: "hsl(var(--chart-4))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 30, wbs_depth: 25, schedule_detail: 30, resource_count: 20, resource_level: 25, risk_detail: 25, historical_data: 25, kpi_tracking: 35, data_integration: 20, reporting_freq: 30 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-10",
    name: "Mälarbanan",
    description: "1-5k aktiviteter, månadsgranulering, floatanalys, fältförteckning",
    x: 30, y: 35,
    color: "hsl(var(--chart-5))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 35, wbs_depth: 15, schedule_detail: 25, resource_count: 30, resource_level: 35, risk_detail: 35, historical_data: 35, kpi_tracking: 40, data_integration: 40, reporting_freq: 30 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-28",
  },
  {
    id: "survey-11",
    name: "E08 Haga (Västlänken)",
    description: "Level 5, SPI/CPI/EV, kostnadsimport, fältförteckning",
    x: 64, y: 57,
    color: "hsl(var(--chart-1))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 60, wbs_depth: 75, schedule_detail: 70, resource_count: 45, resource_level: 50, risk_detail: 55, historical_data: 60, kpi_tracking: 85, data_integration: 70, reporting_freq: 60 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-10-29",
  },
  {
    id: "survey-12",
    name: "Bravida FSE 905",
    description: "Level 5, 5-10k aktiviteter, disciplinnivå, tvåveckorsrapport",
    x: 59, y: 43,
    color: "hsl(var(--chart-2))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 70, wbs_depth: 60, schedule_detail: 65, resource_count: 45, resource_level: 55, risk_detail: 40, historical_data: 35, kpi_tracking: 35, data_integration: 30, reporting_freq: 55 };
      return { ...f, value: vals[f.id] ?? 50 };
    }),
    createdAt: "2025-11-02",
  },
  {
    id: "survey-13",
    name: "E05 Korsvägen - Design",
    description: "Level 5, 10-20k aktiviteter, veckoavstemning, KPI-rapporter, leveranslogg-import",
    x: 76, y: 63,
    color: "hsl(var(--chart-3))",
    factors: defaultFactors.map(f => {
      const vals: Record<string, number> = { code_volume: 85, wbs_depth: 75, schedule_detail: 80, resource_count: 55, resource_level: 60, risk_detail: 65, historical_data: 65, kpi_tracking: 80, data_integration: 70, reporting_freq: 70 };
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

// Convert a factor's 0-100 score to a human-readable, real-world description
export function describeFactorValue(factorId: string, value: number): string {
  switch (factorId) {
    case "code_volume": {
      const tasks = value < 15 ? "< 1 000" : value < 35 ? "1 000–5 000" : value < 55 ? "5 000–10 000" : value < 75 ? "10 000–20 000" : "> 20 000";
      return `${tasks} aktiviteter i planen`;
    }
    case "wbs_depth":
      if (value < 25) return "platt struktur utan WBS-nivåer";
      if (value < 50) return "2–3 nivåer i WBS";
      if (value < 75) return "3–5 nivåer i WBS";
      return "5+ nivåer i WBS";
    case "schedule_detail":
      if (value < 25) return "milstolpsnivå";
      if (value < 50) return "månadsgranulering";
      if (value < 75) return "veckogranulering";
      return "dags- eller timgranulering";
    case "reporting_freq":
      if (value < 25) return "rapporterar kvartalsvis eller mer sällan";
      if (value < 50) return "rapporterar månadsvis";
      if (value < 75) return "rapporterar veckovis";
      return "rapporterar dagligen";
    case "historical_data":
      if (value < 25) return "ingen eller obefintlig historisk data";
      if (value < 50) return "sporadisk historisk data från enstaka projekt";
      if (value < 75) return "strukturerad data från flera tidigare projekt";
      return "omfattande och välstrukturerad historisk databas";
    case "resource_count": {
      const count = value < 15 ? "< 15" : value < 40 ? "15–50" : value < 70 ? "ca 50" : "50+";
      return `${count} resurser`;
    }
    case "resource_level":
      if (value < 25) return "resurser planeras på rollnivå";
      if (value < 60) return "resurser planeras på disciplinnivå";
      return "resurser planeras på individnivå";
    case "risk_detail":
      if (value < 25) return "riskområden är grovt identifierade";
      if (value < 50) return "risklogg finns utan kvantifiering";
      if (value < 75) return "risker kvantifieras (sannolikhet/konsekvens)";
      return "fullständig riskanalys med simulering (t.ex. Monte Carlo)";
    case "kpi_tracking": {
      const kpis = value < 20 ? "0–1" : value < 45 ? "2–3" : value < 70 ? "4–6" : "7+";
      return `${kpis} KPI:er följs upp`;
    }
    case "data_integration":
      if (value < 25) return "manuell datahantering (Excel)";
      if (value < 50) return "delvis integration mot något system";
      if (value < 75) return "integration mot ERP/tidrapportering";
      return "fullt integrerad dataflödeskedja";
    default:
      return `${value}/100`;
  }
}

export interface PositionExplanation {
  xDrivers: { label: string; contribution: number; description: string }[];
  yDrivers: { label: string; contribution: number; description: string }[];
  summary: string;
}

export function explainPosition(project: Project): PositionExplanation {
  const ranked = (axis: "x" | "y") => {
    const factors = project.factors.filter(f => f.axis === axis);
    const totalWeight = factors.reduce((s, f) => s + f.weight, 0);
    return factors
      .map(f => ({
        label: f.label,
        description: describeFactorValue(f.id, f.value),
        contribution: Math.round((f.value * f.weight) / totalWeight),
      }))
      .sort((a, b) => b.contribution - a.contribution);
  };

  const xDrivers = ranked("x");
  const yDrivers = ranked("y");
  const zone = getMatrixZone(project.x, project.y);

  const topX = xDrivers[0];
  const topY = yDrivers[0];
  const summary = `${project.name} hamnar i zonen "${zone}". ` +
    `Detaljnivån på X-axeln drivs främst av ${topX.label.toLowerCase()} – ${topX.description}. ` +
    `Datamängden på Y-axeln påverkas främst av ${topY.label.toLowerCase()} – ${topY.description}.`;

  return { xDrivers, yDrivers, summary };
}
