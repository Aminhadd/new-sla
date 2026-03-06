import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PortalRole, normalizePortalRole } from "@/lib/auth/portal";
import { createClient } from "@/lib/supabase/server";

type Props = {
  searchParams: Promise<{ error?: string; portal?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedPortal = normalizePortalRole(params.portal);

  async function login(formData: FormData) {
    "use server";

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const portalHint = normalizePortalRole(String(formData.get("portalHint") ?? "manager"));
    const portalRole = normalizePortalRole(String(formData.get("portalRole") ?? portalHint));

    if (!email || !password) {
      redirect(`/login?portal=${portalHint}&error=missing_fields`);
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      redirect(`/login?portal=${portalHint}&error=invalid_credentials`);
    }

    const cookieStore = await cookies();
    cookieStore.set("portal_role", portalRole, { httpOnly: false, path: "/", maxAge: 60 * 60 * 24 * 30 });

    const redirects: Record<PortalRole, string> = {
      tenant: "/tenant/dashboard",
      owner: "/owner/dashboard",
      manager: "/dashboard"
    };

    redirect(redirects[portalRole]);
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-5xl items-center justify-center py-8">
      <Card className="w-full max-w-md border-cyan-100 bg-white/90 p-7">
        <div className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">PropertyOps Platform</p>
          <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
          <p className="text-sm text-slate-600">Use your email and password, then enter the tenant, owner, or manager portal.</p>
        </div>
        <form action={login} className="space-y-4">
          <input type="hidden" name="portalHint" value={selectedPortal} />
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <Input id="email" name="email" placeholder="name@company.com" type="email" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="portalRole">Portal</label>
            <select
              id="portalRole"
              name="portalRole"
              defaultValue={selectedPortal}
              className="h-11 w-full rounded-xl border border-border/90 bg-white/90 px-4 text-sm shadow-inner shadow-slate-100/70 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="tenant">Tenant Portal</option>
              <option value="owner">Owner Portal</option>
              <option value="manager">Manager Portal</option>
            </select>
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
