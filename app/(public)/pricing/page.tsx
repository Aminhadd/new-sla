"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

const tiers = [
  {
    name: "Starter",
    omr: "90-140",
    aed: "860-1335",
    highlights: ["Tenant portal", "Basic owner reporting", "Manager workflow board"]
  },
  {
    name: "Growth",
    omr: "180-290",
    aed: "1715-2760",
    highlights: ["Multi-property portfolios", "Advanced maintenance analytics", "Role-based operational controls"]
  },
  {
    name: "Enterprise",
    omr: "390-620",
    aed: "3710-5900",
    highlights: ["Portfolio-wide KPIs", "Custom reports", "Dedicated onboarding and governance"]
  }
];

export default function PricingPage() {
  const [currency, setCurrency] = useState<"OMR" | "AED">("OMR");
  const data = useMemo(
    () => tiers.map((tier) => ({ ...tier, range: currency === "OMR" ? tier.omr : tier.aed })),
    [currency]
  );

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Pricing</h1>
      <p className="text-slate-600">
        Portal bundles are priced per property and include tenant, owner, and manager experiences on shared data.
      </p>
      <p className="rounded-xl border border-cyan-100 bg-cyan-50/70 px-4 py-3 text-sm text-slate-700">
        Payment handling is not part of this MVP. Rent, fees, expenses, and balances are tracked as informational records only.
      </p>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="currency">Currency</label>
        <select
          id="currency"
          className="h-10 rounded-lg border border-border bg-white px-3"
          onChange={(event) => setCurrency(event.target.value as "OMR" | "AED")}
          value={currency}
        >
          <option value="OMR">OMR</option>
          <option value="AED">AED</option>
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {data.map((tier) => (
          <Card key={tier.name}>
            <h2 className="text-lg font-semibold">{tier.name}</h2>
            <p className="mb-3 mt-1 text-sm text-slate-600">{currency} {tier.range} / property / month</p>
            <ul className="space-y-2 text-sm text-slate-700">
              {tier.highlights.map((highlight) => (
                <li key={highlight} className="rounded-md border p-2">{highlight}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
