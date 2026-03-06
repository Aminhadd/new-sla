export type Priority = "Emergency" | "Urgent" | "Routine";
export type WorkOrderStatus = "Open" | "Assigned" | "En-route" | "In Progress" | "Completed" | "Closed";
export type PortalRole = "tenant" | "owner" | "manager";

export type SlaPolicy = {
  priority: Priority;
  response_minutes: number;
  resolve_minutes: number;
  escalation_minutes: number;
};

export type TenantDashboardSnapshot = {
  unit: {
    propertyName: string;
    unitCode: string;
    leaseEnd: string;
    primaryContact: string;
  };
  openRequests: number;
  urgentRequests: number;
  recentNotices: number;
  accountSummary: {
    rentRecordYtd: number;
    serviceChargesYtd: number;
    maintenanceFeesYtd: number;
    balance: number;
  };
};

export type OwnerDashboardSnapshot = {
  totalRevenue: number;
  totalExpenses: number;
  netReturn: number;
  occupancyRate: number;
  activeMaintenance: number;
  vacantUnits: number;
};
