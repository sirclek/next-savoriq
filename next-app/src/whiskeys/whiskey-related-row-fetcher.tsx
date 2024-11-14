import { WhiskeyMatching } from '@/common/custom-types';
import { matchWhiskeysKeepFirst, matchWhiskeysDropFirst } from '@/search/search-sorting';
import type { Whiskey } from '../common/custom-types';
import { WhiskeyRow } from './whiskey-row';

type RelatedProductsProps = {
  whiskey: Whiskey;
  type: WhiskeyMatching;
  keepfirst: boolean;
  count?: number;
  showSimilarity?: boolean;
};

export async function RelatedWhiskeyRow({ whiskey, type, keepfirst, count = 6 , showSimilarity = false}: RelatedProductsProps) {
  let relatedProducts: Whiskey[] = [];
  if (type === WhiskeyMatching.FLAVOUR) {
    relatedProducts = keepfirst ? await matchWhiskeysKeepFirst(whiskey, WhiskeyMatching.FLAVOUR, count) : await matchWhiskeysDropFirst(whiskey, WhiskeyMatching.FLAVOUR, count);
  }
  if (type === WhiskeyMatching.CHEMICAL) {
    relatedProducts = keepfirst ? await matchWhiskeysKeepFirst(whiskey, WhiskeyMatching.CHEMICAL, count) : await matchWhiskeysDropFirst(whiskey, WhiskeyMatching.CHEMICAL, count);
  }
  console.log(relatedProducts);
  return <WhiskeyRow whiskeys={relatedProducts} showSimilarity={showSimilarity}/>;
}
