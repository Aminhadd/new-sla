import { NextResponse } from "next/server";
import { toCsv } from "@/lib/csv/export";

export async function GET() {
  const csv = toCsv([
    { id: "WO-1001", priority: "Emergency", status: "Open", city: "Muscat" },
    { id: "WO-1002", priority: "Routine", status: "Completed", city: "Dubai" }
  ]);
  return new NextResponse(csv, { headers: { "content-type": "text/csv" } });
}
