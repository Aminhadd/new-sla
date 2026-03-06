# PropertyOps Architecture (Tenant-Owner-Manager Ecosystem)

## 1. Product focus

PropertyOps is structured as a connected ecosystem where tenants, owners, and property managers work with shared property data through separate role-based portals.

Core themes:

- maintenance workflow as a first-class system
- portfolio and financial visibility for owners
- operational control and coordination for managers
- transparent request and account visibility for tenants

## 2. Portal-by-portal structure

### Tenant portal

Primary objectives:

- self-service maintenance reporting and tracking
- property/unit and lease visibility
- notices, communication, and document access
- account statement visibility (view-only)

Main screens:

- Tenant Dashboard
- New Maintenance Request
- Request Tracker
- Notices and Messages

### Owner portal

Primary objectives:

- financial and portfolio performance visibility
- occupancy and property health monitoring
- maintenance activity oversight

Main screens:

- Owner Dashboard
- Property Portfolio
- Revenue and Expense Reports
- Maintenance Activity

### Manager portal

Primary objectives:

- central operational command center
- maintenance workflow orchestration
- multi-asset coordination across tenants, owners, and providers

Main screens:

- Manager Dashboard
- Properties and Units
- Maintenance Workflow
- Service Providers
- Expense Control
- Operational Reports

## 3. Shared data and controlled visibility

All portals read/write to shared property and maintenance entities with role-scoped access.

Shared entities:

- properties, units, leases
- tenants, owners, manager memberships
- maintenance requests and updates
- notices/documents/messages
- financial records (revenue/expenses/charges/balances)

Visibility model:

- tenants: own unit/lease and own requests
- owners: owned properties and portfolio aggregates
- managers: operational scope across assigned properties/assets

## 4. Permissions matrix (MVP)

| Capability | Tenant | Owner | Manager |
|---|---|---|---|
| Create maintenance request | Yes | No | Yes |
| View maintenance requests | Own | Portfolio-level | Full operational scope |
| Assign/close requests | No | No | Yes |
| View lease and unit details | Yes | Summary view | Yes |
| View portfolio KPIs | No | Yes | Yes |
| Manage properties/tenants/owners/leases | No | No | Yes |
| View financial records | Account-only | Portfolio-level | Operational-level |
| Process online payments | No | No | No (excluded in MVP) |

Implementation reference:

- `lib/auth/portal.ts`

## 5. User flows

### Tenant flow

1. Sign in and enter Tenant Portal
2. View unit and lease context
3. Submit maintenance request with category/priority/description/media
4. Track status from Open to Closed
5. Review notices/documents and account records

### Owner flow

1. Sign in and enter Owner Portal
2. Open dashboard with revenue/expenses/net/occupancy
3. Drill into asset-level performance and maintenance activity
4. Export reports for historical review

### Manager flow

1. Sign in and enter Manager Portal
2. Review urgent tasks and open maintenance queue
3. Assign work, update progress, close requests
4. Record operational expenses and coordinate communications
5. Monitor KPI trends and unresolved issues

## 6. Dashboard recommendations

### Tenant dashboard KPIs

- open requests
- urgent requests
- latest status updates
- upcoming lease milestones
- notices count
- account summary (view-only)

### Owner dashboard KPIs

- total revenue
- total expenses
- net return
- occupancy and vacancy
- active maintenance count
- per-property performance trends

### Manager dashboard KPIs

- open backlog by priority
- SLA compliance trend
- assignment and completion times
- unresolved/overdue issues
- vendor/provider performance

## 7. MVP scope and exclusions

In scope:

- role-based portals and dashboards
- maintenance workflow management
- property/portfolio/operational visibility
- financial tracking and reporting
- notices/documents/messages

Out of scope in current MVP:

- online payment gateways
- payment capture/settlement workflows

Financial features are tracking-only and display-only in this phase.
