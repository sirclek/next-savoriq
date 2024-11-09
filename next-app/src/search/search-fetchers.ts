import type { Whiskey } from '@/common/object-types';
import { dataTypes, fetchData, fetchCategories, categoryData} from '@/db/db-utils';
import type {
  WhiskeyFilterArgs,
  WhiskeyFilterOptions,
  WhiskeyFilterResponse,
  WhiskeyFilterSelectedOption,
} from '@/search/search-types';
import { WhiskeyFilterKey, WhiskeySorting } from '@/search/search-utils';
import { cache } from 'react';

async function getWhiskeyFilterOptions() {
  const categoryData = await fetchCategories() as categoryData;

  const filterOptions: WhiskeyFilterOptions = {
    sortings: {
      title: 'Sorting',
      options: categoryData.sortings,
      filterKey: WhiskeyFilterKey.SORTING,
      dbKey: 'sortings',
    },
    brands: {
      title: 'Brand',
      options: categoryData.brands,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'brands',
    },
    ages: {
      title: 'Age',
      options: categoryData.ages,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'ages',
    },
    regions: {
      title: 'Region',
      options: categoryData.regions,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'regions',
    },
    types: {
      title: 'Type',
      options: categoryData.types,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'types',
    },
    abvs: {
      title: 'ABV',
      options: categoryData.abvs,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'abvs',
    },
    caskTypes: {
      title: 'Cask Type',
      options: categoryData.caskTypes,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'caskTypes',
    },
    specialNotes: {
      title: 'Special Notes',
      options: categoryData.specialNotes,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'specialNotes',
    },
  };

  return filterOptions;
}

function filterByKey<T>(argsValue: T[] | T, whiskeyValue: T) {
  return Array.isArray(argsValue)
    ? argsValue.includes(whiskeyValue)
    : argsValue === whiskeyValue;
}

export async function getManyWhiskeys(args: WhiskeyFilterArgs) {
  let response: Whiskey[] = await fetchData<Whiskey>(dataTypes.WHISKEYS);

  for (const arg in args) {
    if (arg !== 'sortings') {
      response = response.filter((whiskey) => {
        switch (arg) {
          case 'brands': {
            return filterByKey(args.brands, whiskey.brand);
          }
          case 'ages': {
            return filterByKey(args.ages, whiskey.age);
          }
          case 'regions': {
            return filterByKey(args.regions, whiskey.region);
          }
          case 'types': {
            return filterByKey(args.types, whiskey.type);
          }
          case 'abvs': {
            return filterByKey(args.abvs, `${whiskey.abv}%`);
          }
          case 'caskTypes': {
            return filterByKey(args.caskTypes, whiskey.caskType);
          }
          case 'specialNotes': {
            return filterByKey(args.specialNotes, whiskey.specialNote);
          }
          default: {
            return true;
          }
        }
      });
    }
  }
  return response;
}

function getWhiskeyFilterSelectedOptions({
  filterOptions,
  args,
}: {
  filterOptions: WhiskeyFilterOptions;
  args: WhiskeyFilterArgs;
}) {
  const {
    sortings,
    brands,
    ages,
    regions,
    types,
    abvs,
    caskTypes,
    specialNotes,
  } = filterOptions;
  const selectedOptions: WhiskeyFilterSelectedOption[] = [];

  const selectedSorting =
    sortings.options.find((sorting) => sorting.value === args.sortings) ||
    sortings.options.find(
      (sorting) => (sorting.value as WhiskeySorting) === WhiskeySorting.DEFAULT,
    );

  if (selectedSorting) {
    selectedOptions.push({
      ...selectedSorting,
      filterKey: WhiskeyFilterKey.SORTING,
      dbKey: 'sortings',
    });
  }

  const addSelectedOptions = (
    options: { value: string }[],
    argsKey: string | string[] | undefined,
    filterKey: WhiskeyFilterKey,
    dbKey: string,
  ) => {
    for (const option of options) {
      if (filterByKey(argsKey as string | string[], option.value)) {
        selectedOptions.push({
          ...option,
          filterKey,
          dbKey,
        });
      }
    }
  };

  addSelectedOptions(
    brands.options,
    args.brands,
    WhiskeyFilterKey.CATEGORIES,
    'brands',
  );
  addSelectedOptions(
    ages.options,
    args.ages,
    WhiskeyFilterKey.CATEGORIES,
    'ages',
  );
  addSelectedOptions(
    regions.options,
    args.regions,
    WhiskeyFilterKey.CATEGORIES,
    'regions',
  );
  addSelectedOptions(
    types.options,
    args.types,
    WhiskeyFilterKey.CATEGORIES,
    'types',
  );
  addSelectedOptions(
    abvs.options,
    args.abvs,
    WhiskeyFilterKey.CATEGORIES,
    'abvs',
  );
  addSelectedOptions(
    caskTypes.options,
    args.caskTypes,
    WhiskeyFilterKey.CATEGORIES,
    'caskTypes',
  );
  addSelectedOptions(
    specialNotes.options,
    args.specialNotes,
    WhiskeyFilterKey.CATEGORIES,
    'specialNotes',
  );
  return selectedOptions;
}

export const filterProducts = cache(
  async (args: WhiskeyFilterArgs): Promise<WhiskeyFilterResponse> => {
    const [filterOptions, whiskeys] = await Promise.all([
      getWhiskeyFilterOptions(),
      getManyWhiskeys(args),
    ]);
    const selectedOptions = getWhiskeyFilterSelectedOptions({
      filterOptions,
      args,
    });
    return { filterOptions, selectedOptions, whiskeys };
  },
);
