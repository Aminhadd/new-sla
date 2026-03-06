import { Card } from '@/components/ui/card';
import { dashboardSnapshot } from '@/lib/demo/data';

export default function DashboardPage() {
  const metrics = [
    ['SLA compliance (7d)', `${dashboardSnapshot.slaCompliance7d}%`],
    ['SLA compliance (30d)', `${dashboardSnapshot.slaCompliance30d}%`],
    ['Avg time to assign', `${dashboardSnapshot.avgAssignMinutes} min`],
    ['Avg time to complete', `${dashboardSnapshot.avgCompleteHours} hrs`],
    ['Breached tickets', dashboardSnapshot.breached],
    ['Completed (30d)', dashboardSnapshot.completed30d]
  ];

  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Operations Control Tower</h1>
      <div className='grid gap-3 md:grid-cols-3'>
        {metrics.map(([label, value]) => (
          <Card key={label as string}>
            <p className='text-sm text-slate-500'>{label}</p>
            <p className='text-2xl font-semibold'>{value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <h2 className='mb-3 text-lg font-semibold'>Open backlog by priority</h2>
        <div className='grid gap-2 md:grid-cols-3'>
          {Object.entries(dashboardSnapshot.openBacklogByPriority).map(([priority, count]) => (
            <div key={priority} className='rounded-md border p-3'>
              <p className='text-sm text-slate-500'>{priority}</p>
              <p className='text-xl font-semibold'>{count}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className='mb-3 text-lg font-semibold'>Vendor ranking</h2>
        <div className='space-y-2 text-sm'>
          {dashboardSnapshot.vendorRanking.map((v, idx) => (
            <div key={v.vendor} className='flex items-center justify-between rounded-md border p-2'>
              <span>{idx + 1}. {v.vendor}</span>
              <span>{v.score}% SLA · {v.completed} completed</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
