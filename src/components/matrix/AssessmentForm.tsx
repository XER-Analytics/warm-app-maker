import { useState } from "react";
import { AssessmentFactor, defaultFactors, calculatePosition } from "@/lib/projectData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, RotateCcw } from "lucide-react";

interface AssessmentFormProps {
  onSubmit: (name: string, description: string, factors: AssessmentFactor[]) => void;
  initialName?: string;
  initialDescription?: string;
  initialFactors?: AssessmentFactor[];
  isEditing?: boolean;
  onDeselect?: () => void;
}

const AssessmentForm = ({ onSubmit, initialName = "", initialDescription = "", initialFactors, isEditing, onDeselect }: AssessmentFormProps) => {
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
            <CardTitle className="text-base font-semibold tracking-tight">
              {isEditing ? "Redigera projekt" : "Nytt projekt"}
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {isEditing ? "Justera faktorerna och spara" : "Besvara faktorerna för att placera ditt projekt"}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            {isEditing && onDeselect && (
              <Button variant="ghost" size="sm" onClick={onDeselect} className="text-xs h-7">
                Nytt
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs h-7">
              <RotateCcw className="h-3 w-3 mr-1" />
              Återställ
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
            {isEditing ? "Uppdatera projekt" : "Placera i matrisen"}
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
    <Slider
      value={[factor.value]}
      onValueChange={([v]) => onChange(factor.id, v)}
      min={0}
      max={100}
      step={1}
      className="py-0"
    />
  </div>
);

export default AssessmentForm;
