import Link from "next/link";

export default function ReportsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <p className="text-slate-600">
        Owner and manager reports for maintenance activity, expense tracking, and portfolio performance.
      </p>
      <p className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-4 py-3 text-sm text-slate-700">
        Financial entries are reporting records only. Online payment collection is excluded from this MVP.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="rounded-md border px-3 py-2 text-sm" href="/api/export/work-orders">Export Maintenance CSV</Link>
        <Link className="rounded-md border px-3 py-2 text-sm" href="/api/export/vendors">Export Service Provider CSV</Link>
      </div>
    </section>
  );
}
