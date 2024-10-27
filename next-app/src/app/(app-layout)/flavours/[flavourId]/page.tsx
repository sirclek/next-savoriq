import { Id } from '@/common/common-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { getMetadata } from '@/seo/seo-utils';
import { RelatedProducts } from '@/whiskeys/related-whiskey';
import { WhiskeyDetails } from '@/whiskeys/whiskey-details';
import { WhiskeyGridSkeleton } from '@/whiskeys/whiskey-grid';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getObjectById } from '@/db/db-utils';
import { Flavour } from '@/common/object-types';


export type ProductPageProps = {
  params: {
    flavourId: Id;
  };
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const flavour = await getObjectById<Flavour>(
    Number(params.flavourId),
    'flavours',
  );

  if (!flavour) notFound();

  return getMetadata({
    title: flavour.name,
    description: flavour.description,
    pathname: `/flavours/${params.flavourId}`,
    images: [{ url: '/images/flavours/', alt: flavour.name }],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const flavour = await getObjectById<Flavour>(Number(params.flavourId), 'flavours');

  if (!flavour) notFound();

  return (
    <div className="flex flex-col gap-4">
      <main>
        <PageTitle title={flavour.name} />
        <Paper>
          <WhiskeyDetails flavour={product} />
        </Paper>
      </main>
      <Section as="aside">
        <SectionTitle as="h2">Related by Flavour</SectionTitle>
        <Paper>
          <Suspense fallback={<WhiskeyGridSkeleton itemCount={6} />}>
            <RelatedProducts whiskeyId={productId} />
          </Suspense>
        </Paper>
      </Section>
      <Section as="aside">
        <SectionTitle as="h2">Related by Chemicals</SectionTitle>
        <Paper>
          <Suspense fallback={<WhiskeyGridSkeleton itemCount={6} />}>
            <RelatedProducts whiskeyId={productId} />
          </Suspense>
        </Paper>
      </Section>
    </div>
  );
}