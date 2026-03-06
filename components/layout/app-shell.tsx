import Link from "next/link";
import { getMessages, Lang } from "@/lib/i18n/messages";

export function AppShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const t = getMessages(lang);
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[230px_1fr]">
        <aside className="rounded-xl border border-border bg-white p-4">
          <p className="mb-3 text-sm font-semibold">{t.brand}</p>
          <div className="space-y-2 text-sm">
            <Link className="block" href="/dashboard">{t.dashboard}</Link>
            <Link className="block" href="/sites">{t.sites}</Link>
            <Link className="block" href="/work-orders">{t.workOrders}</Link>
            <Link className="block" href="/vendors">{t.vendors}</Link>
            <Link className="block" href="/estimates">{t.estimates}</Link>
            <Link className="block" href="/reports">{t.reports}</Link>
            <Link className="block" href="/notifications">{t.notifications}</Link>
            <Link className="block" href="/settings/sla-policies">{t.settings}</Link>
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
