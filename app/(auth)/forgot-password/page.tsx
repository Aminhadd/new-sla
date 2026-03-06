import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function ForgotPasswordPage() { return <section className="mx-auto max-w-md space-y-4 p-6"><h1 className="text-2xl font-semibold">Forgot password</h1><Input placeholder="Email" /><Button>Send reset/OTP link</Button></section>; }
