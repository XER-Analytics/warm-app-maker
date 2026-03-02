import { useState } from "react";
import { AssessmentFactor, defaultFactors, calculatePosition } from "@/lib/projectData";
import { questions } from "@/lib/questionnaireData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentFormProps {
  onSubmit: (name: string, description: string, factors: AssessmentFactor[]) => void;
  initialName?: string;
  initialDescription?: string;
  initialFactors?: AssessmentFactor[];
  isEditing?: boolean;
  onDeselect?: () => void;
}

const STEPS = {
  INFO: 0,
  QUESTIONS_START: 1,
};

const AssessmentForm = ({ onSubmit, initialName = "", initialDescription = "", initialFactors, isEditing, onDeselect }: AssessmentFormProps) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [factors, setFactors] = useState<AssessmentFactor[]>(initialFactors || defaultFactors.map(f => ({ ...f })));
  const [step, setStep] = useState(isEditing ? STEPS.QUESTIONS_START : STEPS.INFO);

  const totalSteps = questions.length + 1; // info step + questions

  const updateFactor = (factorId: string, value: number) => {
    setFactors(prev => prev.map(f => f.id === factorId ? { ...f, value } : f));
  };

  const getFactorValue = (factorId: string) => {
    return factors.find(f => f.id === factorId)?.value ?? 50;
  };

  const position = calculatePosition(factors);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name.trim(), description.trim(), factors);
  };

  const handleReset = () => {
    setFactors(defaultFactors.map(f => ({ ...f })));
    setStep(STEPS.INFO);
    setName("");
    setDescription("");
  };

  const canProceedFromInfo = name.trim().length > 0;
  const currentQuestion = step >= STEPS.QUESTIONS_START ? questions[step - STEPS.QUESTIONS_START] : null;
  const isLastStep = step === totalSteps - 1;

  const xQuestions = questions.filter(q => {
    const factor = defaultFactors.find(f => f.id === q.factorId);
    return factor?.axis === "x";
  });
  const yQuestions = questions.filter(q => {
    const factor = defaultFactors.find(f => f.id === q.factorId);
    return factor?.axis === "y";
  });

  const currentQuestionAxis = currentQuestion
    ? defaultFactors.find(f => f.id === currentQuestion.factorId)?.axis
    : null;

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight">
              {isEditing ? "Redigera projekt" : "Nytt projekt"}
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              {step === STEPS.INFO
                ? "Ange projektinformation"
                : `Fråga ${step} av ${questions.length}`}
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
        {/* Progress bar */}
        <div className="flex gap-0.5 mt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <button
              key={i}
              onClick={() => (i === 0 || canProceedFromInfo) && setStep(i)}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-secondary",
                (i === 0 || canProceedFromInfo) && "cursor-pointer hover:opacity-80"
              )}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {step === STEPS.INFO ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name" className="text-xs">Projektnamn *</Label>
              <Input
                id="project-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Mitt projekt..."
                className="h-8 text-sm mt-1"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="project-desc" className="text-xs">Beskrivning</Label>
              <Textarea
                id="project-desc"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Kort beskrivning av projektet..."
                className="text-sm mt-1 min-h-[60px]"
              />
            </div>
            <Button
              className="w-full h-9 text-sm"
              disabled={!canProceedFromInfo}
              onClick={() => setStep(STEPS.QUESTIONS_START)}
            >
              Starta bedömning
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        ) : currentQuestion ? (
          <div className="space-y-4">
            <div>
              <span className={cn(
                "text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
                currentQuestionAxis === "x"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent text-accent-foreground"
              )}>
                {currentQuestionAxis === "x" ? "Detaljnivå (X-axel)" : "Datamängd (Y-axel)"}
              </span>
            </div>

            <p className="text-sm font-medium text-foreground leading-snug">
              {currentQuestion.question}
            </p>

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
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-9 text-sm"
                onClick={() => setStep(s => s - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Tillbaka
              </Button>
              {isLastStep ? (
                <Button
                  size="sm"
                  className="flex-1 h-9 text-sm"
                  onClick={handleSubmit}
                  disabled={!name.trim()}
                >
                  {isEditing ? "Uppdatera" : "Placera i matrisen"}
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="flex-1 h-9 text-sm"
                  onClick={() => setStep(s => s + 1)}
                >
                  Nästa
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            {/* Position preview */}
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

export default AssessmentForm;
