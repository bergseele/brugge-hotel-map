'use client';
import dynamic from 'next/dynamic';

const BruggeMap = dynamic(() => import('./components/BruggeMap'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <BruggeMap />
    </main>
  );
}