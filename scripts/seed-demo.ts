import { createAdminClient } from "@/lib/supabase/admin";

async function upsertUser(email: string, password: string, fullName: string) {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: fullName } });
  if (error) throw error;
  return data.user;
}

async function seed() {
  const admin = createAdminClient();

  const oman = await upsertUser("admin.oman@slaworks.demo", "ChangeMe123!", "Oman Admin");
  const uae = await upsertUser("admin.uae@slaworks.demo", "ChangeMe123!", "UAE Admin");

  const { data: clients } = await admin
    .from("clients")
    .insert([
      { name: "Muscat Prime Property Management", country: "Oman", default_currency: "OMR", vat_rate: 5 },
      { name: "Dubai Skyline FM", country: "UAE", default_currency: "AED", vat_rate: 5 }
    ])
    .select();

  if (!clients) return;

  await admin.from("profiles").upsert([
    { id: oman.id, full_name: "Oman Admin", email: oman.email, preferred_language: "en" },
    { id: uae.id, full_name: "UAE Admin", email: uae.email, preferred_language: "ar" }
  ]);

  await admin.from("memberships").insert([
    { client_id: clients[0].id, user_id: oman.id, role: "Admin" },
    { client_id: clients[1].id, user_id: uae.id, role: "Admin" }
  ]);
}

seed();
