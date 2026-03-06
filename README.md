# PropertyOps MVP

PropertyOps is a connected property management platform built around three role-based portals:

- Tenant Portal
- Owner Portal
- Manager Portal

Each role works from the same core property data with controlled visibility and role-specific permissions.

## Product positioning

This platform is no longer positioned as a generic operations tool. It is now focused on end-to-end property management where:

- tenants submit and track maintenance requests, access lease/documents/notices, and view account records
- owners monitor revenue, expenses, occupancy, maintenance activity, and portfolio returns
- managers run operational workflows across properties, units, tenants, owners, and service providers

## Main modules

- Role-based portal access and dashboard routing (`tenant`, `owner`, `manager`)
- Maintenance request lifecycle management (submit, assign, update, close)
- Property, unit, tenant, owner, and lease visibility
- Owner financial tracking (revenue/expenses/net returns)
- Manager operational oversight (workload, unresolved issues, KPIs)
- Notices, documents, and communication surfaces
- Reporting and CSV exports

## Portal overview

### Tenant portal

- View property and unit details
- Submit maintenance requests with category/priority/description
- Track request status and updates
- Access lease documents, notices, and announcements
- View charges/rent/fees/balance records (view-only)

### Owner portal

- Revenue and expense visibility by property and portfolio
- Occupancy and vacancy tracking
- Maintenance activity and property health summaries
- Dashboard metrics: total revenue, total expenses, net returns, occupancy, active maintenance
- Historical and exportable performance reports

### Manager portal

- Manage properties, units, tenants, owners, and leases
- Receive, assign, track, and close maintenance requests
- Record/manage operational expenses
- Coordinate tenant-owner-service-provider communication
- Monitor urgent tasks, unresolved issues, and operational KPIs

## Permissions model

See [`lib/auth/portal.ts`](./lib/auth/portal.ts) for role definitions, navigation, and permission scopes.

## MVP limitation (current phase)

Online payment processing is intentionally excluded.

The platform currently supports view-only financial records for:

- rent records
- maintenance fees
- service charges
- balances
- expense logs
- revenue summaries

## Architecture and flows

See [`docs/property-ecosystem-architecture.md`](./docs/property-ecosystem-architecture.md) for:

- portal-by-portal architecture
- role visibility and permission matrix
- user flow definitions
- dashboard recommendations
- phased roadmap with payment deferred

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Local run

```bash
npm install
npm run dev
```

## Build and test

```bash
npm run build
npm test
```
