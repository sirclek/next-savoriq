import { matchWhiskeys, WhiskeyMatching } from '@/search/search-sorting';
import type { Whiskey } from '../common/object-types';
import { WhiskeyGrid } from './whiskey-grid';

type RelatedProductsProps = {
  whiskey: Whiskey;
  type: WhiskeyMatching;
};

export async function RelatedProducts({ whiskey, type }: RelatedProductsProps) {
  let relatedProducts: Whiskey[] = [];
  if (type === WhiskeyMatching.FLAVOUR) {
    relatedProducts = await matchWhiskeys(whiskey, WhiskeyMatching.FLAVOUR, 6);
  }
  if (type === WhiskeyMatching.CHEMICAL) {
    relatedProducts = await matchWhiskeys(whiskey, WhiskeyMatching.CHEMICAL, 6);
  }

  return <WhiskeyGrid whiskeys={relatedProducts} />;
}
