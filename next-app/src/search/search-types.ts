import type { Whiskey } from '@/products/product-types';
import type { ProductFilterKey } from './search-utils';

export type ProductFilterArgs = {
  sorting?: string;
  brand?: string[];
  age?: string[];
  region?: string[];
  type?: string[];
  abv?: string[];
  cask_type?: string[];
  special_note?: string[];
};

type WhiskeyFilterOptionItem = {
  title: string;
  value: string;
  order: `${number}_${number}`;
};

export type WhiskeyFilterData = {
  title: string;
  options: WhiskeyFilterOptionItem[];
  filterKey: ProductFilterKey;
};

export type WhiskeyFilterOptions = Record<
  | 'sortings'
  | 'brands'
  | 'ages'
  | 'regions'
  | 'types'
  | 'abvs'
  | 'cask_types'
  | 'special_notes',
  WhiskeyFilterData
>;

export type WhiskeyFilterSelectedOption = WhiskeyFilterOptionItem & {
  isVisible: boolean;
  filterKey: ProductFilterKey;
};

export type WhiskeyFilterResponse = {
  filterOptions: WhiskeyFilterOptions;
  selectedOptions: WhiskeyFilterSelectedOption[];
  whiskeys: Whiskey[];
};
