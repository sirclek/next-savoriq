import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { getMetadata } from '@/seo/seo-utils';
import { RelatedProducts } from '@/whiskeys/related-whiskey';
import { WhiskeyDetails } from '@/whiskeys/whiskey-details';
import { getOneWhiskeyById } from '@/whiskeys/whiskey-fetcher';
import { WhiskeyGridSkeleton } from '@/whiskeys/whiskey-grid';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export type ProductPageProps = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getOneWhiskeyById(Number(params.productId));

  if (!product) notFound();

  return getMetadata({
    title: product.title,
    description: product.description,
    pathname: `/whiskeys/${params.productId}`,
    images: [{ url: product.image, alt: product.title }],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.productId);
  const product = await getOneWhiskeyById(productId);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-4">
      <main>
        <PageTitle title={product.title} />
        <Paper>
          <WhiskeyDetails product={product} />
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