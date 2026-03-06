import { Card } from '@/components/ui/card';

const events = [
  { at: '10:05', text: 'Created by Property Manager' },
  { at: '10:15', text: 'Assigned to Gulf HVAC Services' },
  { at: '10:45', text: 'Vendor accepted assignment' }
];

export default async function WorkOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Work Order {id}</h1>
      <Card>
        <h2 className='mb-2 font-semibold'>Immutable activity timeline</h2>
        <div className='space-y-2 text-sm'>
          {events.map((event) => <p key={event.at}>{event.at} · {event.text}</p>)}
        </div>
      </Card>
    </section>
  );
}
