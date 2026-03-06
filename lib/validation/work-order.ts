import { z } from "zod";

export const createWorkOrderSchema = z.object({
  site_id: z.string().uuid(),
  area_id: z.string().uuid().optional().or(z.literal("")),
  trade: z.enum(["HVAC", "Plumbing", "Electrical", "Civil", "Cleaning", "Pest Control", "Elevator", "Fire Safety", "Other"]),
  priority: z.enum(["Emergency", "Urgent", "Routine"]),
  description: z.string().min(10),
  cost_cap: z.coerce.number().optional()
});

export type CreateWorkOrderInput = z.infer<typeof createWorkOrderSchema>;
