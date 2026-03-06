import { cookies } from "next/headers";
import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = ((await cookies()).get("lang")?.value ?? "en") as "en" | "ar";
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className={lang === "ar" ? "rtl" : ""}>{children}</body>
    </html>
  );
}
