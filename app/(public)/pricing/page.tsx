"use client";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
const tiers = [
  { name: "Lite", omr: "75–120", aed: "715–1144" },
  { name: "Pro", omr: "150–250", aed: "1430–2383" },
  { name: "Enterprise", omr: "350–600", aed: "3336–5719" }
];
export default function PricingPage() {
  const [currency, setCurrency] = useState<"OMR" | "AED">("OMR");
  const data = useMemo(() => tiers.map((tier) => ({ ...tier, range: currency === "OMR" ? tier.omr : tier.aed })), [currency]);
  return <section className="mx-auto max-w-5xl space-y-4 p-6"><h1 className="text-2xl font-semibold">Pricing</h1><p>Pilot: 1 site free for 30 days</p><select className="h-10 rounded-md border border-border px-2" onChange={(e) => setCurrency(e.target.value as "OMR" | "AED")}><option value="OMR">OMR</option><option value="AED">AED</option></select><div className="grid gap-4 md:grid-cols-3">{data.map((tier) => <Card key={tier.name}><h2 className="font-semibold">{tier.name}</h2><p>{currency} {tier.range} / site / month</p></Card>)}</div></section>;
}
