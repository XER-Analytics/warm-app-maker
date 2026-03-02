const activities = [
  { id: 1, customer: "Sarah Chen", action: "Purchased Pro Plan", amount: "$49.00", time: "2 min ago", status: "completed" },
  { id: 2, customer: "Marcus Johnson", action: "Signed up", amount: "—", time: "12 min ago", status: "new" },
  { id: 3, customer: "Emily Rodriguez", action: "Upgraded plan", amount: "$29.00", time: "34 min ago", status: "completed" },
  { id: 4, customer: "Alex Kim", action: "Submitted ticket", amount: "—", time: "1 hr ago", status: "pending" },
  { id: 5, customer: "Jordan Lee", action: "Purchased Team Plan", amount: "$149.00", time: "2 hr ago", status: "completed" },
  { id: 6, customer: "Taylor Swift", action: "Cancelled subscription", amount: "—", time: "3 hr ago", status: "cancelled" },
];

const statusStyles: Record<string, string> = {
  completed: "bg-success/10 text-success",
  new: "bg-primary/10 text-primary",
  pending: "bg-warning/10 text-warning",
  cancelled: "bg-destructive/10 text-destructive",
};

const ActivityTable = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Latest customer interactions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
              <th className="pb-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              <th className="pb-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="pb-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="pb-3 text-right text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-b border-border last:border-0">
                <td className="py-3 text-[13px] font-medium text-foreground">{activity.customer}</td>
                <td className="py-3 text-[13px] text-muted-foreground">{activity.action}</td>
                <td className="py-3 text-[13px] font-medium text-foreground">{activity.amount}</td>
                <td className="py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusStyles[activity.status]}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="py-3 text-right text-[13px] text-muted-foreground">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
