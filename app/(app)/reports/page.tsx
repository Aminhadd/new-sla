import Link from 'next/link';

export default function ReportsPage() {
  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Reports</h1>
      <p className='text-slate-600'>Export owner-ready CSV reports for work orders and vendor performance.</p>
      <div className='flex gap-3'>
        <Link className='rounded-md border px-3 py-2 text-sm' href='/api/export/work-orders'>Export Work Orders CSV</Link>
        <Link className='rounded-md border px-3 py-2 text-sm' href='/api/export/vendors'>Export Vendors CSV</Link>
      </div>
    </section>
  );
}
