import { NextResponse } from "next/server";
import { runSlaEscalationCheck } from "@/lib/actions/sla-escalation";

export async function GET() {
  const result = await runSlaEscalationCheck();
  return NextResponse.json(result);
}
