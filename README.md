# SLAWorks MVP

SLAWorks is a B2B maintenance operations control tower for Oman + UAE property portfolios.

## What is implemented
- Next.js App Router shell with public marketing, auth, and authenticated operations sections.
- EN/AR language messaging + RTL document direction switching.
- Multi-tenant Supabase schema for clients, memberships, sites, areas, vendors, work orders, SLA policies, estimates, notifications, and attachments.
- RLS strategy with tenant-scoped checks and vendor-specific visibility.
- SLA calculation helpers and breach-state logic.
- CSV export endpoints for work orders and vendor performance.
- Demo-facing pages for dashboard, sites, vendors, work orders, estimates, reports, notifications, and settings sections.

## Security / secrets
- Keep credentials only in `.env.local`.
- Do not commit secrets.
- `.env.example` includes placeholders only.

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database setup
1. Open Supabase SQL Editor in your project.
2. Run `supabase/migrations/20260306152000_init_slaworks.sql`.
3. (Optional) run `scripts/seed-demo.ts` in a trusted local environment.

## Local run
```bash
npm install
npm run dev
```

## Tests
```bash
npm test
```
