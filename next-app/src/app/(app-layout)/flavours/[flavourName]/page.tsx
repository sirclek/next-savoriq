import type { Flavour, Id } from '@/common/custom-types';
import { WhiskeyMatching } from '@/common/custom-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { dataTypes, getObjectById, getObjectByName } from '@/db/db-utils';
import { RelatedValueLine } from '@/whiskeys/whiskey-related-line-fetcher';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type FlavourPageProps = {
  params: {
    flavourName: string;
  };
};


export default async function FlavourPage({ params }: FlavourPageProps) {
  const flavour = await getObjectByName<Flavour>(params.flavourName.replace('%20', ' '), dataTypes.FLAVOURS);

  if (!flavour || flavour.id === -1) notFound();

  return (
    <>
      <Section>
        <Paper>
          <div className="flex flex-col gap-4">
            <PageTitle title={flavour.name} />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                <Image className="rounded bg-white object-contain" src={`/images/flavours/${flavour.id}.png`} alt={flavour.name} priority fill />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-3xl font-bold">{flavour.name}</div>
                  <div className="text-2xl">{/* for text*/}</div>
                </div>
                <div className="text-sm">
                  <p>{flavour.description}</p>
                </div>
                <div className="text-sm">
                  {flavour.chemicals.map((chemical, index) => (
                    <p key={index}>
                      <a href={`/chemicals/${chemical.name}`} className="text-blue-500 hover:underline">
                        {chemical.name}
                      </a>
                      : {chemical.value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Section>
      <Section as="aside">
        <SectionTitle as="h2">Related by Flavour</SectionTitle>
        <Paper>
          <RelatedValueLine id={flavour.id} type={WhiskeyMatching.FLAVOUR} count={12} />
        </Paper>
      </Section>
    </>
  );
}
