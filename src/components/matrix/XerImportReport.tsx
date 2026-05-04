import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Minus, FileText, Database, Layers, Users, AlertTriangle, Clock } from "lucide-react";
import { defaultFactors } from "@/lib/projectData";
import type { XerImportResult } from "@/lib/xerParser";

interface XerImportReportProps {
  open: boolean;
  onClose: () => void;
  report: XerImportResult | null;
}

const KEY_TABLES = ["PROJECT", "TASK", "PROJWBS", "RSRC", "TASKRSRC", "RISKTYPE", "ACTVCODE", "CALENDAR"];

const XerImportReport = ({ open, onClose, report }: XerImportReportProps) => {
  if (!report) return null;

  const mappedIds = new Set(Object.keys(report.factorValues));
  const mapped = defaultFactors.filter(f => mappedIds.has(f.id));
  const unmapped = defaultFactors.filter(f => !mappedIds.has(f.id));

  const tablesByName = new Map(report.tablesFound.map(t => [t.name, t.rowCount]));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Importrapport — {report.projectName}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Sammanfattning av vad som lästes från XER-filen och hur det mappades till matrisen.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-3 -mr-3">
          <div className="space-y-5 py-1">
            {/* Key stats */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Nyckeltal</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <StatTile icon={<Database className="h-3.5 w-3.5" />} label="Aktiviteter" value={report.stats.taskCount.toLocaleString("sv-SE")} />
                <StatTile icon={<Layers className="h-3.5 w-3.5" />} label="WBS-noder" value={String(report.stats.wbsCount)} sub={`Djup ${report.stats.wbsDepth}`} />
                <StatTile icon={<Clock className="h-3.5 w-3.5" />} label="Snittlängd" value={`${report.stats.avgDurationHours} h`} />
                <StatTile icon={<Users className="h-3.5 w-3.5" />} label="Resurser" value={String(report.stats.resourceCount)} sub={report.stats.resourceLevelLabel} />
                <StatTile icon={<AlertTriangle className="h-3.5 w-3.5" />} label="Risker" value={String(report.stats.riskCount)} />
                <StatTile icon={<FileText className="h-3.5 w-3.5" />} label="Tabeller" value={String(report.tablesFound.length)} />
              </div>
            </section>

            {/* Tables */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Hittade tabeller</h3>
              <div className="rounded-md border border-border overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto] text-[11px] font-medium uppercase tracking-wider bg-muted/50 px-3 py-1.5 text-muted-foreground">
                  <span>Tabell</span>
                  <span className="px-3">Rader</span>
                  <span>Status</span>
                </div>
                <div className="divide-y divide-border">
                  {KEY_TABLES.map(name => {
                    const count = tablesByName.get(name);
                    const present = count !== undefined;
                    return (
                      <div key={name} className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-1.5 text-xs">
                        <span className="font-mono text-foreground">{name}</span>
                        <span className="px-3 tabular-nums text-muted-foreground">{present ? count!.toLocaleString("sv-SE") : "—"}</span>
                        {present ? (
                          <Badge variant="secondary" className="text-[10px] h-5 px-1.5 gap-1"><Check className="h-3 w-3" />Hittad</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] h-5 px-1.5 gap-1 text-muted-foreground"><Minus className="h-3 w-3" />Saknas</Badge>
                        )}
                      </div>
                    );
                  })}
                  {report.tablesFound.filter(t => !KEY_TABLES.includes(t.name)).map(t => (
                    <div key={t.name} className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-1.5 text-xs">
                      <span className="font-mono text-muted-foreground">{t.name}</span>
                      <span className="px-3 tabular-nums text-muted-foreground">{t.rowCount.toLocaleString("sv-SE")}</span>
                      <span className="text-[10px] text-muted-foreground">övrig</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Mapped factors */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Mappade faktorer ({mapped.length} av {defaultFactors.length})
              </h3>
              <div className="space-y-1">
                {mapped.map(f => (
                  <div key={f.id} className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-foreground">{f.label}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.axis}-axel</span>
                    </div>
                    <span className="text-sm font-medium tabular-nums text-foreground">{report.factorValues[f.id]}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Unmapped factors */}
            {unmapped.length > 0 && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Behöver kompletteras manuellt ({unmapped.length})
                </h3>
                <div className="space-y-1">
                  {unmapped.map(f => (
                    <div key={f.id} className="flex items-start justify-between rounded-md border border-dashed border-border px-3 py-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                        <div>
                          <span className="font-medium text-foreground">{f.label}</span>
                          <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground">{f.axis}-axel</span>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{f.description}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums">50 (default)</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 leading-snug">
                  Klicka på projektets prick i matrisen för att finjustera dessa reglage.
                </p>
              </section>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onClose} size="sm" className="h-8 text-xs">Stäng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const StatTile = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) => (
  <div className="rounded-md border border-border bg-card px-3 py-2">
    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
      {icon}{label}
    </div>
    <div className="text-base font-semibold text-foreground mt-0.5 tabular-nums">{value}</div>
    {sub && <div className="text-[11px] text-muted-foreground truncate">{sub}</div>}
  </div>
);

export default XerImportReport;
