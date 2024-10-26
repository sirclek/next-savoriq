import type { Id } from '@/common/common-types';
import { Whiskey } from '../common/object-types';
import { getRelatedWhiskeysChemicals, getRelatedWhiskeysFlavour } from './whiskey-fetcher';
import { WhiskeyGrid } from './whiskey-grid';

type RelatedProductsProps = {
  whiskeyId: Id;
};
export enum RelatedProductType {
  FLAVOUR = 'flavour',
  CHEMICAL = 'chemical',
}

export async function RelatedProducts({ whiskeyId, type }: RelatedProductsProps & { type: RelatedProductType }) {
  let relatedProducts: Whiskey[] = [];
  if (type === RelatedProductType.FLAVOUR) {
    relatedProducts = await getRelatedWhiskeysFlavour(whiskeyId);
  } 
  if (type === RelatedProductType.CHEMICAL) {
    relatedProducts = await getRelatedWhiskeysChemicals(whiskeyId);
  }

  return <WhiskeyGrid whiskeys={relatedProducts} />;
}
