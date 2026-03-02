import { Search, Bell } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-sm">
      <div>
        <h1 className="text-sm font-semibold text-foreground">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-56 items-center gap-2 rounded-lg border border-border bg-secondary px-3">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Search...</span>
        </div>
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-colors hover:bg-secondary">
          <Bell className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          JD
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
