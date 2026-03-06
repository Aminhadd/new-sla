import { cookies } from "next/headers";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = ((await cookies()).get("lang")?.value ?? "en") as "en" | "ar";
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className={`${bodyFont.variable} ${headingFont.variable} ${lang === "ar" ? "rtl" : ""}`}>{children}</body>
    </html>
  );
}
