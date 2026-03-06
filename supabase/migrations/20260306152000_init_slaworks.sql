create extension if not exists pgcrypto;

create type app_role as enum ('Admin','Property Manager','Supervisor','Technician','Finance Approver','Vendor User');
create type priority_level as enum ('Emergency','Urgent','Routine');
create type work_status as enum ('Open','Assigned','En-route','In Progress','Completed','Closed');
create type trade_type as enum ('HVAC','Plumbing','Electrical','Civil','Cleaning','Pest Control','Elevator','Fire Safety','Other');
create type assignment_type as enum ('internal','vendor');
create type vendor_status as enum ('Invited','Active','Suspended');
create type estimate_status as enum ('submitted','approved','rejected');

create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null check (country in ('Oman','UAE')),
  default_currency text not null check (default_currency in ('OMR','AED')),
  vat_rate numeric(5,2) not null default 5,
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  preferred_language text not null default 'en' check (preferred_language in ('en','ar')),
  created_at timestamptz not null default now()
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique(client_id,user_id,role)
);

create table sites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  name_en text not null,
  name_ar text not null,
  city text not null,
  country text not null,
  site_type text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table areas (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references sites(id) on delete cascade,
  name_en text not null,
  name_ar text not null,
  created_at timestamptz not null default now()
);

create table vendors (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  legal_name text not null,
  contact_name text not null,
  phone text,
  email text,
  coverage_city text,
  country text not null,
  status vendor_status not null default 'Invited',
  license_number text,
  availability_notes text,
  created_at timestamptz not null default now()
);

create table vendor_users (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(vendor_id, user_id)
);

create table vendor_skills (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  trade trade_type not null,
  unique(vendor_id, trade)
);

create table sla_policies (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  priority priority_level not null,
  response_minutes int not null check (response_minutes > 0),
  resolve_minutes int not null check (resolve_minutes > response_minutes),
  escalation_minutes int not null check (escalation_minutes > 0),
  created_at timestamptz not null default now(),
  unique(client_id, priority)
);

create table work_orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  site_id uuid not null references sites(id) on delete restrict,
  area_id uuid references areas(id) on delete set null,
  created_by uuid not null references auth.users(id),
  trade trade_type not null,
  priority priority_level not null,
  status work_status not null default 'Open',
  description text not null,
  requester_name text,
  requester_phone text,
  assigned_type assignment_type,
  assigned_user_id uuid references auth.users(id),
  assigned_vendor_id uuid references vendors(id),
  cost_cap numeric(12,2) check(cost_cap is null or cost_cap >= 0),
  response_by timestamptz not null,
  resolve_by timestamptz not null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check(resolve_by > response_by)
);

create table work_events (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  actor_user_id uuid references auth.users(id),
  actor_vendor_id uuid references vendors(id),
  event_type text not null,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table attachments (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  bucket_path text not null,
  file_type text not null,
  uploaded_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table estimates (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  vendor_id uuid not null references vendors(id) on delete cascade,
  amount numeric(12,2) not null check(amount >= 0),
  vat_amount numeric(12,2) not null check(vat_amount >= 0),
  total_amount numeric(12,2) generated always as (amount + vat_amount) stored,
  notes text,
  status estimate_status not null default 'submitted',
  submitted_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by uuid references auth.users(id)
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_memberships_user on memberships(user_id);
create index idx_sites_client on sites(client_id);
create index idx_vendors_client on vendors(client_id);
create index idx_vendor_users_user on vendor_users(user_id);
create index idx_work_orders_client_status on work_orders(client_id,status);
create index idx_work_orders_assigned_vendor on work_orders(assigned_vendor_id);
create index idx_notifications_user on notifications(user_id, read_at);

create or replace function set_work_order_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_work_orders_updated_at before update on work_orders
for each row execute function set_work_order_updated_at();

create or replace function current_user_client_ids()
returns setof uuid language sql stable as $$
  select m.client_id from memberships m where m.user_id = auth.uid();
$$;

create or replace function user_has_role(target_client uuid, target_role app_role)
returns boolean language sql stable as $$
  select exists (
    select 1 from memberships
    where user_id = auth.uid() and client_id = target_client and role = target_role
  );
$$;

create or replace function is_vendor_user_for_work_order(target_work_order uuid)
returns boolean language sql stable as $$
  select exists (
    select 1
    from work_orders wo
    join vendor_users vu on vu.vendor_id = wo.assigned_vendor_id
    where wo.id = target_work_order and vu.user_id = auth.uid()
  );
$$;

alter table clients enable row level security;
alter table profiles enable row level security;
alter table memberships enable row level security;
alter table sites enable row level security;
alter table areas enable row level security;
alter table vendors enable row level security;
alter table vendor_users enable row level security;
alter table vendor_skills enable row level security;
alter table sla_policies enable row level security;
alter table work_orders enable row level security;
alter table work_events enable row level security;
alter table attachments enable row level security;
alter table estimates enable row level security;
alter table notifications enable row level security;

create policy "clients readable by tenant members" on clients for select
using (id in (select current_user_client_ids()));

create policy "profiles read self" on profiles for select using (id = auth.uid());
create policy "profiles write self" on profiles for all using (id = auth.uid()) with check (id = auth.uid());

create policy "memberships read tenant" on memberships for select
using (client_id in (select current_user_client_ids()));

create policy "sites tenant access" on sites for all
using (client_id in (select current_user_client_ids()))
with check (client_id in (select current_user_client_ids()));

create policy "areas tenant access" on areas for all
using (site_id in (select id from sites where client_id in (select current_user_client_ids())))
with check (site_id in (select id from sites where client_id in (select current_user_client_ids())));

create policy "vendors tenant access" on vendors for all
using (client_id in (select current_user_client_ids()))
with check (client_id in (select current_user_client_ids()));

create policy "vendor_users tenant read" on vendor_users for select
using (vendor_id in (select id from vendors where client_id in (select current_user_client_ids())) or user_id = auth.uid());

create policy "vendor_users manager write" on vendor_users for all
using (vendor_id in (
  select v.id from vendors v
  where v.client_id in (select current_user_client_ids())
  and (
    user_has_role(v.client_id,'Admin')
    or user_has_role(v.client_id,'Property Manager')
    or user_has_role(v.client_id,'Supervisor')
  )
))
with check (vendor_id in (
  select v.id from vendors v
  where v.client_id in (select current_user_client_ids())
  and (
    user_has_role(v.client_id,'Admin')
    or user_has_role(v.client_id,'Property Manager')
    or user_has_role(v.client_id,'Supervisor')
  )
));

create policy "vendor_skills tenant access" on vendor_skills for all
using (vendor_id in (select id from vendors where client_id in (select current_user_client_ids())))
with check (vendor_id in (select id from vendors where client_id in (select current_user_client_ids())));

create policy "sla policies tenant access" on sla_policies for all
using (client_id in (select current_user_client_ids()))
with check (client_id in (select current_user_client_ids()));

create policy "work orders tenant and vendor read" on work_orders for select
using (
  client_id in (select current_user_client_ids())
  or is_vendor_user_for_work_order(id)
);

create policy "work orders tenant write" on work_orders for insert
with check (client_id in (select current_user_client_ids()));

create policy "work orders tenant update" on work_orders for update
using (
  client_id in (select current_user_client_ids())
  or is_vendor_user_for_work_order(id)
)
with check (client_id in (select current_user_client_ids()));

create policy "work events tenant and vendor" on work_events for all
using (
  work_order_id in (select id from work_orders where client_id in (select current_user_client_ids()))
  or is_vendor_user_for_work_order(work_order_id)
)
with check (
  work_order_id in (select id from work_orders where client_id in (select current_user_client_ids()))
  or is_vendor_user_for_work_order(work_order_id)
);

create policy "attachments tenant and vendor" on attachments for all
using (
  work_order_id in (select id from work_orders where client_id in (select current_user_client_ids()))
  or is_vendor_user_for_work_order(work_order_id)
)
with check (
  work_order_id in (select id from work_orders where client_id in (select current_user_client_ids()))
  or is_vendor_user_for_work_order(work_order_id)
);

create policy "estimates tenant and vendor" on estimates for all
using (
  work_order_id in (select id from work_orders where client_id in (select current_user_client_ids()))
  or vendor_id in (select vendor_id from vendor_users where user_id = auth.uid())
)
with check (
  work_order_id in (select id from work_orders where client_id in (select current_user_client_ids()))
  or vendor_id in (select vendor_id from vendor_users where user_id = auth.uid())
);

create policy "notifications read self" on notifications for select
using (user_id = auth.uid());

create policy "notifications tenant create" on notifications for insert
with check (client_id in (select current_user_client_ids()));

create policy "notifications update self" on notifications for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

insert into storage.buckets (id, name, public)
values ('work-order-files', 'work-order-files', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('vendor-documents', 'vendor-documents', false)
on conflict (id) do nothing;

create policy "objects work order read" on storage.objects
for select using (
  bucket_id = 'work-order-files' and auth.role() = 'authenticated'
);

create policy "objects work order write" on storage.objects
for insert with check (
  bucket_id = 'work-order-files' and auth.role() = 'authenticated'
);

create policy "objects vendor read" on storage.objects
for select using (
  bucket_id = 'vendor-documents' and auth.role() = 'authenticated'
);

create policy "objects vendor write" on storage.objects
for insert with check (
  bucket_id = 'vendor-documents' and auth.role() = 'authenticated'
);
