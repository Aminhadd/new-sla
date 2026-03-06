import { Card } from "@/components/ui/card";
import { dashboardSnapshot } from "@/lib/demo/data";

export default function DashboardPage() {
  const metrics = [
    ["Open maintenance backlog", Object.values(dashboardSnapshot.openBacklogByPriority).reduce((sum, count) => sum + count, 0)],
    ["SLA compliance (7d)", `${dashboardSnapshot.slaCompliance7d}%`],
    ["SLA compliance (30d)", `${dashboardSnapshot.slaCompliance30d}%`],
    ["Average assignment time", `${dashboardSnapshot.avgAssignMinutes} min`],
    ["Average completion time", `${dashboardSnapshot.avgCompleteHours} hrs`],
    ["Breached requests", dashboardSnapshot.breached]
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Manager Operations Dashboard</h1>
      <p className="text-sm text-slate-600">
        Run cross-property operations, assign maintenance work, and coordinate tenant-owner communication from one hub.
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {metrics.map(([label, value]) => (
          <Card key={label as string}>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Open maintenance by priority</h2>
        <div className="grid gap-2 md:grid-cols-3">
          {Object.entries(dashboardSnapshot.openBacklogByPriority).map(([priority, count]) => (
            <div key={priority} className="rounded-md border p-3">
              <p className="text-sm text-slate-500">{priority}</p>
              <p className="text-xl font-semibold">{count}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Service provider performance</h2>
        <div className="space-y-2 text-sm">
          {dashboardSnapshot.vendorRanking.map((vendor, idx) => (
            <div key={vendor.vendor} className="flex items-center justify-between rounded-md border p-2">
              <span>{idx + 1}. {vendor.vendor}</span>
              <span>{vendor.score}% SLA | {vendor.completed} completed</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
