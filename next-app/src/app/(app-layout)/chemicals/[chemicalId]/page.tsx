import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { WhiskeyDetails } from '@/products/product-details'; //chemical
import { getOneChemicalById } from '@/products/product-fetchers'; //chemical
import { WhiskeyGridSkeleton } from '@/products/product-grid'; //chemical
import { RelatedProducts } from '@/products/related-products'; //chemical
import { getMetadata } from '@/seo/seo-utils';
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
  const product = await getOneChemicalById(Number(params.productId));

  if (!product) notFound();

  return getMetadata({
    title: product.title,
    description: product.description,
    pathname: `/chemicals/${params.productId}`,
    images: [{ url: product.image, alt: product.title }],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.productId);
  const product = await getOneChemicalById(productId);

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
