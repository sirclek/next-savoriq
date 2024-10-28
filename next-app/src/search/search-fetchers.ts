import type { Whiskey } from '@/common/object-types';
import { fetchData, getDb } from '@/db/db-utils';
import type {
  WhiskeyFilterArgs,
  WhiskeyFilterOptions,
  WhiskeyFilterResponse,
  WhiskeyFilterSelectedOption,
} from '@/search/search-types';
import { WhiskeyFilterKey, WhiskeySorting } from '@/search/search-utils';
import { cache } from 'react';

async function getWhiskeyFilterOptions() {
  const {
    sortings,
    brands,
    ages,
    regions,
    types,
    abvs,
    caskTypes,
    specialNotes,
  } = await getDb();

  const filterOptions: WhiskeyFilterOptions = {
    sortings: {
      title: 'Sorting',
      options: sortings,
      filterKey: WhiskeyFilterKey.SORTING,
      dbKey: 'sortings',
    },
    brands: {
      title: 'Brand',
      options: brands,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'brands',
    },
    ages: {
      title: 'Age',
      options: ages,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'ages',
    },
    regions: {
      title: 'Region',
      options: regions,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'regions',
    },
    types: {
      title: 'Type',
      options: types,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'types',
    },
    abvs: {
      title: 'ABV',
      options: abvs,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'abvs',
    },
    caskTypes: {
      title: 'Cask Type',
      options: caskTypes,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'caskTypes',
    },
    specialNotes: {
      title: 'Special Notes',
      options: specialNotes,
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'specialNotes',
    },
  };

  return filterOptions;
}

export async function getManyWhiskeys(args: WhiskeyFilterArgs) {
  let response: Whiskey[] = await fetchData<Whiskey>('whiskeys');
  for (const arg in args) {
    if (arg !== 'sortings') {
      response = response.filter((whiskey) => {
        if (arg === 'brands') {
          return args.brands?.includes(whiskey.brand);
        }
        if (arg === 'ages') {
          return args.ages?.includes(whiskey.age.toString());
        }
        if (arg === 'regions') {
          return args.regions?.includes(whiskey.region);
        }
        if (arg === 'types') {
          return args.types?.includes(whiskey.type);
        }
        if (arg === 'abvs') {
          return args.abvs?.includes(whiskey.abv.toString());
        }
        if (arg === 'caskTypes') {
          return args.caskTypes?.includes(whiskey.caskType);
        }
        if (arg === 'specialNotes') {
          return args.specialNotes?.includes(whiskey.specialNote);
        }
        return true; // Default case if no matching arg is found
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

  let selectedSorting = sortings.options.find(
    (sorting) => sorting.value === args.sortings,
  );

  if (!selectedSorting) {
    selectedSorting = sortings.options.find(
      (sorting) => (sorting.value as WhiskeySorting) === WhiskeySorting.DEFAULT,
    );
  }

  if (selectedSorting) {
    selectedOptions.push({
      ...selectedSorting,
      filterKey: WhiskeyFilterKey.SORTING,
      dbKey: 'sortings',
    });
  }

  for (const brand of brands.options) {
    if (args.brands?.includes(brand.value)) {
      selectedOptions.push({
        ...brand,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'brands',
      });
    }
  }
  for (const age of ages.options) {
    if (args.ages?.includes(age.value)) {
      selectedOptions.push({
        ...age,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'ages',
      });
    }
  }
  for (const region of regions.options) {
    if (args.regions?.includes(region.value)) {
      selectedOptions.push({
        ...region,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'regions',
      });
    }
  }
  for (const type of types.options) {
    if (args.types?.includes(type.value)) {
      selectedOptions.push({
        ...type,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'types',
      });
    }
  }
  for (const abv of abvs.options) {
    if (args.abvs?.includes(abv.value)) {
      selectedOptions.push({
        ...abv,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'abvs',
      });
    }
  }
  for (const cask_type of caskTypes.options) {
    if (args.caskTypes?.includes(cask_type.value)) {
      selectedOptions.push({
        ...cask_type,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'caskTypes',
      });
    }
  }
  for (const special_note of specialNotes.options) {
    if (args.specialNotes?.includes(special_note.value)) {
      selectedOptions.push({
        ...special_note,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'specialNotes',
      });
    }
  }

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
