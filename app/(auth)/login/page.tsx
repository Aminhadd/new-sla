import Link from "next/link";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;

  async function login(formData: FormData) {
    "use server";

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      redirect("/login?error=missing_fields");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      redirect("/login?error=invalid_credentials");
    }

    redirect("/dashboard");
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-5xl items-center justify-center py-8">
      <Card className="w-full max-w-md border-cyan-100 bg-white/90 p-7">
        <div className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">SLAWorks Portal</p>
          <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
          <p className="text-sm text-slate-600">Use your email and password to access the operations dashboard.</p>
        </div>
        <form action={login} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <Input id="email" name="email" placeholder="name@company.com" type="email" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" required />
          </div>
          {params.error ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {params.error === "missing_fields" ? "Please enter both email and password." : "Invalid email or password."}
            </p>
          ) : null}
          <Button className="w-full">Sign In</Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          <Link className="font-medium text-cyan-700 hover:text-cyan-800" href="/forgot-password">Forgot password?</Link>
        </p>
      </Card>
    </section>
  );
}
