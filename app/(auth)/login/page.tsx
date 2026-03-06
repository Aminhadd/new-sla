import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function LoginPage() { return <section className="mx-auto max-w-md space-y-4 p-6"><h1 className="text-2xl font-semibold">Login</h1><Input placeholder="Email" /><Button>Send magic link</Button><p className="text-sm"><Link href="/forgot-password">Forgot password?</Link></p></section>; }
