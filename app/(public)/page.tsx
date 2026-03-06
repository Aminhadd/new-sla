import Link from "next/link";
import { cookies } from "next/headers";
import { getMessages } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";

export default async function LandingPage() {
  const lang = ((await cookies()).get("lang")?.value ?? "en") as "en" | "ar";
  const t = getMessages(lang);
  return (
    <section className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-3xl font-semibold">{t.landingHeadline}</h1>
      <p className="max-w-3xl text-slate-600">{t.landingSubheadline}</p>
      <div className="flex gap-3">
        <Link href="/login"><Button>Start Pilot</Button></Link>
        <Link href="/contact"><Button variant="outline">Request Demo</Button></Link>
      </div>
    </section>
  );
}
