import { cookies } from "next/headers";
import { AppShell } from "@/components/layout/app-shell";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const lang = ((await cookies()).get("lang")?.value ?? "en") as "en" | "ar";
  return <AppShell lang={lang}>{children}</AppShell>;
}
