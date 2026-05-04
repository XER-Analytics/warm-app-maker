import { useState, useRef } from "react";
import { AssessmentFactor, defaultFactors, calculatePosition } from "@/lib/projectData";
import { questions } from "@/lib/questionnaireData";
import { parseXer, mapXerToFactors } from "@/lib/xerParser";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Info, RotateCcw, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentFormProps {
  onSubmit: (name: string, description: string, factors: AssessmentFactor[]) => void;
  initialName?: string;
  initialDescription?: string;
  initialFactors?: AssessmentFactor[];
  isEditing?: boolean;
  onDeselect?: () => void;
}

// ── Slider-based editor (used when editing existing projects) ──
const SliderForm = ({ onSubmit, initialName = "", initialDescription = "", initialFactors, onDeselect }: AssessmentFormProps) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [factors, setFactors] = useState<AssessmentFactor[]>(initialFactors || defaultFactors.map(f => ({ ...f })));

  const updateFactor = (id: string, value: number) => {
    setFactors(prev => prev.map(f => f.id === id ? { ...f, value } : f));
  };

  const position = calculatePosition(factors);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), description.trim(), factors);
  };

  const handleReset = () => {
    setFactors(defaultFactors.map(f => ({ ...f })));
  };

  const xFactors = factors.filter(f => f.axis === "x");
  const yFactors = factors.filter(f => f.axis === "y");

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight">Redigera projekt</CardTitle>
            <CardDescription className="text-xs mt-0.5">Justera faktorerna och spara</CardDescription>
          </div>
          <div className="flex gap-1">
            {onDeselect && (
              <Button variant="ghost" size="sm" onClick={onDeselect} className="text-xs h-7">Nytt</Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs h-7">
              <RotateCcw className="h-3 w-3 mr-1" />Återställ
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3">
            <div>
              <Label htmlFor="project-name" className="text-xs">Projektnamn</Label>
              <Input id="project-name" value={name} onChange={e => setName(e.target.value)} placeholder="Mitt projekt..." className="h-8 text-sm mt-1" />
            </div>
            <div>
              <Label htmlFor="project-desc" className="text-xs">Beskrivning</Label>
              <Textarea id="project-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="Kort beskrivning..." className="text-sm mt-1 min-h-[60px]" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Detaljnivå (X-axel)</h4>
              <div className="space-y-3">
                {xFactors.map(factor => (
                  <FactorSlider key={factor.id} factor={factor} onChange={updateFactor} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Datamängd (Y-axel)</h4>
              <div className="space-y-3">
                {yFactors.map(factor => (
                  <FactorSlider key={factor.id} factor={factor} onChange={updateFactor} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
            <span className="text-xs text-muted-foreground">Beräknad position:</span>
            <span className="text-sm font-medium text-foreground">({position.x}, {position.y})</span>
          </div>

          <Button type="submit" className="w-full h-9 text-sm" disabled={!name.trim()}>
            Uppdatera projekt
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const FactorSlider = ({ factor, onChange }: { factor: AssessmentFactor; onChange: (id: string, value: number) => void }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium text-foreground">{factor.label}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-[200px]">
            <p className="text-xs">{factor.description}</p>
            <p className="text-xs text-muted-foreground mt-1">Vikt: {Math.round(factor.weight * 100)}%</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <span className="text-xs tabular-nums text-muted-foreground w-7 text-right">{factor.value}</span>
    </div>
    <Slider value={[factor.value]} onValueChange={([v]) => onChange(factor.id, v)} min={0} max={100} step={1} className="py-0" />
  </div>
);

// ── Questionnaire (used when adding new projects) ──
const QuestionnaireForm = ({ onSubmit }: AssessmentFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [factors, setFactors] = useState<AssessmentFactor[]>(defaultFactors.map(f => ({ ...f })));
  const [step, setStep] = useState(0); // 0 = info, 1..N = questions
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = questions.length + 1;

  const handleXerImport = async (file: File) => {
    try {
      const text = await file.text();
      const data = parseXer(text);
      if (!Object.keys(data.tables).length) throw new Error("Inga tabeller hittades i filen");
      const result = mapXerToFactors(data);
      const importedFactors = defaultFactors.map(f =>
        result.factorValues[f.id] !== undefined ? { ...f, value: result.factorValues[f.id] } : { ...f }
      );
      const desc = `${result.stats.taskCount} aktiviteter · WBS-djup ${result.stats.wbsDepth} · ${result.stats.resourceCount} resurser (${result.stats.resourceLevelLabel})`;
      // Submit directly so the project lands in the matrix immediately
      onSubmit(result.projectName, desc, importedFactors);
      setName("");
      setDescription("");
      setFactors(defaultFactors.map(f => ({ ...f })));
      setStep(0);
      const filled = Object.keys(result.factorValues).length;
      toast.success("XER-fil importerad", {
        description: `${filled} av 10 faktorer fylldes automatiskt. Klicka på pricken i matrisen för att finjustera övriga.`,
      });
    } catch (err) {
      toast.error("Kunde inte läsa XER-filen", {
        description: err instanceof Error ? err.message : "Okänt fel",
      });
    }
  };

  const updateFactor = (factorId: string, value: number) => {
    setFactors(prev => prev.map(f => f.id === factorId ? { ...f, value } : f));
  };

  const getFactorValue = (factorId: string) => factors.find(f => f.id === factorId)?.value ?? 50;
  const position = calculatePosition(factors);
  const canProceed = name.trim().length > 0;
  const currentQuestion = step >= 1 ? questions[step - 1] : null;
  const isLastStep = step === totalSteps - 1;

  const currentQuestionAxis = currentQuestion
    ? defaultFactors.find(f => f.id === currentQuestion.factorId)?.axis
    : null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name.trim(), description.trim(), factors);
  };

  const handleReset = () => {
    setFactors(defaultFactors.map(f => ({ ...f })));
    setStep(0);
    setName("");
    setDescription("");
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight">Nytt projekt</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {step === 0 ? "Ange projektinformation" : `Fråga ${step} av ${questions.length}`}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs h-7">
            <RotateCcw className="h-3 w-3 mr-1" />Återställ
          </Button>
        </div>
        {/* Progress */}
        <div className="flex gap-0.5 mt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              onClick={() => (i === 0 || canProceed) && setStep(i)}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-secondary",
                (i === 0 || canProceed) && "cursor-pointer hover:opacity-80"
              )}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {step === 0 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="q-name" className="text-xs">Projektnamn *</Label>
              <Input id="q-name" value={name} onChange={e => setName(e.target.value)} placeholder="Mitt projekt..." className="h-8 text-sm mt-1" autoFocus />
            </div>
            <div>
              <Label htmlFor="q-desc" className="text-xs">Beskrivning</Label>
              <Textarea id="q-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="Kort beskrivning..." className="text-sm mt-1 min-h-[60px]" />
            </div>
            <Button className="w-full h-9 text-sm" disabled={!canProceed} onClick={() => setStep(1)}>
              Starta bedömning <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        ) : currentQuestion ? (
          <div className="space-y-4">
            <span className={cn(
              "text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
              currentQuestionAxis === "x" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"
            )}>
              {currentQuestionAxis === "x" ? "Detaljnivå (X-axel)" : "Datamängd (Y-axel)"}
            </span>

            <p className="text-sm font-medium text-foreground leading-snug">{currentQuestion.question}</p>

            <div className="space-y-2">
              {currentQuestion.options.map((option) => {
                const isSelected = getFactorValue(currentQuestion.factorId) === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => updateFactor(currentQuestion.factorId, option.value)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all",
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-secondary/50"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm" className="flex-1 h-9 text-sm" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft className="h-4 w-4 mr-1" />Tillbaka
              </Button>
              {isLastStep ? (
                <Button size="sm" className="flex-1 h-9 text-sm" onClick={handleSubmit} disabled={!name.trim()}>
                  Placera i matrisen
                </Button>
              ) : (
                <Button size="sm" className="flex-1 h-9 text-sm" onClick={() => setStep(s => s + 1)}>
                  Nästa <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
              <span className="text-xs text-muted-foreground">Beräknad position:</span>
              <span className="text-sm font-medium text-foreground">({position.x}, {position.y})</span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

// ── Main wrapper: show questionnaire for new, sliders for editing ──
const AssessmentForm = (props: AssessmentFormProps) => {
  if (props.isEditing) {
    return <SliderForm {...props} />;
  }
  return <QuestionnaireForm {...props} />;
};

export default AssessmentForm;
