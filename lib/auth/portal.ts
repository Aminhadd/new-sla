import type { Route } from "next";

export type PortalRole = "tenant" | "owner" | "manager";

export type PortalPermission =
  | "maintenance:create"
  | "maintenance:view"
  | "maintenance:assign"
  | "maintenance:close"
  | "unit:view"
  | "lease:view"
  | "documents:view"
  | "notices:view"
  | "messages:send"
  | "messages:manage"
  | "portfolio:view"
  | "financials:view"
  | "expenses:manage"
  | "properties:manage"
  | "tenants:manage"
  | "owners:manage"
  | "leases:manage"
  | "reports:view";

export const portalPermissions: Record<PortalRole, PortalPermission[]> = {
  tenant: [
    "maintenance:create",
    "maintenance:view",
    "unit:view",
    "lease:view",
    "documents:view",
    "notices:view",
    "messages:send"
  ],
  owner: [
    "maintenance:view",
    "portfolio:view",
    "financials:view",
    "documents:view",
    "notices:view",
    "reports:view"
  ],
  manager: [
    "maintenance:view",
    "maintenance:assign",
    "maintenance:close",
    "messages:manage",
    "expenses:manage",
    "properties:manage",
    "tenants:manage",
    "owners:manage",
    "leases:manage",
    "reports:view"
  ]
};

export const portalLabels: Record<PortalRole, string> = {
  tenant: "Tenant Portal",
  owner: "Owner Portal",
  manager: "Manager Portal"
};

export type PortalNavItem = {
  href: Route;
  label: string;
};

export const portalNavigation: Record<PortalRole, PortalNavItem[]> = {
  tenant: [
    { href: "/tenant/dashboard", label: "Dashboard" },
    { href: "/work-orders/new", label: "New Maintenance Request" },
    { href: "/work-orders", label: "Request Tracker" },
    { href: "/notifications", label: "Notices & Messages" }
  ],
  owner: [
    { href: "/owner/dashboard", label: "Dashboard" },
    { href: "/sites", label: "Property Portfolio" },
    { href: "/reports", label: "Revenue & Expense Reports" },
    { href: "/work-orders", label: "Maintenance Activity" }
  ],
  manager: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/sites", label: "Properties & Units" },
    { href: "/work-orders", label: "Maintenance Workflow" },
    { href: "/vendors", label: "Service Providers" },
    { href: "/estimates", label: "Expense Control" },
    { href: "/reports", label: "Operational Reports" },
    { href: "/notifications", label: "Notifications" },
    { href: "/settings/sla-policies", label: "Portal Settings" }
  ]
};

export function normalizePortalRole(role?: string | null): PortalRole {
  if (role === "tenant" || role === "owner" || role === "manager") return role;
  return "manager";
}
