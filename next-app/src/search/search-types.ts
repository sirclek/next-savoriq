import type { Whiskey } from '@/products/product-types';
import type { WhiskeyFilterKey } from './search-utils';

export type WhiskeyFilterArgs = {
  sortings?: string;
  brands?: string[];
  ages?: string[];
  regions?: string[];
  types?: string[];
  abvs?: string[];
  cask_types?: string[];
  special_notes?: string[];
};

type WhiskeyFilterOptionItem = {
  title: string;
  value: string;
  order: `${number}_${number}`;
};

export type WhiskeyFilterData = {
  title: string;
  options: WhiskeyFilterOptionItem[];
  filterKey: WhiskeyFilterKey;
  dbKey: string;
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
  filterKey: WhiskeyFilterKey;
  dbKey: string;
};

export type WhiskeyFilterResponse = {
  filterOptions: WhiskeyFilterOptions;
  selectedOptions: WhiskeyFilterSelectedOption[];
  whiskeys: Whiskey[];
};
