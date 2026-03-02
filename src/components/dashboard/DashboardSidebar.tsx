import { LayoutDashboard, BarChart3, Users, Settings, FileText, Bell, LogOut } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: FileText, label: "Reports" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

const DashboardSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-border bg-card">
      <div className="flex h-14 items-center gap-2 border-b border-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <BarChart3 className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground tracking-tight">Metric</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
              item.active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
