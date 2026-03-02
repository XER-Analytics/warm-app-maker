import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  delay?: number;
}

const StatCard = ({ title, value, change, trend, icon: Icon, delay = 0 }: StatCardProps) => {
  return (
    <div
      className="rounded-xl border border-border bg-card p-5 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-3">
        <span className="text-2xl font-semibold tracking-tight text-foreground">{value}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-1">
        {trend === "up" ? (
          <TrendingUp className="h-3.5 w-3.5 text-success" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
        )}
        <span className={`text-xs font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
          {change}
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;
