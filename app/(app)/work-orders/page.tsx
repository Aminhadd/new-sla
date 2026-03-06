import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { demoWorkOrders } from '@/lib/demo/data';

export default function WorkOrdersPage() {
  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Work Orders</h1>
        <Link href='/work-orders/new' className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white'>Create</Link>
      </div>
      <div className='space-y-3'>
        {demoWorkOrders.map((wo) => (
          <Card key={wo.id}>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <div>
                <h2 className='font-semibold'>{wo.id} · {wo.trade}</h2>
                <p className='text-sm text-slate-600'>{wo.site}</p>
              </div>
              <p className='text-sm'>{wo.priority} · {wo.status}</p>
            </div>
            <p className='mt-2 text-sm text-slate-500'>Respond by {wo.responseBy} · Resolve by {wo.resolveBy}</p>
            <Link className='mt-3 inline-block text-sm text-blue-600' href={`/work-orders/${wo.id}`}>View timeline</Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
