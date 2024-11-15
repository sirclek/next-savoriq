import { WhiskeyMatching } from '@/common/custom-types';
import { matchValues, matchWhiskeys } from '@/search/search-sorting';
import type { Whiskey, Id } from '../common/custom-types';
import { WhiskeyGrid } from './whiskey-grid';

type RelatedProductsProps = {
  whiskey: Whiskey;
  type: WhiskeyMatching;
  count?: number;
};

type RelatedValuesProps = {
  id: Id;
  type: WhiskeyMatching;
  count?: number;
};

export async function RelatedWhiskeyRow({ whiskey, type, count = 6 }: RelatedProductsProps) {
  let relatedProducts: Whiskey[] = [];
  if (type === WhiskeyMatching.FLAVOUR) {
    relatedProducts = await matchWhiskeys(whiskey, WhiskeyMatching.FLAVOUR, count);
  }
  if (type === WhiskeyMatching.CHEMICAL) {
    relatedProducts = await matchWhiskeys(whiskey, WhiskeyMatching.CHEMICAL, count);
  }

  return <WhiskeyGrid whiskeys={relatedProducts} />;
}

export async function RelatedValueRow({ id, type, count = 6 }: RelatedValuesProps) {
  let relatedProducts: Whiskey[] = [];
  
  if (type === WhiskeyMatching.FLAVOUR) {
    relatedProducts = await matchValues(id, WhiskeyMatching.FLAVOUR, count);
  }
  
  if (type === WhiskeyMatching.CHEMICAL) {
    relatedProducts = await matchValues(id, WhiskeyMatching.CHEMICAL, count);
  }
  return <WhiskeyGrid whiskeys={relatedProducts} />;
}