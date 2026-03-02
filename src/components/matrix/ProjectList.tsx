import { Project, getMatrixZone } from "@/lib/projectData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectListProps {
  projects: Project[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const ProjectList = ({ projects, selectedId, onSelect }: ProjectListProps) => {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold tracking-tight">Projekt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {projects.map(project => {
          const zone = getMatrixZone(project.x, project.y);
          const isSelected = project.id === selectedId;
          return (
            <button
              key={project.id}
              onClick={() => onSelect(project.id)}
              className={cn(
                "w-full flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                isSelected ? "bg-secondary" : "hover:bg-secondary/50"
              )}
            >
              <span
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-foreground truncate">{project.name}</span>
                  {project.isUserProject && (
                    <Badge variant="secondary" className="text-[10px] h-4 px-1.5">Du</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{project.description}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                  <span>X: {project.x}</span>
                  <span>Y: {project.y}</span>
                  <span className="text-muted-foreground/60">• {zone}</span>
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ProjectList;
