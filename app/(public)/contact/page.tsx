import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Request Platform Demo</h1>
      <p className="text-slate-600">
        Tell us about your properties and we will configure a tenant-owner-manager workspace for your team.
      </p>
      <Card className="space-y-3">
        <Input placeholder="Company name" />
        <Input placeholder="Work email" />
        <Input placeholder="Phone" />
        <Input placeholder="Number of properties / units" />
        <Button>Submit</Button>
      </Card>
    </section>
  );
}
