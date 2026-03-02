import { DollarSign, Users, ShoppingCart, Eye } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ActivityTable from "@/components/dashboard/ActivityTable";

const stats = [
  { title: "Total Revenue", value: "$48,230", change: "+12.5%", trend: "up" as const, icon: DollarSign },
  { title: "Active Users", value: "2,847", change: "+8.2%", trend: "up" as const, icon: Users },
  { title: "Orders", value: "1,243", change: "+3.1%", trend: "up" as const, icon: ShoppingCart },
  { title: "Page Views", value: "89.2K", change: "-2.4%", trend: "down" as const, icon: Eye },
];

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 pl-60">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground tracking-tight">Overview</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Welcome back, here's what's happening today.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.title} {...stat} delay={i * 50} />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <RevenueChart />
            </div>
            <div className="xl:col-span-2">
              <ActivityTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
