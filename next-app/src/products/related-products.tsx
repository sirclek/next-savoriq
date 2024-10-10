import type { Id } from '@/common/common-types';
import { getRelatedWhiskeysChemicals, getRelatedWhiskeysFlavour } from './product-fetchers';
import { WhiskeyGrid } from './product-grid';
import { Whiskey } from './product-types';

type RelatedProductsProps = {
  whiskeyId: Id;
};
export enum RelatedProductType {
  FLAVOUR = 'FLAVOUR',
  CHEMICAL = 'CHEMICAL',
}

export async function RelatedProducts({ whiskeyId, type }: RelatedProductsProps & { type: RelatedProductType }) {
  let relatedProducts: Whiskey[] = [];
  if (type === RelatedProductType.FLAVOUR) {
    relatedProducts = await getRelatedWhiskeysFlavour(whiskeyId);
  } 
  if (type === RelatedProductType.CHEMICAL) {
    relatedProducts = await getRelatedWhiskeysChemicals(whiskeyId);
  }

  relatedProducts = relatedProducts.sort(() => 0.5 - Math.random()).slice(0, 6);

  return <WhiskeyGrid whiskeys={relatedProducts} />;
}
