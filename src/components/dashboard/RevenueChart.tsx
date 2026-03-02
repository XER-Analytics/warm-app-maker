import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 4200, expenses: 2800 },
  { month: "Feb", revenue: 4800, expenses: 3100 },
  { month: "Mar", revenue: 5100, expenses: 2900 },
  { month: "Apr", revenue: 4600, expenses: 3200 },
  { month: "May", revenue: 5800, expenses: 3000 },
  { month: "Jun", revenue: 6200, expenses: 3400 },
  { month: "Jul", revenue: 5900, expenses: 3100 },
  { month: "Aug", revenue: 6800, expenses: 3500 },
  { month: "Sep", revenue: 7200, expenses: 3300 },
  { month: "Oct", revenue: 6900, expenses: 3600 },
  { month: "Nov", revenue: 7600, expenses: 3400 },
  { month: "Dec", revenue: 8100, expenses: 3700 },
];

const RevenueChart = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue and expenses</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(220, 60%, 50%)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(220, 60%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(220, 8%, 50%)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(220, 8%, 50%)" }}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(220, 60%, 50%)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(220, 8%, 70%)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
