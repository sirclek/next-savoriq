import type { Chemical } from '@/common/custom-types';
import { WhiskeyMatching } from '@/common/custom-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { dataTypes, fetchData, getObjectByName } from '@/db/db-utils';
import { RelatedValueLine } from '@/whiskeys/whiskey-related-line-fetcher';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type ChemicalPageProps = {
  params: {
    chemicalName: string;
  };
};

export default async function ChemicalPage({ params }: ChemicalPageProps) {
  const chemical = await getObjectByName<Chemical>(params.chemicalName.replace("%20"," "), dataTypes.CHEMICALS);

  if (!chemical || chemical.name === null) notFound();

  return (
    <>
      <Section>
        <Paper>
          <div className="flex flex-col gap-4">
            <PageTitle title={chemical.title} />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                <Image className="rounded bg-white object-contain" src={`/images/chemicals/${chemical.id}.png`} alt={chemical.name} priority fill />
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
          <RelatedValueLine id={chemical.id} type={WhiskeyMatching.CHEMICAL} />
        </Paper>
      </Section>
    </>
  );
}
