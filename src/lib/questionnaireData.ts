export interface QuestionOption {
  label: string;
  value: number; // 0-100 mapping
}

export interface Question {
  factorId: string;
  question: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  // X-axis: Detaljnivå
  {
    factorId: "wbs_depth",
    question: "Hur ser projektets nedbrytningsstruktur (WBS) ut?",
    options: [
      { label: "Ej definierad eller bara övergripande faser", value: 10 },
      { label: "2–3 nivåer med huvudaktiviteter", value: 35 },
      { label: "4 nivåer med delaktiviteter per disciplin", value: 65 },
      { label: "5+ nivåer, detaljerad per arbetspaket", value: 90 },
    ],
  },
  {
    factorId: "schedule_detail",
    question: "Hur detaljerad är tidplanen?",
    options: [
      { label: "Milstolpar och övergripande faser", value: 10 },
      { label: "Månadsplanering med huvudaktiviteter", value: 35 },
      { label: "Veckoplanering med beroenden", value: 65 },
      { label: "Daglig/timgranulering med logiska kopplingar", value: 90 },
    ],
  },
  {
    factorId: "code_volume",
    question: "Hur många aktiviteter/koder finns i tidplanen?",
    options: [
      { label: "Färre än 1 000", value: 10 },
      { label: "1 000–5 000", value: 35 },
      { label: "5 000–20 000", value: 65 },
      { label: "Mer än 20 000", value: 90 },
    ],
  },
  {
    factorId: "reporting_freq",
    question: "Hur ofta rapporteras och stäms tidplanen av?",
    options: [
      { label: "Kvartalsvis eller mer sällan", value: 10 },
      { label: "Månadsvis", value: 35 },
      { label: "Varannan vecka / veckovis", value: 65 },
      { label: "Dagligen eller oftare", value: 90 },
    ],
  },
  // Y-axis: Datamängd
  {
    factorId: "resource_count",
    question: "Hur många resurser är kopplade till projektet?",
    options: [
      { label: "Inga eller färre än 5", value: 10 },
      { label: "5–15 resurser", value: 35 },
      { label: "15–50 resurser", value: 65 },
      { label: "Mer än 50 resurser", value: 90 },
    ],
  },
  {
    factorId: "resource_level",
    question: "På vilken nivå planeras resurserna?",
    options: [
      { label: "Inga resurser kopplade", value: 10 },
      { label: "Övergripande rollnivå", value: 35 },
      { label: "Disciplin/team med beläggning", value: 65 },
      { label: "Individnivå med detaljerad kapacitetsplanering", value: 90 },
    ],
  },
  {
    factorId: "risk_detail",
    question: "Hur hanteras risker i projektet?",
    options: [
      { label: "Ingen formell riskhantering", value: 10 },
      { label: "Risklista utan kvantifiering", value: 35 },
      { label: "Riskregister med sannolikhet och konsekvens", value: 65 },
      { label: "Kvantitativ riskanalys (Monte Carlo eller liknande)", value: 90 },
    ],
  },
  {
    factorId: "historical_data",
    question: "Hur mycket historisk projektdata finns tillgänglig?",
    options: [
      { label: "Ingen eller mycket begränsad", value: 10 },
      { label: "Viss data från tidigare projekt", value: 35 },
      { label: "Strukturerad databas med jämförbara projekt", value: 65 },
      { label: "Omfattande benchmarkdata med nyckeltal", value: 90 },
    ],
  },
  {
    factorId: "kpi_tracking",
    question: "Vilka nyckeltal (KPI:er) följs upp?",
    options: [
      { label: "Inga formella KPI:er", value: 10 },
      { label: "Grundläggande (t.ex. milstolpar klara)", value: 35 },
      { label: "SPI, CPI eller liknande EV-mått", value: 65 },
      { label: "Fullständig EVM med SPI/CPI/EAC och trendanalys", value: 90 },
    ],
  },
  {
    factorId: "data_integration",
    question: "Hur integrerade är datakällorna?",
    options: [
      { label: "Allt sköts manuellt (Excel/e-post)", value: 10 },
      { label: "Import/export mellan system (CSV etc.)", value: 35 },
      { label: "Delvis integrerat (API/automatisk import)", value: 65 },
      { label: "Fullt integrerat (ERP, tidrapporter, ekonomi i realtid)", value: 90 },
    ],
  },
];
