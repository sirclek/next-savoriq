import type { Flavour, Id  } from '@/common/custom-types';
import { Whiskey, WhiskeyMatching, Chemical} from '@/common/custom-types';
import { Paper } from '@/common/paper';
import { PageTitle } from '@/common/page-title';
import { Section, SectionTitle } from '@/common/section';
import { dataTypes, getObjectById, fetchData } from '@/db/db-utils';
import { getMetadata } from '@/seo/seo-utils';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { WhiskeyGridSkeleton } from '@/whiskeys/whiskey-grid';
import { RelatedWhiskeyRow } from '@/whiskeys/whiskey-related-row';
import { Suspense } from 'react';


type FlavourPageProps = {
  params: {
    flavourId: Id;
    whiskeyId: Id;
    
  };
};

export async function generateMetadata({ params }: FlavourPageProps): Promise<Metadata> {
  const flavour = await getObjectById<Flavour>(Number(params.flavourId), dataTypes.FLAVOURS);
  const Chemicals = await fetchData<Chemical>(dataTypes.CHEMICALS);
  return getMetadata({
    title: flavour.name,
    pathname: `/flavours/${params.flavourId}`,
  });
  
}

export default async function FlavourPage({ params }: FlavourPageProps) {
  const flavour = await getObjectById<Flavour>(Number(params.flavourId), dataTypes.FLAVOURS);
  const whiskey = await getObjectById<Whiskey>(Number(params.whiskeyId), dataTypes.WHISKEYS);
  if (flavour.id === -1) notFound();

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
                  {flavour.chemicals.map((Chemicals, i) => (
                    <p key={i} className="text-sm">
                      <a href={`/chemicals/${Chemicals.id}`} className="text-blue-500 hover:underline">
                        {Chemicals.name}
                      </a>: {Chemicals.value}
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
       <Suspense fallback={<WhiskeyGridSkeleton itemCount={6} />}>
            <RelatedWhiskeyRow whiskey={whiskey} type={WhiskeyMatching.FLAVOUR} />
          </Suspense>
        </Paper>
      </Section>

      <Section as="aside">
        <SectionTitle as="h2">Related by Chemicals</SectionTitle>
       <Paper>
       <Suspense fallback={<WhiskeyGridSkeleton itemCount={6} />}>
            <RelatedWhiskeyRow whiskey={whiskey} type={WhiskeyMatching.CHEMICAL} />
          </Suspense>
        </Paper>
      </Section>
    </>
  );
}
