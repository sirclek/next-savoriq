import type { Id } from '@/common/common-types';
import { Flavour } from '@/common/object-types';
import { getRelatedFlavoursChemicals, getRelatedFlavoursFlavour } from './flavour-fetcher';
import { FlavourGrid } from './flavour-grid';

type RelatedProductsProps = {
  flavourId: Id;
};
export enum RelatedProductType {
  FLAVOUR = 'FLAVOUR',
  CHEMICAL = 'CHEMICAL',
}

export async function RelatedProducts({ flavourId, type }: RelatedProductsProps & { type: RelatedProductType }) {
  let relatedProducts: Flavour[] = [];
  if (type === RelatedProductType.FLAVOUR) {
    relatedProducts = await getRelatedFlavoursFlavour(flavourId);
  } 
  if (type === RelatedProductType.CHEMICAL) {
    relatedProducts = await getRelatedFlavoursChemicals(flavourId);
  }

  return <FlavourGrid flavours={relatedProducts} />;
}