import { cookies } from "next/headers";
import { Header } from "@/components/layout/header";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const lang = ((await cookies()).get("lang")?.value ?? "en") as "en" | "ar";
  return (
    <div>
      <Header lang={lang} />
      {children}
    </div>
  );
}
