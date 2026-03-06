alter type app_role add value if not exists 'Owner';
alter type app_role add value if not exists 'Tenant';

do $$
begin
  if not exists (select 1 from pg_type where typname = 'unit_status') then
    create type unit_status as enum ('vacant', 'occupied', 'maintenance', 'reserved');
  end if;
end
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'lease_status') then
    create type lease_status as enum ('draft', 'active', 'expired', 'terminated');
  end if;
end
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'portal_notice_scope') then
    create type portal_notice_scope as enum ('tenant', 'owner', 'manager', 'all');
  end if;
end
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'ledger_entry_type') then
    create type ledger_entry_type as enum ('rent_record', 'service_charge', 'maintenance_fee', 'balance_adjustment');
  end if;
end
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'financial_entry_kind') then
    create type financial_entry_kind as enum ('revenue', 'expense');
  end if;
end
$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'document_visibility') then
    create type document_visibility as enum ('tenant', 'owner', 'manager', 'all');
  end if;
end
$$;

create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references sites(id) on delete cascade,
  unit_code text not null,
  floor_label text,
  bedroom_count int check (bedroom_count is null or bedroom_count >= 0),
  bathroom_count numeric(4,1) check (bathroom_count is null or bathroom_count >= 0),
  area_sqm numeric(10,2) check (area_sqm is null or area_sqm > 0),
  status unit_status not null default 'vacant',
  created_at timestamptz not null default now(),
  unique (site_id, unit_code)
);

create table if not exists ownerships (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  site_id uuid not null references sites(id) on delete cascade,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  ownership_percent numeric(5,2) not null default 100 check (ownership_percent > 0 and ownership_percent <= 100),
  start_date date not null default current_date,
  end_date date,
  created_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date),
  unique (site_id, owner_user_id, start_date)
);

create table if not exists leases (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  unit_id uuid not null references units(id) on delete restrict,
  tenant_user_id uuid not null references auth.users(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  monthly_rent numeric(12,2) not null check (monthly_rent >= 0),
  security_deposit numeric(12,2) check (security_deposit is null or security_deposit >= 0),
  currency text not null check (currency in ('OMR', 'AED')),
  status lease_status not null default 'draft',
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists lease_account_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  lease_id uuid not null references leases(id) on delete cascade,
  entry_type ledger_entry_type not null,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null check (currency in ('OMR', 'AED')),
  recorded_on date not null default current_date,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists owner_financial_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  site_id uuid not null references sites(id) on delete cascade,
  kind financial_entry_kind not null,
  category text not null,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null check (currency in ('OMR', 'AED')),
  occurred_on date not null default current_date,
  related_work_order_id uuid references work_orders(id) on delete set null,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  site_id uuid references sites(id) on delete cascade,
  unit_id uuid references units(id) on delete cascade,
  scope portal_notice_scope not null default 'all',
  title text not null,
  body text not null,
  published_by uuid references auth.users(id),
  published_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  check (expires_at is null or expires_at > published_at)
);

create table if not exists portal_threads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  site_id uuid references sites(id) on delete set null,
  unit_id uuid references units(id) on delete set null,
  subject text not null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists portal_thread_participants (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references portal_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (thread_id, user_id)
);

create table if not exists portal_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references portal_threads(id) on delete cascade,
  sender_user_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  site_id uuid references sites(id) on delete cascade,
  unit_id uuid references units(id) on delete cascade,
  lease_id uuid references leases(id) on delete set null,
  title text not null,
  bucket_path text not null,
  visibility document_visibility not null default 'all',
  uploaded_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists idx_units_site_status on units(site_id, status);
create index if not exists idx_ownerships_owner on ownerships(owner_user_id);
create index if not exists idx_leases_tenant_status on leases(tenant_user_id, status);
create index if not exists idx_leases_unit on leases(unit_id);
create index if not exists idx_lease_account_entries_lease_date on lease_account_entries(lease_id, recorded_on);
create index if not exists idx_owner_financial_entries_site_date on owner_financial_entries(site_id, occurred_on);
create index if not exists idx_notices_client_scope on notices(client_id, scope, published_at);
create index if not exists idx_portal_messages_thread_created on portal_messages(thread_id, created_at);
create index if not exists idx_documents_client_visibility on documents(client_id, visibility);

create or replace function set_leases_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_leases_updated_at on leases;
create trigger trg_leases_updated_at before update on leases
for each row execute function set_leases_updated_at();

create or replace function is_manager_for_client(target_client uuid)
returns boolean language sql stable as $$
  select exists (
    select 1
    from memberships m
    where m.client_id = target_client
      and m.user_id = auth.uid()
      and m.role in ('Admin', 'Property Manager', 'Supervisor')
  );
$$;

create or replace function is_owner_for_client(target_client uuid)
returns boolean language sql stable as $$
  select exists (
    select 1
    from memberships m
    where m.client_id = target_client
      and m.user_id = auth.uid()
      and m.role::text in ('Owner', 'Admin', 'Property Manager')
  )
  or exists (
    select 1
    from ownerships o
    where o.client_id = target_client
      and o.owner_user_id = auth.uid()
      and (o.end_date is null or o.end_date >= current_date)
  );
$$;

create or replace function user_has_active_lease_in_client(target_client uuid)
returns boolean language sql stable as $$
  select exists (
    select 1
    from leases l
    where l.client_id = target_client
      and l.tenant_user_id = auth.uid()
      and l.status = 'active'
  );
$$;

create or replace function user_is_portal_member(target_client uuid)
returns boolean language sql stable as $$
  select
    is_manager_for_client(target_client)
    or is_owner_for_client(target_client)
    or user_has_active_lease_in_client(target_client)
    or exists (
      select 1
      from memberships m
      where m.client_id = target_client
        and m.user_id = auth.uid()
        and m.role::text in ('Tenant', 'Owner')
    );
$$;

create or replace view properties as
select
  s.id,
  s.client_id,
  s.name_en as name,
  s.name_ar,
  s.city,
  s.country,
  s.site_type as property_type,
  s.notes,
  s.created_at
from sites s;

create or replace view maintenance_requests as
select
  wo.id,
  wo.client_id,
  wo.site_id,
  wo.area_id,
  wo.created_by as requested_by,
  wo.trade as category,
  wo.priority,
  wo.status,
  wo.description,
  wo.response_by,
  wo.resolve_by,
  wo.completed_at,
  wo.created_at,
  wo.updated_at
from work_orders wo;

alter table units enable row level security;
alter table ownerships enable row level security;
alter table leases enable row level security;
alter table lease_account_entries enable row level security;
alter table owner_financial_entries enable row level security;
alter table notices enable row level security;
alter table portal_threads enable row level security;
alter table portal_thread_participants enable row level security;
alter table portal_messages enable row level security;
alter table documents enable row level security;

create policy "units read by manager owner tenant" on units for select
using (
  exists (
    select 1
    from sites s
    where s.id = units.site_id
      and (
        is_manager_for_client(s.client_id)
        or is_owner_for_client(s.client_id)
        or exists (
          select 1
          from leases l
          where l.unit_id = units.id
            and l.tenant_user_id = auth.uid()
            and l.status = 'active'
        )
      )
  )
);

create policy "units manager write" on units for all
using (
  exists (
    select 1
    from sites s
    where s.id = units.site_id and is_manager_for_client(s.client_id)
  )
)
with check (
  exists (
    select 1
    from sites s
    where s.id = units.site_id and is_manager_for_client(s.client_id)
  )
);

create policy "ownerships read owner and manager" on ownerships for select
using (
  owner_user_id = auth.uid()
  or is_manager_for_client(client_id)
);

create policy "ownerships manager write" on ownerships for all
using (is_manager_for_client(client_id))
with check (is_manager_for_client(client_id));

create policy "leases read tenant owner manager" on leases for select
using (
  tenant_user_id = auth.uid()
  or is_manager_for_client(client_id)
  or exists (
    select 1
    from ownerships o
    join units u on u.id = leases.unit_id
    where o.site_id = u.site_id
      and o.owner_user_id = auth.uid()
      and o.client_id = leases.client_id
      and (o.end_date is null or o.end_date >= current_date)
  )
);

create policy "leases manager write" on leases for all
using (is_manager_for_client(client_id))
with check (is_manager_for_client(client_id));

create policy "lease account read tenant owner manager" on lease_account_entries for select
using (
  is_manager_for_client(client_id)
  or exists (
    select 1
    from leases l
    where l.id = lease_account_entries.lease_id
      and l.tenant_user_id = auth.uid()
  )
  or exists (
    select 1
    from leases l
    join units u on u.id = l.unit_id
    join ownerships o on o.site_id = u.site_id
    where l.id = lease_account_entries.lease_id
      and o.owner_user_id = auth.uid()
      and o.client_id = lease_account_entries.client_id
      and (o.end_date is null or o.end_date >= current_date)
  )
);

create policy "lease account manager write" on lease_account_entries for all
using (is_manager_for_client(client_id))
with check (is_manager_for_client(client_id));

create policy "owner financial read owner and manager" on owner_financial_entries for select
using (
  is_manager_for_client(client_id)
  or exists (
    select 1
    from ownerships o
    where o.site_id = owner_financial_entries.site_id
      and o.owner_user_id = auth.uid()
      and o.client_id = owner_financial_entries.client_id
      and (o.end_date is null or o.end_date >= current_date)
  )
);

create policy "owner financial manager write" on owner_financial_entries for all
using (is_manager_for_client(client_id))
with check (is_manager_for_client(client_id));

create policy "notices read portal audience" on notices for select
using (
  is_manager_for_client(client_id)
  or (
    scope in ('all', 'tenant')
    and (
      user_has_active_lease_in_client(client_id)
      or exists (
        select 1
        from leases l
        where l.tenant_user_id = auth.uid()
          and l.status = 'active'
          and (
            notices.unit_id is null or l.unit_id = notices.unit_id
          )
      )
    )
  )
  or (
    scope in ('all', 'owner')
    and is_owner_for_client(client_id)
  )
);

create policy "notices manager write" on notices for all
using (is_manager_for_client(client_id))
with check (is_manager_for_client(client_id));

create policy "threads read members and managers" on portal_threads for select
using (
  is_manager_for_client(client_id)
  or exists (
    select 1
    from portal_thread_participants p
    where p.thread_id = portal_threads.id
      and p.user_id = auth.uid()
  )
);

create policy "threads create portal members" on portal_threads for insert
with check (
  created_by = auth.uid()
  and user_is_portal_member(client_id)
);

create policy "threads update managers and creators" on portal_threads for update
using (
  is_manager_for_client(client_id)
  or created_by = auth.uid()
)
with check (
  is_manager_for_client(client_id)
  or created_by = auth.uid()
);

create policy "participants read with thread access" on portal_thread_participants for select
using (
  exists (
    select 1
    from portal_threads t
    where t.id = portal_thread_participants.thread_id
      and (
        is_manager_for_client(t.client_id)
        or exists (
          select 1
          from portal_thread_participants p2
          where p2.thread_id = t.id and p2.user_id = auth.uid()
        )
      )
  )
);

create policy "participants manager or creator write" on portal_thread_participants for all
using (
  exists (
    select 1
    from portal_threads t
    where t.id = portal_thread_participants.thread_id
      and (
        is_manager_for_client(t.client_id)
        or t.created_by = auth.uid()
      )
  )
)
with check (
  exists (
    select 1
    from portal_threads t
    where t.id = portal_thread_participants.thread_id
      and (
        is_manager_for_client(t.client_id)
        or t.created_by = auth.uid()
      )
  )
);

create policy "messages read thread participants" on portal_messages for select
using (
  exists (
    select 1
    from portal_threads t
    where t.id = portal_messages.thread_id
      and (
        is_manager_for_client(t.client_id)
        or exists (
          select 1
          from portal_thread_participants p
          where p.thread_id = t.id and p.user_id = auth.uid()
        )
      )
  )
);

create policy "messages write by sender in thread" on portal_messages for insert
with check (
  sender_user_id = auth.uid()
  and exists (
    select 1
    from portal_threads t
    where t.id = portal_messages.thread_id
      and (
        is_manager_for_client(t.client_id)
        or exists (
          select 1
          from portal_thread_participants p
          where p.thread_id = t.id and p.user_id = auth.uid()
        )
      )
  )
);

create policy "documents read by visibility and relationship" on documents for select
using (
  is_manager_for_client(client_id)
  or (
    visibility = 'all' and user_is_portal_member(client_id)
  )
  or (
    visibility = 'tenant'
    and exists (
      select 1
      from leases l
      where l.tenant_user_id = auth.uid()
        and l.status = 'active'
        and (
          documents.lease_id is null or l.id = documents.lease_id
        )
    )
  )
  or (
    visibility = 'owner'
    and is_owner_for_client(client_id)
  )
);

create policy "documents manager write" on documents for all
using (is_manager_for_client(client_id))
with check (is_manager_for_client(client_id));
