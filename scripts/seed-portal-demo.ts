import { createAdminClient } from "@/lib/supabase/admin";

type PortalSeedUser = {
  email: string;
  password: string;
  fullName: string;
  role: "Property Manager" | "Owner" | "Tenant";
  portalPath: "/login/manager" | "/login/owner" | "/login/tenant";
};

const seedUsers: PortalSeedUser[] = [
  {
    email: "manager.portal@propertyops.demo",
    password: "Manager@123",
    fullName: "Maya Manager",
    role: "Property Manager",
    portalPath: "/login/manager"
  },
  {
    email: "owner.portal@propertyops.demo",
    password: "Owner@123",
    fullName: "Omar Owner",
    role: "Owner",
    portalPath: "/login/owner"
  },
  {
    email: "tenant.portal@propertyops.demo",
    password: "Tenant@123",
    fullName: "Tariq Tenant",
    role: "Tenant",
    portalPath: "/login/tenant"
  }
];

function applyFilters(query: any, filters: Record<string, string>) {
  let q = query;
  for (const [key, value] of Object.entries(filters)) {
    q = q.eq(key, value);
  }
  return q;
}

async function getOne(admin: any, table: string, filters: Record<string, string>) {
  const { data, error } = await applyFilters(admin.from(table).select("*").limit(1), filters);
  if (error) throw error;
  return data?.[0] ?? null;
}

async function getAuthUserByEmail(admin: any, email: string) {
  const perPage = 200;
  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const users = data?.users ?? [];
    const user = users.find((u: any) => (u.email ?? "").toLowerCase() === email.toLowerCase());
    if (user) return user;
    if (users.length < perPage) break;
  }
  return null;
}

async function ensureAuthUser(admin: any, seedUser: PortalSeedUser) {
  const existing = await getAuthUserByEmail(admin, seedUser.email);
  if (existing) return existing;

  const { data, error } = await admin.auth.admin.createUser({
    email: seedUser.email,
    password: seedUser.password,
    email_confirm: true,
    user_metadata: { full_name: seedUser.fullName }
  });
  if (error) throw error;
  return data.user;
}

async function ensureClient(admin: any) {
  const existing = await getOne(admin, "clients", { name: "PropertyOps Demo Portfolio" });
  if (existing) return existing;

  const { data, error } = await admin
    .from("clients")
    .insert([
      {
        name: "PropertyOps Demo Portfolio",
        country: "Oman",
        default_currency: "OMR",
        vat_rate: 5
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function ensureSite(admin: any, clientId: string) {
  const existing = await getOne(admin, "sites", { client_id: clientId, name_en: "Sunset Residency" });
  if (existing) return existing;

  const { data, error } = await admin
    .from("sites")
    .insert([
      {
        client_id: clientId,
        name_en: "Sunset Residency",
        name_ar: "Sunset Residency",
        city: "Muscat",
        country: "Oman",
        site_type: "Residential Tower",
        notes: "Demo property for tenant-owner-manager portal workflows"
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function ensureArea(admin: any, siteId: string) {
  const existing = await getOne(admin, "areas", { site_id: siteId, name_en: "Tower B" });
  if (existing) return existing;

  const { data, error } = await admin
    .from("areas")
    .insert([{ site_id: siteId, name_en: "Tower B", name_ar: "Tower B" }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function ensureUnit(admin: any, siteId: string) {
  const existing = await getOne(admin, "units", { site_id: siteId, unit_code: "B-1204" });
  if (existing) return existing;

  const { data, error } = await admin
    .from("units")
    .insert([
      {
        site_id: siteId,
        unit_code: "B-1204",
        floor_label: "12",
        bedroom_count: 2,
        bathroom_count: 2,
        area_sqm: 118.5,
        status: "occupied"
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function ensureLease(admin: any, clientId: string, unitId: string, tenantId: string, managerId: string) {
  const { data: existingRows, error: existingError } = await admin
    .from("leases")
    .select("*")
    .eq("client_id", clientId)
    .eq("unit_id", unitId)
    .eq("tenant_user_id", tenantId)
    .eq("status", "active")
    .limit(1);
  if (existingError) throw existingError;
  if (existingRows?.[0]) return existingRows[0];

  const { data, error } = await admin
    .from("leases")
    .insert([
      {
        client_id: clientId,
        unit_id: unitId,
        tenant_user_id: tenantId,
        start_date: "2026-01-01",
        end_date: "2027-01-31",
        monthly_rent: 700,
        security_deposit: 700,
        currency: "OMR",
        status: "active",
        notes: "Demo active lease",
        created_by: managerId
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function ensureOwnership(admin: any, clientId: string, siteId: string, ownerId: string) {
  const existing = await getOne(admin, "ownerships", {
    client_id: clientId,
    site_id: siteId,
    owner_user_id: ownerId
  });
  if (existing) return existing;

  const { data, error } = await admin
    .from("ownerships")
    .insert([
      {
        client_id: clientId,
        site_id: siteId,
        owner_user_id: ownerId,
        ownership_percent: 100,
        start_date: "2026-01-01"
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function ensureMembership(admin: any, clientId: string, userId: string, role: PortalSeedUser["role"]) {
  const { error } = await admin.from("memberships").upsert([{ client_id: clientId, user_id: userId, role }], {
    onConflict: "client_id,user_id,role"
  });
  if (error) throw error;
}

async function ensureProfile(admin: any, user: any, fullName: string) {
  const { error } = await admin.from("profiles").upsert([
    {
      id: user.id,
      full_name: fullName,
      email: user.email,
      preferred_language: "en"
    }
  ]);
  if (error) throw error;
}

async function ensureLeaseEntry(admin: any, clientId: string, leaseId: string, managerId: string) {
  const existing = await getOne(admin, "lease_account_entries", {
    lease_id: leaseId,
    entry_type: "rent_record",
    recorded_on: "2026-03-01"
  });
  if (existing) return;

  const { error } = await admin.from("lease_account_entries").insert([
    {
      client_id: clientId,
      lease_id: leaseId,
      entry_type: "rent_record",
      amount: 700,
      currency: "OMR",
      recorded_on: "2026-03-01",
      notes: "March rent record (view-only)",
      created_by: managerId
    },
    {
      client_id: clientId,
      lease_id: leaseId,
      entry_type: "service_charge",
      amount: 35,
      currency: "OMR",
      recorded_on: "2026-03-01",
      notes: "Monthly building service charge",
      created_by: managerId
    },
    {
      client_id: clientId,
      lease_id: leaseId,
      entry_type: "maintenance_fee",
      amount: 15,
      currency: "OMR",
      recorded_on: "2026-03-02",
      notes: "Minor maintenance fee record",
      created_by: managerId
    }
  ]);
  if (error) throw error;
}

async function ensureOwnerFinancials(admin: any, clientId: string, siteId: string, managerId: string) {
  const existing = await getOne(admin, "owner_financial_entries", {
    client_id: clientId,
    site_id: siteId,
    kind: "revenue",
    category: "Rental Income"
  });
  if (existing) return;

  const { error } = await admin.from("owner_financial_entries").insert([
    {
      client_id: clientId,
      site_id: siteId,
      kind: "revenue",
      category: "Rental Income",
      amount: 12800,
      currency: "OMR",
      occurred_on: "2026-03-01",
      notes: "Monthly rental revenue",
      created_by: managerId
    },
    {
      client_id: clientId,
      site_id: siteId,
      kind: "expense",
      category: "Repairs and Maintenance",
      amount: 1900,
      currency: "OMR",
      occurred_on: "2026-03-03",
      notes: "March maintenance costs",
      created_by: managerId
    },
    {
      client_id: clientId,
      site_id: siteId,
      kind: "expense",
      category: "Management Fees",
      amount: 800,
      currency: "OMR",
      occurred_on: "2026-03-03",
      notes: "Manager operational fee",
      created_by: managerId
    }
  ]);
  if (error) throw error;
}

async function ensureNotices(admin: any, clientId: string, siteId: string, unitId: string, managerId: string) {
  const tenantNotice = await getOne(admin, "notices", {
    client_id: clientId,
    title: "Tower B water maintenance on March 9"
  });
  if (!tenantNotice) {
    const { error } = await admin.from("notices").insert([
      {
        client_id: clientId,
        site_id: siteId,
        unit_id: unitId,
        scope: "tenant",
        title: "Tower B water maintenance on March 9",
        body: "Water supply interruption expected between 10:00 and 12:00 for routine maintenance.",
        published_by: managerId
      }
    ]);
    if (error) throw error;
  }

  const ownerNotice = await getOne(admin, "notices", {
    client_id: clientId,
    title: "Monthly owner portfolio snapshot available"
  });
  if (!ownerNotice) {
    const { error } = await admin.from("notices").insert([
      {
        client_id: clientId,
        site_id: siteId,
        scope: "owner",
        title: "Monthly owner portfolio snapshot available",
        body: "March revenue and expense summaries are now available in the owner dashboard.",
        published_by: managerId
      }
    ]);
    if (error) throw error;
  }
}

async function ensureThreadAndMessages(admin: any, clientId: string, siteId: string, unitId: string, tenantId: string, ownerId: string, managerId: string) {
  let thread = await getOne(admin, "portal_threads", {
    client_id: clientId,
    subject: "Noise complaint in Tower B"
  });

  if (!thread) {
    const { data, error } = await admin
      .from("portal_threads")
      .insert([
        {
          client_id: clientId,
          site_id: siteId,
          unit_id: unitId,
          subject: "Noise complaint in Tower B",
          created_by: tenantId
        }
      ])
      .select()
      .single();
    if (error) throw error;
    thread = data;
  }

  const participants = [tenantId, ownerId, managerId];
  for (const userId of participants) {
    const { error } = await admin.from("portal_thread_participants").upsert(
      [{ thread_id: thread.id, user_id: userId }],
      { onConflict: "thread_id,user_id" }
    );
    if (error) throw error;
  }

  const existingMessage = await getOne(admin, "portal_messages", {
    thread_id: thread.id,
    body: "The issue starts after 10 PM. Please help resolve it."
  });
  if (!existingMessage) {
    const { error } = await admin.from("portal_messages").insert([
      {
        thread_id: thread.id,
        sender_user_id: tenantId,
        body: "The issue starts after 10 PM. Please help resolve it."
      },
      {
        thread_id: thread.id,
        sender_user_id: managerId,
        body: "Acknowledged. Building security will inspect tonight and update this thread."
      }
    ]);
    if (error) throw error;
  }
}

async function ensureDocuments(admin: any, clientId: string, siteId: string, unitId: string, leaseId: string, managerId: string) {
  const leaseDoc = await getOne(admin, "documents", {
    client_id: clientId,
    title: "Lease Agreement - Unit B-1204"
  });
  if (!leaseDoc) {
    const { error } = await admin.from("documents").insert([
      {
        client_id: clientId,
        site_id: siteId,
        unit_id: unitId,
        lease_id: leaseId,
        title: "Lease Agreement - Unit B-1204",
        bucket_path: "portal-documents/lease-agreement-b1204.pdf",
        visibility: "tenant",
        uploaded_by: managerId
      },
      {
        client_id: clientId,
        site_id: siteId,
        title: "Owner Monthly Portfolio Summary - March 2026",
        bucket_path: "portal-documents/owner-portfolio-march-2026.pdf",
        visibility: "owner",
        uploaded_by: managerId
      }
    ]);
    if (error) throw error;
  }
}

async function ensureMaintenanceRequest(admin: any, clientId: string, siteId: string, areaId: string, tenantId: string, managerId: string) {
  const existing = await getOne(admin, "work_orders", {
    client_id: clientId,
    site_id: siteId,
    description: "Kitchen sink pipe leakage in unit B-1204"
  });
  if (existing) return existing;

  const now = new Date();
  const responseBy = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
  const resolveBy = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await admin
    .from("work_orders")
    .insert([
      {
        client_id: clientId,
        site_id: siteId,
        area_id: areaId,
        created_by: tenantId,
        trade: "Plumbing",
        priority: "Urgent",
        status: "Assigned",
        description: "Kitchen sink pipe leakage in unit B-1204",
        requester_name: "Tariq Tenant",
        requester_phone: "+96890001122",
        assigned_type: "internal",
        assigned_user_id: managerId,
        cost_cap: 75,
        response_by: responseBy,
        resolve_by: resolveBy
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function ensureWorkEvent(admin: any, workOrderId: string, managerId: string) {
  const existing = await getOne(admin, "work_events", {
    work_order_id: workOrderId,
    event_type: "assigned_to_manager"
  });
  if (existing) return;

  const { error } = await admin.from("work_events").insert([
    {
      work_order_id: workOrderId,
      actor_user_id: managerId,
      event_type: "assigned_to_manager",
      payload_json: { note: "Assigned to manager for rapid response" }
    }
  ]);
  if (error) throw error;
}

async function seed() {
  const admin = createAdminClient() as any;

  const client = await ensureClient(admin);
  const site = await ensureSite(admin, client.id);
  const area = await ensureArea(admin, site.id);
  const unit = await ensureUnit(admin, site.id);

  const createdUsers: Record<string, any> = {};
  for (const seedUser of seedUsers) {
    const user = await ensureAuthUser(admin, seedUser);
    createdUsers[seedUser.role] = user;
    await ensureProfile(admin, user, seedUser.fullName);
    await ensureMembership(admin, client.id, user.id, seedUser.role);
  }

  const manager = createdUsers["Property Manager"];
  const owner = createdUsers["Owner"];
  const tenant = createdUsers["Tenant"];

  await ensureOwnership(admin, client.id, site.id, owner.id);
  const lease = await ensureLease(admin, client.id, unit.id, tenant.id, manager.id);
  await ensureLeaseEntry(admin, client.id, lease.id, manager.id);
  await ensureOwnerFinancials(admin, client.id, site.id, manager.id);
  await ensureNotices(admin, client.id, site.id, unit.id, manager.id);
  await ensureThreadAndMessages(admin, client.id, site.id, unit.id, tenant.id, owner.id, manager.id);
  await ensureDocuments(admin, client.id, site.id, unit.id, lease.id, manager.id);
  const workOrder = await ensureMaintenanceRequest(admin, client.id, site.id, area.id, tenant.id, manager.id);
  await ensureWorkEvent(admin, workOrder.id, manager.id);

  console.log("Seed completed.");
  console.log("Sign-in paths:");
  console.log("  Tenant:  /login/tenant");
  console.log("  Owner:   /login/owner");
  console.log("  Manager: /login/manager");
  console.log("Credentials:");
  for (const user of seedUsers) {
    console.log(`  ${user.role}: ${user.email} / ${user.password} (${user.portalPath})`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
