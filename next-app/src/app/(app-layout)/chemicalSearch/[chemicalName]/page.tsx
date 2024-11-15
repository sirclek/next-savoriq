import type { Chemical } from '@/common/custom-types';
import { WhiskeyMatching } from '@/common/custom-types';
import { Paper } from '@/common/paper';
import { PageTitle } from '@/common/page-title';
import { Section, SectionTitle } from '@/common/section';
import { dataTypes, fetchData } from '@/db/db-utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { RelatedValueRow } from '@/whiskeys/whiskey-related-row';

type ChemicalPageProps = {
  params: {
    chemicalName: string;
    chemicalId: number;
  };
};

export default async function ChemicalPage({ params }: ChemicalPageProps) {
    
    const allChemicals = await fetchData<Chemical>(dataTypes.CHEMICALS);

    const chemical = allChemicals.find((chemical) => chemical.name === params.chemicalName);

    if (!chemical || chemical.id === -1) notFound();
  
    return (
      <>
        <Section>
          <Paper>
            <div className="flex flex-col gap-4">
            <PageTitle title={chemical.title} />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                  <Image
                    className="rounded bg-white object-contain"
                    src={`/images/chemicals/${chemical.name}.png`}
                    alt={chemical.name}
                    priority
                    fill
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col gap-2 text-center">
                    <div className="text-3xl font-bold">{chemical.title}</div>
                    <div className="text-2xl">{/* for text*/}</div>
                  </div>
                  <div className="text-sm">
                    <p>{chemical.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </Section>
        
        <Section as="aside">
          <SectionTitle as="h2">Related by Chemicals</SectionTitle>
         <Paper>
         <RelatedValueRow id={params.chemicalId} type={WhiskeyMatching.CHEMICAL} />
          </Paper>
        </Section>
      </>
    );
  }
  