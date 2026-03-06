export const dashboardSnapshot = {
  openBacklogByPriority: { Emergency: 7, Urgent: 14, Routine: 33 },
  slaCompliance7d: 91,
  slaCompliance30d: 93,
  avgAssignMinutes: 38,
  avgCompleteHours: 16,
  breached: 5,
  completed30d: 188,
  vendorRanking: [
    { vendor: 'Gulf HVAC Services', score: 96, completed: 42 },
    { vendor: 'Muscat Plumbing Team', score: 93, completed: 37 },
    { vendor: 'Dubai Rapid Electrical', score: 90, completed: 29 }
  ]
};

export const demoSites = [
  { id: 'site-mct-1', name_en: 'Al Khuwair Tower A', name_ar: 'برج الخوير أ', city: 'Muscat', country: 'Oman', site_type: 'Tower' },
  { id: 'site-dxb-1', name_en: 'JLT Cluster Office 2', name_ar: 'مكتب جي إل تي ٢', city: 'Dubai', country: 'UAE', site_type: 'Office' }
];

export const demoWorkOrders = [
  { id: 'WO-1001', site: 'Al Khuwair Tower A', trade: 'HVAC', priority: 'Emergency', status: 'Assigned', responseBy: '2026-03-06 12:30', resolveBy: '2026-03-06 23:59' },
  { id: 'WO-1002', site: 'JLT Cluster Office 2', trade: 'Electrical', priority: 'Urgent', status: 'In Progress', responseBy: '2026-03-06 14:00', resolveBy: '2026-03-08 14:00' },
  { id: 'WO-1003', site: 'Al Khuwair Tower A', trade: 'Plumbing', priority: 'Routine', status: 'Open', responseBy: '2026-03-07 09:00', resolveBy: '2026-03-14 09:00' }
];
