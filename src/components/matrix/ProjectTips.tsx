import { Project, getMatrixZone } from "@/lib/projectData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb, TrendingUp } from "lucide-react";

interface ProjectTipsProps {
  project: Project | null;
}

const tipsByZone: Record<string, { tips: string[]; nextSteps: string[] }> = {
  "Tidigt skede": {
    tips: [
      "Projektet befinner sig i ett tidigt skede med begränsad data och grov planering.",
      "Detta är normalt för nya projekt men innebär hög osäkerhet i estimat.",
    ],
    nextSteps: [
      "Definiera en grundläggande WBS med minst 3 nivåer",
      "Etablera baslinjer för tid och kostnad",
      "Identifiera och dokumentera minst 10 risker",
      "Börja samla in historisk data från liknande projekt",
    ],
  },
  "Strukturerad start": {
    tips: [
      "God struktur i planeringen men datamängden behöver öka.",
      "Fokusera på att bygga upp datadrivna beslutsunderlag.",
    ],
    nextSteps: [
      "Implementera regelbunden KPI-uppföljning",
      "Integrera tidsrapportering med projektsystemet",
      "Etablera ett dashboard för realtidsdata",
    ],
  },
  "Detaljerat men datafattigt": {
    tips: [
      "Hög detaljnivå i planeringen men bristfällig datagrund.",
      "Risk att detaljerade planer inte baseras på verkligheten.",
    ],
    nextSteps: [
      "Validera planerna mot historisk data",
      "Implementera automatisk datainsamling",
      "Skapa feedback-loopar från utförande till planering",
    ],
  },
  "Datarikt men ostrukturerat": {
    tips: [
      "Mycket data finns tillgänglig men planeringen är grovkornig.",
      "Potential att utnyttja data för bättre planering.",
    ],
    nextSteps: [
      "Detaljera WBS baserat på tillgänglig data",
      "Använd historisk data för bättre estimat",
      "Skapa en detaljerad resursplan",
    ],
  },
  "Balanserat": {
    tips: [
      "Projektet har en god balans mellan detalj och data.",
      "Fokusera på att optimera och finjustera.",
    ],
    nextSteps: [
      "Implementera earned value-analys",
      "Förfina riskkvantifieringen",
      "Automatisera rapportering",
    ],
  },
  "Välplanerat": {
    tips: [
      "Detaljerad planering med rimlig datamängd.",
      "Nära optimalt läge – fokusera på datadriven uppföljning.",
    ],
    nextSteps: [
      "Öka frekvensen på datauppföljning",
      "Implementera prediktiv analys",
      "Benchmarka mot branschen",
    ],
  },
  "Dataöverflöd utan struktur": {
    tips: [
      "Mycket data men planeringen utnyttjar den inte.",
      "Stor potential om planeringen struktureras upp.",
    ],
    nextSteps: [
      "Mappa data mot projektstrukturen",
      "Definiera tydliga planeringsprocesser",
      "Använd data för att skapa detaljerade milstolpeplaner",
    ],
  },
  "Datadrivet": {
    tips: [
      "Stark datastyrning med god planeringsnivå.",
      "Öka detaljnivån för att nå optimalt läge.",
    ],
    nextSteps: [
      "Fördjupa WBS ytterligare",
      "Detaljplanera kommande 4–6 veckor rullande",
      "Integrera avvikelsehantering med planeringen",
    ],
  },
  "Optimalt läge": {
    tips: [
      "Projektet är i ett optimalt planeringsläge!",
      "Fokusera på att bibehålla och sprida best practices.",
    ],
    nextSteps: [
      "Dokumentera framgångsfaktorer som mallar",
      "Mentorsera andra projekt i organisationen",
      "Utforska avancerad analys som Monte Carlo-simulering",
    ],
  },
};

const ProjectTips = ({ project }: ProjectTipsProps) => {
  if (!project) {
    return (
      <Card className="border-border">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <Lightbulb className="h-8 w-8 text-muted-foreground/30 mb-2" />
          <p className="text-sm text-muted-foreground">Välj ett projekt för att se rekommendationer</p>
        </CardContent>
      </Card>
    );
  }

  const zone = getMatrixZone(project.x, project.y);
  const data = tipsByZone[zone] || tipsByZone["Balanserat"];

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-semibold tracking-tight">Utvecklingstips</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          Zon: <span className="font-medium text-foreground">{zone}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          {data.tips.map((tip, i) => (
            <p key={i} className="text-xs text-muted-foreground leading-relaxed">{tip}</p>
          ))}
        </div>

        <div>
          <h4 className="text-xs font-semibold text-foreground mb-2">Rekommenderade steg</h4>
          <div className="space-y-1.5">
            {data.nextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <ArrowRight className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                <span className="text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTips;
