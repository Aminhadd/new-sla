import { cookies } from "next/headers";
import { AppShell } from "@/components/layout/app-shell";
import { normalizePortalRole } from "@/lib/auth/portal";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value ?? "en") as "en" | "ar";
  const portalRole = normalizePortalRole(cookieStore.get("portal_role")?.value);

  return <AppShell lang={lang} portalRole={portalRole}>{children}</AppShell>;
}
