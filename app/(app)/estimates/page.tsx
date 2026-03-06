import { Card } from '@/components/ui/card';

const estimates = [
  { wo: 'WO-1001', vendor: 'Gulf HVAC Services', amount: 180, vat: 9, total: 189, status: 'submitted' },
  { wo: 'WO-0982', vendor: 'Muscat Plumbing Team', amount: 90, vat: 4.5, total: 94.5, status: 'approved' }
];

export default function EstimatesPage() {
  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Estimates / Approvals</h1>
      {estimates.map((estimate) => (
        <Card key={`${estimate.wo}-${estimate.vendor}`}>
          <p className='font-semibold'>{estimate.wo}</p>
          <p className='text-sm text-slate-600'>{estimate.vendor}</p>
          <p className='text-sm'>Amount {estimate.amount} + VAT {estimate.vat} = {estimate.total}</p>
          <p className='text-sm'>Status: {estimate.status}</p>
        </Card>
      ))}
    </section>
  );
}
