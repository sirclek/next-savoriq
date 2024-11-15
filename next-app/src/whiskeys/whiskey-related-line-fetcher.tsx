import { WhiskeyMatching } from '@/common/custom-types';
import { matchValues, matchWhiskeysDropFirst, matchWhiskeysKeepFirst } from '@/search/search-sorting';
import type { Id, Whiskey } from '../common/custom-types';
import { WhiskeyRow } from './whiskey-line';

type RelatedProductsProps = {
  whiskey: Whiskey;
  type: WhiskeyMatching;
  keepfirst?: boolean;
  count?: number;
  showSimilarity?: boolean;
  orientation?: 'row' | 'column';
};

type RelatedValuesProps = {
  id: Id;
  type: WhiskeyMatching;
  count?: number;
  showSimilarity?: boolean;
  orientation?: 'row' | 'column';
};

export async function RelatedWhiskeyLine({ whiskey, type, keepfirst = false, count = 6, showSimilarity = false, orientation = 'row' }: RelatedProductsProps) {
  let relatedProducts: Whiskey[] = [];
  if (type === WhiskeyMatching.FLAVOUR) {
    relatedProducts = keepfirst ? await matchWhiskeysKeepFirst(whiskey, WhiskeyMatching.FLAVOUR, count) : await matchWhiskeysDropFirst(whiskey, WhiskeyMatching.FLAVOUR, count);
  }
  if (type === WhiskeyMatching.CHEMICAL) {
    relatedProducts = keepfirst ? await matchWhiskeysKeepFirst(whiskey, WhiskeyMatching.CHEMICAL, count) : await matchWhiskeysDropFirst(whiskey, WhiskeyMatching.CHEMICAL, count);
  }
  return <WhiskeyRow whiskeys={relatedProducts} showSimilarity={showSimilarity} orientation={orientation} />;
}
export async function RelatedValueLine({ id, type, count = 6, showSimilarity = false, orientation = 'row' }: RelatedValuesProps) {
  let relatedProducts: Whiskey[] = [];

  if (type === WhiskeyMatching.FLAVOUR) {
    relatedProducts = await matchValues(id, WhiskeyMatching.FLAVOUR, count);
  }

  if (type === WhiskeyMatching.CHEMICAL) {
    relatedProducts = await matchValues(id, WhiskeyMatching.CHEMICAL, count);
  }
  return <WhiskeyRow whiskeys={relatedProducts} showSimilarity={showSimilarity} orientation={orientation} />;
}
