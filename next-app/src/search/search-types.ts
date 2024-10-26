import type { Whiskey } from '@/common/object-types';
import type { WhiskeyFilterKey } from './search-utils';

export type WhiskeyFilterArgs = {
  sortings?: string;
  brands?: string[];
  ages?: string[];
  regions?: string[];
  types?: string[];
  abvs?: string[];
  caskTypes?: string[];
  specialNotes?: string[];
};

type WhiskeyFilterOptionItem = {
  title: string;
  value: string;
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
  | 'caskTypes'
  | 'specialNotes',
  WhiskeyFilterData
>;

export type WhiskeyFilterSelectedOption = WhiskeyFilterOptionItem & {
  filterKey: WhiskeyFilterKey;
  dbKey: string;
};

export type WhiskeyFilterResponse = {
  filterOptions: WhiskeyFilterOptions;
  selectedOptions: WhiskeyFilterSelectedOption[];
  whiskeys: Whiskey[];
};
