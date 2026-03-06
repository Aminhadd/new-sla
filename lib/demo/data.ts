export const dashboardSnapshot = {
  openBacklogByPriority: { Emergency: 7, Urgent: 14, Routine: 33 },
  slaCompliance7d: 91,
  slaCompliance30d: 93,
  avgAssignMinutes: 38,
  avgCompleteHours: 16,
  breached: 5,
  completed30d: 188,
  vendorRanking: [
    { vendor: "Gulf HVAC Services", score: 96, completed: 42 },
    { vendor: "Muscat Plumbing Team", score: 93, completed: 37 },
    { vendor: "Dubai Rapid Electrical", score: 90, completed: 29 }
  ]
};

export const tenantSnapshot = {
  unit: {
    propertyName: "Sunset Residency - Tower B",
    unitCode: "B-1204",
    leaseEnd: "2027-01-31",
    primaryContact: "Leasing Office - +968 9000 2211"
  },
  openRequests: 2,
  urgentRequests: 1,
  recentNotices: 3,
  accountSummary: {
    rentRecordYtd: 8400,
    serviceChargesYtd: 420,
    maintenanceFeesYtd: 65,
    balance: 0
  },
  maintenanceRequests: [
    { id: "MR-4102", category: "Plumbing", priority: "Urgent", status: "In Progress", updatedAt: "2026-03-06 11:20" },
    { id: "MR-4091", category: "HVAC", priority: "Routine", status: "Assigned", updatedAt: "2026-03-05 18:10" }
  ],
  documents: ["Lease Agreement", "Move-in Inspection Report", "Community Rules Handbook"],
  notices: ["Water shutdown scheduled on March 9", "Parking access pass renewal reminder"]
};

export const ownerSnapshot = {
  totalRevenue: 384000,
  totalExpenses: 108300,
  netReturn: 275700,
  occupancyRate: 94,
  activeMaintenance: 19,
  vacantUnits: 7,
  portfolio: [
    { property: "Sunset Residency", revenue: 164000, expenses: 43200, occupancy: 96 },
    { property: "Harbor Executive Suites", revenue: 128500, expenses: 35200, occupancy: 91 },
    { property: "Palm Courtyard Villas", revenue: 91500, expenses: 29900, occupancy: 95 }
  ],
  expenseBreakdown: [
    { item: "Repairs and Maintenance", amount: 45200 },
    { item: "Management Fees", amount: 28800 },
    { item: "Operational Costs", amount: 21200 },
    { item: "Insurance and Compliance", amount: 13100 }
  ]
};

export const demoSites = [
  { id: "site-mct-1", name_en: "Al Khuwair Tower A", name_ar: "Al Khuwair Tower A", city: "Muscat", country: "Oman", site_type: "Tower" },
  { id: "site-dxb-1", name_en: "JLT Cluster Office 2", name_ar: "JLT Cluster Office 2", city: "Dubai", country: "UAE", site_type: "Office" }
];

export const demoWorkOrders = [
  {
    id: "WO-1001",
    site: "Al Khuwair Tower A",
    trade: "HVAC",
    priority: "Emergency",
    status: "Assigned",
    responseBy: "2026-03-06 12:30",
    resolveBy: "2026-03-06 23:59"
  },
  {
    id: "WO-1002",
    site: "JLT Cluster Office 2",
    trade: "Electrical",
    priority: "Urgent",
    status: "In Progress",
    responseBy: "2026-03-06 14:00",
    resolveBy: "2026-03-08 14:00"
  },
  {
    id: "WO-1003",
    site: "Al Khuwair Tower A",
    trade: "Plumbing",
    priority: "Routine",
    status: "Open",
    responseBy: "2026-03-07 09:00",
    resolveBy: "2026-03-14 09:00"
  }
];
