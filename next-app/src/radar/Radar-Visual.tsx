// ChemicalVisualizePage.tsx
'use client';

import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Whiskey } from '@/common/object-types'; // Update this path as needed
import Image from 'next/image';
import dynamic from 'next/dynamic';

export type ChemicalVisualizePageProps = {
  whiskey: Whiskey;
};

const RadarChart = dynamic(() => import('../radar/Radar-Chart'), {
  ssr: false,
});

export default function ChemicalVisualizePage({
  whiskey,
}: ChemicalVisualizePageProps) {

  return (
    <div className="flex min-h-screen flex-col gap-4">
      <main className="min-h-full flex-1">
        <PageTitle title={`Compound Visual - ${whiskey.name}`} />
        <Paper className="h-full">
          <div className="grid gap-6 md:grid-cols-4" style={{ height: '80vh' }}>
            {/* Whiskey Image */}
            <div className="relative aspect-square md:col-span-1">
              <Image
                className="rounded bg-white object-contain"
                src={`/images/whiskeys/${whiskey.id}.png`}
                alt={whiskey.name}
                priority
                fill
              />
              <h2 className="text-3xl font-bold">{whiskey.name}</h2>
            </div>

            {/* Radar Chart Canvas with Dummy Data */}
            <div
              className="relative w-full md:col-span-3"
              style={{ height: '75vh' }}
            >
              <RadarChart whiskey={whiskey} />
            </div>

            {/* Whiskey Name */}
            <div className="flex flex-col items-center justify-center gap-4 md:col-span-4">
              <h2 className="text-3xl font-bold">{whiskey.name}</h2>
            </div>
          </div>
        </Paper>
      </main>
    </div>
  );
}
