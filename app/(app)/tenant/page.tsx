import { redirect } from "next/navigation";

export default function TenantPortalEntryPage() {
  redirect("/tenant/dashboard");
}
