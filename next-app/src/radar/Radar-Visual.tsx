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
    <div className="flex min-h-screen flex-col gap-0">
      <main className="min-h-full flex-1">
        <PageTitle title={`Compound Visual - ${whiskey.name}`} />
        <Paper className="h-full">
          <div className="grid gap-6 md:grid-cols-4" style={{ height: '80vh' }}>
            {/* Whiskey Image */}
            <div className="relative md:col-span-1 grid grid-rows-2 gap-4">
              <div className="relative row-span-1 justify-left">
              <Image
                className="rounded bg-white object-contain"
                src={`/images/whiskeys/${whiskey.id}.png`}
                alt={whiskey.name}
                priority
                fill
              />
              </div>
              <div className="row-span-1 flex justify-left">
              <h2 className="text-m font-bold">{whiskey.description}</h2>
              </div>
            </div>

            {/* Radar Chart Canvas with Dummy Data */}
            <div
              className="relative w-full md:col-span-3"
              style={{ height: '80vh' }}
            >
              <RadarChart whiskey={whiskey} />
            </div>


          </div>
        </Paper>
      </main>
    </div>
  );
}
