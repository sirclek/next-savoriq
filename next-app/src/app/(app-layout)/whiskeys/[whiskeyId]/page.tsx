import type { Id } from '@/common/common-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { getMetadata } from '@/seo/seo-utils';
import {
  RelatedProductType,
  RelatedProducts,
} from '@/whiskeys/related-whiskey';
import { WhiskeyDetails } from '@/whiskeys/whiskey-details';
import { getOneWhiskeyById } from '@/whiskeys/whiskey-fetcher';
import { WhiskeyGridSkeleton } from '@/whiskeys/whiskey-grid';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export type WhiskeyPageProps = {
  params: {
    whiskeyId: Id;
  };
};

export async function generateMetadata({
  params,
}: WhiskeyPageProps): Promise<Metadata> {
  const whiskey = await getOneWhiskeyById(Number(params.whiskeyId));

  if (!whiskey) notFound();

  return getMetadata({
    title: whiskey.name,
    description: whiskey.name,
    pathname: `/whiskeys/${params.whiskeyId}`,
    images: [{ url: `/images/whiskeys/${whiskey.id}.png`, alt: whiskey.name }],
  });
}

export default async function WhiskeyPage({ params }: WhiskeyPageProps) {
  const whiskeyId = Number(params.whiskeyId);

  const whiskey = await getOneWhiskeyById(whiskeyId);

  if (!whiskey) notFound();

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
            <RelatedProducts
              whiskeyId={whiskeyId}
              type={RelatedProductType.FLAVOUR}
            />
          </Suspense>
        </Paper>
      </Section>
      <Section as="aside">
        <SectionTitle as="h2">Related by Chemicals</SectionTitle>
        <Paper>
          <Suspense fallback={<WhiskeyGridSkeleton itemCount={6} />}>
            <RelatedProducts
              whiskeyId={whiskeyId}
              type={RelatedProductType.CHEMICAL}
            />
          </Suspense>
        </Paper>
      </Section>
    </div>
  );
}
