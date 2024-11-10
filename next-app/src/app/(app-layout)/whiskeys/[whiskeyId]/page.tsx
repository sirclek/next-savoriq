import type { Id } from '@/common/custom-types';
import { Whiskey, WhiskeyMatching } from '@/common/custom-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { dataTypes, getObjectById } from '@/db/db-utils';
import { getMetadata } from '@/seo/seo-utils';
import { RelatedWhiskeyRow } from '@/whiskeys/related-whiskey';
import { WhiskeyDetails } from '@/whiskeys/whiskey-details';
import { WhiskeyGridSkeleton } from '@/whiskeys/whiskey-grid';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export type WhiskeyPageProps = {
  params: {
    whiskeyId: Id;
  };
};

export async function generateMetadata({ params }: WhiskeyPageProps): Promise<Metadata> {
  const whiskey = await getObjectById<Whiskey>(Number(params.whiskeyId), dataTypes.WHISKEYS);

  if (whiskey.id == -1) notFound();

  return getMetadata({
    title: whiskey.name,
    description: whiskey.name,
    pathname: `/whiskeys/${params.whiskeyId}`,
    images: [{ url: `/images/whiskeys/${whiskey.id}.png`, alt: whiskey.name }],
  });
}

export default async function WhiskeyPage({ params }: WhiskeyPageProps) {
  const whiskey = await getObjectById<Whiskey>(Number(params.whiskeyId), dataTypes.WHISKEYS);

  if (whiskey.id == -1) notFound();

  return (
    <div className="flex flex-col gap-4">
      <main>
        <PageTitle title={whiskey.name} />
        <Paper>
          <WhiskeyDetails whiskey={whiskey} />
        </Paper>
      </main>
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
    </div>
  );
}
