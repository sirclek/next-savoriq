import { Id } from '@/common/common-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { WhiskeyDetails } from '@/products/product-details';
import { getOneWhiskeyById } from '@/products/product-fetchers';
import { ProductGridSkeleton } from '@/products/product-grid';
import { RelatedProducts } from '@/products/related-products';
import { getMetadata } from '@/seo/seo-utils';
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
  console.log(params);
  console.log(whiskeyId);
  const whiskey = await getOneWhiskeyById(whiskeyId);

  if (!whiskey) notFound();

  return (
    <div className="flex flex-col gap-4">
      <main>
        <PageTitle title={whiskey.name} />
        {/* <Paper>
          <WhiskeyDetails whiskey={whiskey} />
        </Paper> */}
      </main>
      <Section as="aside">
        <SectionTitle as="h2">Related by Flavour</SectionTitle>
        <Paper>
          <Suspense fallback={<ProductGridSkeleton itemCount={6} />}>
            <RelatedProducts productId={whiskeyId} />
          </Suspense>
        </Paper>
      </Section>
      <Section as="aside">
        <SectionTitle as="h2">Related by Chemicals</SectionTitle>
        <Paper>
          <Suspense fallback={<ProductGridSkeleton itemCount={6} />}>
            <RelatedProducts productId={whiskeyId} />
          </Suspense>
        </Paper>
      </Section>
    </div>
  );
}
