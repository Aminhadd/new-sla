import { Card } from '@/components/ui/card';

const vendors = [
  { name: 'Gulf HVAC Services', city: 'Muscat', status: 'Active', trades: 'HVAC, Fire Safety' },
  { name: 'Dubai Rapid Electrical', city: 'Dubai', status: 'Invited', trades: 'Electrical' }
];

export default function VendorsPage() {
  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Vendors Directory</h1>
      {vendors.map((vendor) => (
        <Card key={vendor.name}>
          <h2 className='font-semibold'>{vendor.name}</h2>
          <p className='text-sm text-slate-600'>{vendor.city} · {vendor.trades}</p>
          <p className='text-sm'>Status: {vendor.status}</p>
        </Card>
      ))}
    </section>
  );
}
