import { WhiskeyMatching } from '@/common/custom-types';
import { matchWhiskeys } from '@/search/search-sorting';
import type { Whiskey } from '../common/custom-types';
import { WhiskeyGrid } from './whiskey-grid';

type RelatedProductsProps = {
  whiskey: Whiskey;
  type: WhiskeyMatching;
};

export async function RelatedWhiskeyRow({ whiskey, type }: RelatedProductsProps) {
  let relatedProducts: Whiskey[] = [];
  if (type === WhiskeyMatching.FLAVOUR) {
    relatedProducts = await matchWhiskeys(whiskey, WhiskeyMatching.FLAVOUR, 6);
  }
  if (type === WhiskeyMatching.CHEMICAL) {
    relatedProducts = await matchWhiskeys(whiskey, WhiskeyMatching.CHEMICAL, 6);
  }

  return <WhiskeyGrid whiskeys={relatedProducts} />;
}
