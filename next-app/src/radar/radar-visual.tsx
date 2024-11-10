// ChemicalVisualizePage.tsx
'use client';

import type { Whiskey } from '@/common/custom-types'; // Update this path as needed
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import dynamic from 'next/dynamic';
import Image from 'next/image';

export type VisualizePageProps = {
  whiskey: Whiskey;
};

const RadarChart = dynamic(() => import('./radar-edit-chart'), {
  ssr: false,
});

export default function VisualizePage({ whiskey }: VisualizePageProps) {
  return (
    <div className="flex min-h-screen flex-col gap-0">
      <main className="min-h-full flex-1">
        <PageTitle title={`Compound Visual - ${whiskey.name}`} />
        <Paper className="h-full">
          <div className="grid gap-6 md:grid-cols-4" style={{ height: '78vh' }}>
            {/* Whiskey Image */}
            <div className="relative grid grid-rows-2 gap-4 md:col-span-1">
              <div className="justify-left relative row-span-1">
                <Image className="rounded bg-white object-contain" src={`/images/whiskeys/${whiskey.id}.png`} alt={whiskey.name} priority fill />
              </div>
              <div className="justify-left row-span-1 flex">
                <h2 className="text-m font-bold">{whiskey.description}</h2>
              </div>
            </div>

            {/* Radar Chart Canvas with Dummy Data */}
            <div className="relative w-full md:col-span-3" style={{ height: '78vh' }}>
              <RadarChart whiskey={whiskey} />
            </div>
          </div>
        </Paper>
      </main>
    </div>
  );
}
