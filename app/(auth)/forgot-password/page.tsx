import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-5xl items-center justify-center py-8">
      <Card className="w-full max-w-md border-cyan-100 bg-white/90 p-7">
        <div className="mb-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">Account Recovery</p>
          <h1 className="text-3xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-sm text-slate-600">Enter your work email to receive a secure reset link.</p>
        </div>
        <div className="space-y-4">
          <Input placeholder="name@company.com" type="email" />
          <Button className="w-full">Send reset/OTP link</Button>
        </div>
      </Card>
    </section>
  );
}
