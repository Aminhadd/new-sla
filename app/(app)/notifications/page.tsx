import { Card } from '@/components/ui/card';

export default function NotificationsPage() {
  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Notifications</h1>
      <Card>
        <p className='font-medium'>SLA breach risk: WO-1001</p>
        <p className='text-sm text-slate-600'>Supervisor alert sent 15 min before response breach.</p>
      </Card>
      <Card>
        <p className='font-medium'>SLA breached: WO-0928</p>
        <p className='text-sm text-slate-600'>Admin escalation created. Email provider hook ready, WhatsApp placeholder only.</p>
      </Card>
    </section>
  );
}
