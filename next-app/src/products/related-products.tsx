import type { Id } from '@/common/common-types';
import { getRelatedWhiskeys } from './product-fetchers';
import { WhiskeyGrid } from './product-grid';

type RelatedProductsProps = {
  productId: Id;
};

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedWhiskeys(productId);

  return <WhiskeyGrid products={relatedProducts} />;
}
