import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function ContactPage() { return <section className="mx-auto max-w-xl space-y-4 p-6"><h1 className="text-2xl font-semibold">Request Demo</h1><Input placeholder="Company name" /><Input placeholder="Work email" /><Input placeholder="Phone" /><Button>Submit</Button></section>; }
