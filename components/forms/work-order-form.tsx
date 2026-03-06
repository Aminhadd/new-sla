"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkOrderSchema, type CreateWorkOrderInput } from "@/lib/validation/work-order";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function WorkOrderForm() {
  const form = useForm<CreateWorkOrderInput>({ resolver: zodResolver(createWorkOrderSchema) });
  return (
    <form className="space-y-3" onSubmit={form.handleSubmit(console.log)}>
      <Input placeholder="Site UUID" {...form.register("site_id")} />
      <select className="h-10 w-full rounded-md border border-border px-3" {...form.register("trade")}>
        <option>HVAC</option><option>Plumbing</option><option>Electrical</option><option>Civil</option><option>Cleaning</option><option>Pest Control</option><option>Elevator</option><option>Fire Safety</option><option>Other</option>
      </select>
      <select className="h-10 w-full rounded-md border border-border px-3" {...form.register("priority")}>
        <option>Emergency</option><option>Urgent</option><option>Routine</option>
      </select>
      <Input placeholder="Description" {...form.register("description")} />
      <Button type="submit">Create Work Order</Button>
    </form>
  );
}
