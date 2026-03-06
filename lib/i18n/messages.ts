export type Lang = "en" | "ar";

export const messages = {
  en: {
    brand: "PropertyOps",
    dashboard: "Dashboard",
    sites: "Properties",
    workOrders: "Maintenance Requests",
    vendors: "Service Providers",
    estimates: "Expenses",
    reports: "Reports",
    notifications: "Notices",
    settings: "Settings",
    login: "Login",
    landingHeadline:
      "One connected property management ecosystem for tenants, owners, and managers.",
    landingSubheadline:
      "Tenants track requests and lease records, owners monitor revenue and portfolio performance, and managers run operations from one shared data model."
  },
  ar: {
    brand: "PropertyOps",
    dashboard: "Dashboard",
    sites: "Properties",
    workOrders: "Maintenance Requests",
    vendors: "Service Providers",
    estimates: "Expenses",
    reports: "Reports",
    notifications: "Notices",
    settings: "Settings",
    login: "Login",
    landingHeadline:
      "One connected property management ecosystem for tenants, owners, and managers.",
    landingSubheadline:
      "Tenants track requests and lease records, owners monitor revenue and portfolio performance, and managers run operations from one shared data model."
  }
} as const;

export function getMessages(lang: Lang) {
  return messages[lang] ?? messages.en;
}
