export type Priority = "Emergency" | "Urgent" | "Routine";
export type WorkOrderStatus = "Open" | "Assigned" | "En-route" | "In Progress" | "Completed" | "Closed";

export type SlaPolicy = {
  priority: Priority;
  response_minutes: number;
  resolve_minutes: number;
  escalation_minutes: number;
};
