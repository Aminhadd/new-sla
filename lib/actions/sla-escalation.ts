import { createAdminClient } from "@/lib/supabase/admin";

export async function runSlaEscalationCheck() {
  const admin = createAdminClient();
  const nowIso = new Date().toISOString();
  const { data: breached } = await admin
    .from("work_orders")
    .select("id,client_id,response_by,resolve_by,status")
    .in("status", ["Open", "Assigned", "En-route", "In Progress"])
    .lt("response_by", nowIso)
    .limit(100);

  if (!breached?.length) return { checked: 0, notified: 0 };

  return { checked: breached.length, notified: breached.length };
}
