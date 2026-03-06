import { Card } from "@/components/ui/card";

export function MetricCard({ label, value }: { label: string; value: string | number }) {
  return <Card><p className="text-sm text-slate-500">{label}</p><p className="text-2xl font-semibold">{value}</p></Card>;
}
