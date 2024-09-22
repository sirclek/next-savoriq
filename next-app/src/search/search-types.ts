import type { Product } from '@/products/product-types';
import type { ProductFilterKey } from './search-utils';

export type ProductFilterArgs = {
  sorting?: string;
  brand?: string[];
  age?: string[];
  region?: string[];
  type?: string[];
  abv?: string[];
};

type ProductFilterOptionItem = {
  title: string;
  value: string;
  order: `${number}_${number}`;
};

export type ProductFilterData = {
  title: string;
  options: ProductFilterOptionItem[];
  filterKey: ProductFilterKey;
};

export type ProductFilterOptions = Record<
  'sortings' | 'brands' | 'ages' | 'regions' | 'types' | 'abvs' | 'cask_types' | 'special_notes', 
  ProductFilterData
>;

export type ProductFilterSelectedOption = ProductFilterOptionItem & {
  isVisible: boolean;
  filterKey: ProductFilterKey;
};

export type ProductFilterResponse = {
  filterOptions: ProductFilterOptions;
  selectedOptions: ProductFilterSelectedOption[];
  products: Product[];
};
