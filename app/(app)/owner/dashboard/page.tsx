import { Card } from "@/components/ui/card";
import { ownerSnapshot } from "@/lib/demo/data";

export default function OwnerDashboardPage() {
  const metrics = [
    ["Total revenue", ownerSnapshot.totalRevenue],
    ["Total expenses", ownerSnapshot.totalExpenses],
    ["Net return", ownerSnapshot.netReturn],
    ["Occupancy rate", `${ownerSnapshot.occupancyRate}%`],
    ["Active maintenance", ownerSnapshot.activeMaintenance],
    ["Vacant units", ownerSnapshot.vacantUnits]
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Owner Dashboard</h1>
      <p className="text-sm text-slate-600">
        Track revenue, expenses, occupancy, and maintenance performance across your portfolio.
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
        <h2 className="mb-3 text-lg font-semibold">Portfolio performance</h2>
        <div className="space-y-2 text-sm">
          {ownerSnapshot.portfolio.map((asset) => (
            <div key={asset.property} className="grid grid-cols-2 gap-2 rounded-md border p-3 md:grid-cols-4">
              <span className="font-semibold">{asset.property}</span>
              <span>Revenue: {asset.revenue}</span>
              <span>Expenses: {asset.expenses}</span>
              <span>Occupancy: {asset.occupancy}%</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Expense breakdown</h2>
          <div className="space-y-2 text-sm">
            {ownerSnapshot.expenseBreakdown.map((entry) => (
              <div key={entry.item} className="flex items-center justify-between rounded-md border p-2">
                <span>{entry.item}</span>
                <span>{entry.amount}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 text-lg font-semibold">MVP scope reminders</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rounded-md border p-2">Revenue and charge records are available as view-only data.</li>
            <li className="rounded-md border p-2">No online payment gateway is enabled in this phase.</li>
            <li className="rounded-md border p-2">Historical trends and exports support owner performance review.</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
