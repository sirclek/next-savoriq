import { WhiskeyMatching } from '@/common/custom-types';
import { matchWhiskeys } from '@/search/search-sorting';
import type { Whiskey } from '../common/custom-types';
import { WhiskeyGrid } from './whiskey-grid';

type RelatedProductsProps = {
  whiskey: Whiskey;
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
