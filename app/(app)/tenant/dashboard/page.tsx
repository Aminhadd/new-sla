import { Card } from "@/components/ui/card";
import { tenantSnapshot } from "@/lib/demo/data";

export default function TenantDashboardPage() {
  const account = tenantSnapshot.accountSummary;
  const accountRows = [
    ["Rent record (YTD)", account.rentRecordYtd],
    ["Service charges (YTD)", account.serviceChargesYtd],
    ["Maintenance fees (YTD)", account.maintenanceFeesYtd],
    ["Current balance", account.balance]
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Tenant Dashboard</h1>
      <p className="text-sm text-slate-600">
        View your unit and lease details, submit and track maintenance requests, and review notices and account records.
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Property</p>
          <p className="text-xl font-semibold">{tenantSnapshot.unit.propertyName}</p>
          <p className="text-sm text-slate-600">Unit {tenantSnapshot.unit.unitCode}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Open requests</p>
          <p className="text-2xl font-semibold">{tenantSnapshot.openRequests}</p>
          <p className="text-sm text-slate-600">{tenantSnapshot.urgentRequests} urgent</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Lease end date</p>
          <p className="text-2xl font-semibold">{tenantSnapshot.unit.leaseEnd}</p>
          <p className="text-sm text-slate-600">{tenantSnapshot.recentNotices} recent notices</p>
        </Card>
      </div>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Maintenance tracker</h2>
        <div className="space-y-2 text-sm">
          {tenantSnapshot.maintenanceRequests.map((request) => (
            <div key={request.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-2">
              <span className="font-medium">{request.id} - {request.category}</span>
              <span>{request.priority}</span>
              <span>{request.status}</span>
              <span className="text-slate-500">Updated {request.updatedAt}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Documents and lease records</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {tenantSnapshot.documents.map((document) => (
              <li key={document} className="rounded-md border p-2">{document}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Notices and announcements</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {tenantSnapshot.notices.map((notice) => (
              <li key={notice} className="rounded-md border p-2">{notice}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Account information (view only)</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {accountRows.map(([label, value]) => (
            <div key={label as string} className="rounded-md border p-3">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Payment processing is not enabled in this MVP. Records are available for tracking and transparency only.
        </p>
      </Card>
    </section>
  );
}
