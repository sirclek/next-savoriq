export type Flavour = {
  id: number;
  subType: string;
  name: string;
  description: string;
  title: string;
  chemicals: {
    name: string;
    value: string;
  }[];
};

export type Chemical = {
  id: number;
  name: string;
  description: string;
  title: string;
};

export type Whiskey = {
  id: Id;
  name: string;
  brand: string;
  age: number;
  region: string;
  type: string;
  abv: number;
  description: string;
  price: number;
  bottlingDate: string;
  caskType: string;
  specialNote: string;
  flavours: number[];
  chemicals: number[];
};

export type SimilarityExtension = {
  similarity: number;
};

export type WhiskeyWithSimilarity = Whiskey & SimilarityExtension;

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

export type WhiskeyFilterOptionItem = {
  title: string;
  value: FilterDataType;
};

export type WhiskeyFilterData = {
  title: string;
  options: WhiskeyFilterOptionItem[];
  filterKey: WhiskeyFilterKey;
  dbKey: string;
};

export type WhiskeyFilterOptions = Record<
  'sortings' | 'brands' | 'ages' | 'regions' | 'types' | 'abvs' | 'caskTypes' | 'specialNotes',
  WhiskeyFilterData
>;

export type WhiskeyFilterSelectedOption = {
  value: FilterDataType;
  filterKey: WhiskeyFilterKey;
  dbKey: string;
};

export type WhiskeyFilterResponse = {
  filterOptions: WhiskeyFilterOptions;
  selectedOptions: WhiskeyFilterSelectedOption[];
  whiskeys: Whiskey[];
};

export type Nil = null | undefined;

export type Maybe<T> = T | Nil;

export type FilterDataType = string | number | String | Number;

export type Id = number;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export enum WhiskeyFilterKey {
  SORTING = 'sorting',
  CATEGORIES = 'categories',
}

export enum WhiskeySorting {
  DEFAULT = 'default',
  ALC_ASC = 'alc-asc',
  ALC_DESC = 'alc-desc',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
  AGE_ASC = 'age-asc',
  AGE_DESC = 'age-desc',
}

export enum WhiskeyMatching {
  FLAVOUR = 'flavour',
  CHEMICAL = 'chemical',
}

export type MatchType = WhiskeyMatching.FLAVOUR | WhiskeyMatching.CHEMICAL;

export type ChartData = {
  id: number;
  name: string;
  type: MatchType;
  value: number;
};
