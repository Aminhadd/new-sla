import Link from "next/link";
import type { Route } from "next";
import { getMessages, Lang } from "@/lib/i18n/messages";
import { PortalRole, portalLabels, portalNavigation } from "@/lib/auth/portal";

export function AppShell({ lang, portalRole, children }: { lang: Lang; portalRole: PortalRole; children: React.ReactNode }) {
  const t = getMessages(lang);
  const roleNav = portalNavigation[portalRole];
  const roleLabel = portalLabels[portalRole];
  const portalSwitches: { role: PortalRole; href: Route }[] = [
    { role: "tenant", href: "/tenant/dashboard" },
    { role: "owner", href: "/owner/dashboard" },
    { role: "manager", href: "/manager" }
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-5 md:grid-cols-[250px_1fr]">
        <aside className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-xl shadow-cyan-100/70 backdrop-blur-sm">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-cyan-800">{t.brand}</p>
          <p className="mb-4 mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">{roleLabel}</p>

          <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-cyan-50 p-1 text-xs font-semibold">
            {portalSwitches.map(({ role, href }) => (
              <Link
                key={role}
                className={`rounded-lg px-2 py-2 text-center ${role === portalRole ? "bg-white text-cyan-700 shadow-sm" : "text-slate-600 hover:text-cyan-700"}`}
                href={href}
              >
                {portalLabels[role].replace(" Portal", "")}
              </Link>
            ))}
          </div>

          <div className="space-y-1 text-sm font-medium">
            {roleNav.map((item) => (
              <Link key={item.href} className="block rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-700" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-cyan-100 bg-cyan-50/70 p-3 text-xs text-slate-600">
            <p className="font-semibold text-cyan-800">Scope note</p>
            <p>Payments are tracked as records only in this MVP. Online payment processing is intentionally deferred.</p>
          </div>
        </aside>
        <main className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-xl shadow-cyan-100/40 backdrop-blur-sm md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
