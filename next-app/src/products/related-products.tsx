import type { Id } from '@/common/common-types';
import { getRelatedProducts } from './product-fetchers';
import { WhiskeyGrid } from './product-grid';

type RelatedProductsProps = {
  productId: Id;
};

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(productId);

  return <WhiskeyGrid products={relatedProducts} />;
}
