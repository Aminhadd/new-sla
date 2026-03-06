import Link from "next/link";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function LandingPage() {
  const lang = ((await cookies()).get("lang")?.value ?? "en") as "en" | "ar";
  const t = getMessages(lang);
  return (
    <section className="space-y-8">
      <Card className="overflow-hidden border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-amber-50">
        <div className="space-y-5 p-2">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">Property Ops Intelligence</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">{t.landingHeadline}</h1>
          <p className="max-w-3xl text-base text-slate-600 md:text-lg">{t.landingSubheadline}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/login"><Button>Start Pilot</Button></Link>
            <Link href="/contact"><Button variant="outline">Request Demo</Button></Link>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="mb-2 text-sm font-semibold text-cyan-700">Tenant Portal</p>
          <p className="text-sm text-slate-600">Submit maintenance requests, track status, view lease and notices, and access account records.</p>
        </Card>
        <Card>
          <p className="mb-2 text-sm font-semibold text-cyan-700">Owner Portal</p>
          <p className="text-sm text-slate-600">Monitor revenue, expenses, occupancy, and portfolio performance with cross-property visibility.</p>
        </Card>
        <Card>
          <p className="mb-2 text-sm font-semibold text-cyan-700">Manager Portal</p>
          <p className="text-sm text-slate-600">Manage units, leases, maintenance workflows, and communication across all properties.</p>
        </Card>
      </div>
    </section>
  );
}
