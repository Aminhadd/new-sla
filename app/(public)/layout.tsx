import { cookies } from "next/headers";
import { Header } from "@/components/layout/header";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const lang = ((await cookies()).get("lang")?.value ?? "en") as "en" | "ar";
  return (
    <div className="min-h-screen">
      <Header lang={lang} />
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">{children}</main>
    </div>
  );
}
