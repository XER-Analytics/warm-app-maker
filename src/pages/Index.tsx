import React, { useState, useCallback } from "react";
import { Project, demoProjects, defaultFactors, calculatePosition, AssessmentFactor } from "@/lib/projectData";
import MatrixChart from "@/components/matrix/MatrixChart";
import AssessmentForm from "@/components/matrix/AssessmentForm";
import ProjectList from "@/components/matrix/ProjectList";
import ProjectTips from "@/components/matrix/ProjectTips";
import { LayoutGrid } from "lucide-react";

const Index: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const selectedProject = projects.find(p => p.id === selectedId) || null;

  const handleSubmit = useCallback((name: string, description: string, factors: AssessmentFactor[]) => {
    const pos = calculatePosition(factors);
    const newProject: Project = {
      id: `user-${Date.now()}`,
      name,
      description,
      x: pos.x,
      y: pos.y,
      color: "hsl(var(--primary))",
      isUserProject: true,
      factors,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects(prev => [...prev.filter(p => !p.isUserProject), newProject]);
    setSelectedId(newProject.id);
  }, []);

  const handleManualDrop = useCallback((x: number, y: number) => {
    const userProject = projects.find(p => p.isUserProject);
    if (userProject) {
      setProjects(prev => prev.map(p =>
        p.isUserProject ? { ...p, x, y } : p
      ));
    }
  }, [projects]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-7xl flex items-center gap-2.5 px-6 h-14">
          <LayoutGrid className="h-4.5 w-4.5 text-primary" />
          <h1 className="text-sm font-semibold text-foreground tracking-tight">Projektplaneringsmatris</h1>
          <span className="text-xs text-muted-foreground ml-1">— Kartlägg ditt projekts planeringsläge</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: Assessment form */}
          <div className="lg:col-span-3 space-y-5">
            <AssessmentForm onSubmit={handleSubmit} />
          </div>

          {/* Center: Matrix */}
          <div className="lg:col-span-6">
            <MatrixChart
              projects={projects}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDrop={handleManualDrop}
            />
          </div>

          {/* Right: Projects + Tips */}
          <div className="lg:col-span-3 space-y-5">
            <ProjectList projects={projects} selectedId={selectedId} onSelect={setSelectedId} />
            <ProjectTips project={selectedProject} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
