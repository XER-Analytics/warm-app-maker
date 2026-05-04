// XER (Primavera P6) parser — runs entirely in the browser.
// Maps a .xer export to the 7 "safe" assessment factors.

export interface XerTable {
  fields: string[];
  rows: string[][];
}

export interface XerData {
  tables: Record<string, XerTable>;
}

export interface XerImportResult {
  projectName: string;
  description: string;
  factorValues: Record<string, number>; // factorId -> 0..100
  tablesFound: { name: string; rowCount: number }[];
  stats: {
    taskCount: number;
    wbsDepth: number;
    wbsCount: number;
    avgDurationHours: number;
    resourceCount: number;
    resourceLevelLabel: string;
    riskCount: number;
  };
}

export function parseXer(text: string): XerData {
  const tables: Record<string, XerTable> = {};
  let current: string | null = null;

  for (const raw of text.split(/\r?\n/)) {
    if (!raw) continue;
    const parts = raw.split("\t");
    const tag = parts[0];
    if (tag === "%T") {
      current = parts[1];
      tables[current] = { fields: [], rows: [] };
    } else if (tag === "%F" && current) {
      tables[current].fields = parts.slice(1);
    } else if (tag === "%R" && current) {
      tables[current].rows.push(parts.slice(1));
    }
  }
  return { tables };
}

const fieldIndex = (t: XerTable | undefined, name: string) =>
  t ? t.fields.indexOf(name) : -1;

function computeWbsDepth(wbs: XerTable): number {
  if (!wbs.rows.length) return 0;
  const idIdx = fieldIndex(wbs, "wbs_id");
  const parentIdx = fieldIndex(wbs, "parent_wbs_id");
  if (idIdx < 0 || parentIdx < 0) return 0;

  const parentMap = new Map<string, string>();
  for (const r of wbs.rows) parentMap.set(r[idIdx], r[parentIdx] || "");

  let max = 0;
  for (const id of parentMap.keys()) {
    let depth = 1;
    let cur = parentMap.get(id) || "";
    const visited = new Set<string>();
    while (cur && parentMap.has(cur) && !visited.has(cur)) {
      visited.add(cur);
      depth++;
      cur = parentMap.get(cur) || "";
    }
    if (depth > max) max = depth;
  }
  return max;
}

// Map raw metric → 0..100 score using piecewise linear thresholds.
function scale(value: number, points: Array<[number, number]>): number {
  // points sorted by input value ascending; returns interpolated score
  if (value <= points[0][0]) return points[0][1];
  if (value >= points[points.length - 1][0]) return points[points.length - 1][1];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (value <= x1) {
      const t = (value - x0) / (x1 - x0);
      return Math.round(y0 + t * (y1 - y0));
    }
  }
  return points[points.length - 1][1];
}

export function mapXerToFactors(data: XerData): XerImportResult {
  const proj = data.tables["PROJECT"];
  const task = data.tables["TASK"];
  const wbs = data.tables["PROJWBS"];
  const rsrc = data.tables["RSRC"];
  const taskrsrc = data.tables["TASKRSRC"];
  const risk = data.tables["RISKTYPE"] || data.tables["RISK"];

  // --- Project name + description ---
  let projectName = "Importerat XER-projekt";
  let description = "Importerad från Primavera XER-fil";
  if (proj?.rows.length) {
    const nameIdx = fieldIndex(proj, "proj_short_name");
    if (nameIdx >= 0) projectName = (proj.rows[0][nameIdx] || projectName).replace(/_/g, " ");
  }

  // --- Raw stats ---
  const taskCount = task?.rows.length ?? 0;
  const wbsCount = wbs?.rows.length ?? 0;
  const wbsDepth = wbs ? computeWbsDepth(wbs) : 0;

  // Avg target duration hours (TASK.target_drtn_hr_cnt)
  let avgDuration = 0;
  if (task?.rows.length) {
    const di = fieldIndex(task, "target_drtn_hr_cnt");
    if (di >= 0) {
      const vals = task.rows.map(r => parseFloat(r[di]) || 0).filter(v => v > 0);
      if (vals.length) avgDuration = vals.reduce((a, b) => a + b, 0) / vals.length;
    }
  }

  // Resources: prefer unique rsrc_id from TASKRSRC; fall back to RSRC count
  let resourceCount = 0;
  if (taskrsrc?.rows.length) {
    const ri = fieldIndex(taskrsrc, "rsrc_id");
    if (ri >= 0) resourceCount = new Set(taskrsrc.rows.map(r => r[ri])).size;
  }
  if (!resourceCount && rsrc) resourceCount = rsrc.rows.length;

  // Resource type breakdown
  let resourceLevelScore = 10;
  let resourceLevelLabel = "Inga resurser";
  if (rsrc?.rows.length) {
    const ti = fieldIndex(rsrc, "rsrc_type");
    const types = ti >= 0 ? rsrc.rows.map(r => r[ti]) : [];
    const hasLabor = types.some(t => t === "RT_Labor"); // individuals
    const hasEquip = types.some(t => t === "RT_Equip");
    const hasMat = types.some(t => t === "RT_Mat");
    if (hasLabor && (hasEquip || hasMat)) {
      resourceLevelScore = 75;
      resourceLevelLabel = "Individ + utrustning/material";
    } else if (hasLabor) {
      resourceLevelScore = 60;
      resourceLevelLabel = "Individnivå (labor)";
    } else if (hasEquip || hasMat) {
      resourceLevelScore = 35;
      resourceLevelLabel = "Endast utrustning/material";
    } else {
      resourceLevelScore = 30;
      resourceLevelLabel = "Generella resurser";
    }
  }

  const riskCount = risk?.rows.length ?? 0;

  // --- Map to 0..100 factor scores ---
  // X-axis (säkra)
  const code_volume = scale(taskCount, [
    [0, 5], [500, 25], [1000, 40], [5000, 65], [20000, 90], [50000, 100],
  ]);
  const wbs_depth = scale(wbsDepth, [
    [0, 5], [2, 25], [3, 45], [4, 65], [5, 80], [7, 95],
  ]);
  const schedule_detail = scale(avgDuration, [
    [0, 50], [8, 90], [40, 70], [160, 50], [480, 30], [2000, 10],
  ]);

  // Y-axis (säkra)
  const resource_count = scale(resourceCount, [
    [0, 5], [5, 25], [15, 45], [50, 70], [200, 90], [1000, 100],
  ]);
  const risk_detail = scale(riskCount, [
    [0, 5], [5, 35], [20, 60], [50, 80], [100, 95],
  ]);

  return {
    projectName,
    description,
    factorValues: {
      code_volume,
      wbs_depth,
      schedule_detail,
      resource_count,
      resource_level: resourceLevelScore,
      risk_detail,
      // Other factors left for the user to set:
      // reporting_freq, historical_data, kpi_tracking, data_integration
    },
    stats: {
      taskCount,
      wbsDepth,
      wbsCount,
      avgDurationHours: Math.round(avgDuration * 10) / 10,
      resourceCount,
      resourceLevelLabel,
      riskCount,
    },
  };
}
