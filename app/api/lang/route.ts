import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { lang } = (await request.json()) as { lang: "en" | "ar" };
  if (lang !== "en" && lang !== "ar") return NextResponse.json({ ok: false }, { status: 400 });
  (await cookies()).set("lang", lang, { path: "/", sameSite: "lax" });
  return NextResponse.json({ ok: true });
}
