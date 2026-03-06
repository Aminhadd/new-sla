import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { demoSites } from '@/lib/demo/data';

export default function SitesPage() {
  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Sites</h1>
      <div className='grid gap-3 md:grid-cols-2'>
        {demoSites.map((site) => (
          <Card key={site.id}>
            <h2 className='font-semibold'>{site.name_en} / {site.name_ar}</h2>
            <p className='text-sm text-slate-600'>{site.city}, {site.country} · {site.site_type}</p>
            <Link className='mt-3 inline-block text-sm text-blue-600' href={`/sites/${site.id}`}>Open site details</Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
