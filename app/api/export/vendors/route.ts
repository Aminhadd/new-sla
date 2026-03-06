import { NextResponse } from "next/server";
import { toCsv } from "@/lib/csv/export";

export async function GET() {
  const csv = toCsv([
    { vendor: "Gulf HVAC Services", rank: 1, sla_success: "96%" },
    { vendor: "Muscat Plumbing Team", rank: 2, sla_success: "93%" }
  ]);
  return new NextResponse(csv, { headers: { "content-type": "text/csv" } });
}
