import Link from "next/link";
import { getMessages, Lang } from "@/lib/i18n/messages";

export function AppShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const t = getMessages(lang);
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-5 md:grid-cols-[250px_1fr]">
        <aside className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-xl shadow-cyan-100/70 backdrop-blur-sm">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-cyan-800">{t.brand}</p>
          <div className="space-y-1 text-sm font-medium">
            <Link className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/dashboard">{t.dashboard}</Link>
            <Link className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/sites">{t.sites}</Link>
            <Link className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/work-orders">{t.workOrders}</Link>
            <Link className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/vendors">{t.vendors}</Link>
            <Link className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/estimates">{t.estimates}</Link>
            <Link className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/reports">{t.reports}</Link>
            <Link className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/notifications">{t.notifications}</Link>
            <Link className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href="/settings/sla-policies">{t.settings}</Link>
          </div>
        </aside>
        <main className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-xl shadow-cyan-100/40 backdrop-blur-sm md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
