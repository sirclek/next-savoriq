import type { Id } from '@/common/common-types';
import { getRelatedChemicals, getRelatedFlavour } from './chemical-fetchers';
import { ChemicalGrid } from './chemical-grid';
import { Chemical } from './chemical-types';

type RelatedProductsProps = {
  chemicalId: Id;
};
export enum RelatedProductType {
  FLAVOUR = 'FLAVOUR',
  CHEMICAL = 'CHEMICAL',
}

export async function RelatedProducts({ chemicalId, type }: RelatedProductsProps & { type: RelatedProductType }) {
  let relatedProducts: Chemical[] = [];
  if (type === RelatedProductType.FLAVOUR) {
    relatedProducts = await getRelatedFlavour(chemicalId);
  } 
  if (type === RelatedProductType.CHEMICAL) {
    relatedProducts = await getRelatedChemicals(chemicalId);
  }

  return <ChemicalGrid chemicals={relatedProducts} />;
}
