export type Lang = "en" | "ar";

export const messages = {
  en: {
    brand: "SLAWorks",
    dashboard: "Dashboard",
    sites: "Sites",
    workOrders: "Work Orders",
    vendors: "Vendors",
    estimates: "Estimates",
    reports: "Reports",
    notifications: "Notifications",
    settings: "Settings",
    login: "Login",
    landingHeadline:
      "Track maintenance SLAs across all your buildings—dispatch vendors, capture proof-of-work, and send owner-ready reports.",
    landingSubheadline:
      "Built for property managers and owners associations in Oman and the UAE. Not a consumer marketplace—an operations control tower."
  },
  ar: {
    brand: "إس إل إيه ووركس",
    dashboard: "لوحة التحكم",
    sites: "المواقع",
    workOrders: "أوامر العمل",
    vendors: "الموردون",
    estimates: "التسعيرات",
    reports: "التقارير",
    notifications: "الإشعارات",
    settings: "الإعدادات",
    login: "تسجيل الدخول",
    landingHeadline:
      "تابع اتفاقيات مستوى الخدمة عبر جميع مبانيك—وجّه الموردين، واحتفظ بإثباتات العمل، وأرسل تقارير جاهزة للمالك.",
    landingSubheadline:
      "مصمم لمديري العقارات وجمعيات الملاك في عُمان والإمارات. ليس سوقاً استهلاكياً، بل مركز عمليات متكامل."
  }
} as const;

export function getMessages(lang: Lang) {
  return messages[lang] ?? messages.en;
}
