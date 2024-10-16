import type { Whiskey } from '@/common/object-types';
import { getDb } from '@/db/db-utils';
import type {
  WhiskeyFilterArgs,
  WhiskeyFilterOptions,
  WhiskeyFilterResponse,
  WhiskeyFilterSelectedOption,
} from '@/search/search-types';
import { WhiskeyFilterKey, WhiskeySorting } from '@/search/search-utils';
import { cache } from 'react';

async function getProductFilterOptions() {
  const {
    sortings,
    brands,
    ages,
    regions,
    types,
    abvs,
    cask_types,
    special_notes,
  } = await getDb();

  const filterOptions: WhiskeyFilterOptions = {
    sortings: {
      title: 'Sorting',
      options: sortings.map((option, i) => ({ ...option, order: `0_${i}` })),
      filterKey: WhiskeyFilterKey.SORTING,
      dbKey: 'sortings',
    },
    brands: {
      title: 'Brand',
      options: brands.map((option, i) => ({ ...option, order: `1_${i}` })),
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'brands',
    },
    ages: {
      title: 'Age',
      options: ages.map((option, i) => ({ ...option, order: `2_${i}` })),
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'ages',
    },
    regions: {
      title: 'Region',
      options: regions.map((option, i) => ({ ...option, order: `3_${i}` })),
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'regions',
    },
    types: {
      title: 'Type',
      options: types.map((option, i) => ({ ...option, order: `4_${i}` })),
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'types',
    },
    abvs: {
      title: 'ABV',
      options: abvs.map((option, i) => ({ ...option, order: `5_${i}` })),
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'abvs',
    },
    cask_types: {
      title: 'Cask Type',
      options: cask_types.map((option, i) => ({ ...option, order: `6_${i}` })),
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'cask_types',
    },
    special_notes: {
      title: 'Special Notes',
      options: special_notes.map((option, i) => ({
        ...option,
        order: `7_${i}`,
      })),
      filterKey: WhiskeyFilterKey.CATEGORIES,
      dbKey: 'special_notes',
    },
  };

  return filterOptions;
}

export async function getManyWhiskeys(args: WhiskeyFilterArgs) {
  const db = await getDb();
  let response: Whiskey[] = db.whiskeys.map((whiskey) => ({
    ...whiskey,
    bottlingDate: whiskey.bottling_date || '',
    caskType: whiskey.cask_type || '',
    specialNote: whiskey.special_notes || '',
    age: parseInt(whiskey.age) || 0,
    aroma: Object.keys(whiskey.aroma).map((flavour) => ({
      flavour: flavour,
      intensity: whiskey.aroma[flavour as keyof typeof whiskey.aroma],
    })),
    taste: Object.keys(whiskey.taste).map((flavour) => ({
      flavour: flavour,
      intensity: whiskey.taste[flavour as keyof typeof whiskey.taste],
    })),
    finish: Object.keys(whiskey.finish).map((flavour) => ({
      flavour: flavour,
      intensity: whiskey.finish[flavour as keyof typeof whiskey.finish],
    })),
    compounds: Object.keys(whiskey.compounds).map((compound) => ({
      name: compound,
      value: whiskey.compounds[compound as keyof typeof whiskey.compounds] ?? 0,
    })),
  }));

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
        return true; // Default case if no matching arg is found
      });
    }
  }

  if (args.sortings) {
    switch (args.sortings as WhiskeySorting) {
      case WhiskeySorting.PRICE_ASC: {
        response.sort((a, b) => a.price - b.price);
        break;
      }
      case WhiskeySorting.PRICE_DESC: {
        response.sort((a, b) => b.price - a.price);
        break;
      }
    }
  }

  return response;
}

function getProductFilterSelectedOptions({
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
    cask_types,
    special_notes,
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
      isVisible:
        (selectedSorting.value as WhiskeySorting) !== WhiskeySorting.DEFAULT,
      filterKey: WhiskeyFilterKey.SORTING,
      dbKey: 'sortings',
    });
  }

  for (const brand of brands.options) {
    if (args.brands?.includes(brand.value)) {
      selectedOptions.push({
        ...brand,
        isVisible: true,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'brands',
      });
    }
  }
  for (const age of ages.options) {
    if (args.ages?.includes(age.value)) {
      selectedOptions.push({
        ...age,
        isVisible: true,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'ages',
      });
    }
  }
  for (const region of regions.options) {
    if (args.regions?.includes(region.value)) {
      selectedOptions.push({
        ...region,
        isVisible: true,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'regions',
      });
    }
  }
  for (const type of types.options) {
    if (args.types?.includes(type.value)) {
      selectedOptions.push({
        ...type,
        isVisible: true,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'types',
      });
    }
  }
  for (const abv of abvs.options) {
    if (args.abvs?.includes(abv.value)) {
      selectedOptions.push({
        ...abv,
        isVisible: true,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'abvs',
      });
    }
  }
  for (const cask_type of cask_types.options) {
    if (args.cask_types?.includes(cask_type.value)) {
      selectedOptions.push({
        ...cask_type,
        isVisible: true,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'cask_types',
      });
    }
  }
  for (const special_note of special_notes.options) {
    if (args.special_notes?.includes(special_note.value)) {
      selectedOptions.push({
        ...special_note,
        isVisible: true,
        filterKey: WhiskeyFilterKey.CATEGORIES,
        dbKey: 'special_notes',
      });
    }
  }

  return selectedOptions;
}

export const filterProducts = cache(
  async (args: WhiskeyFilterArgs): Promise<WhiskeyFilterResponse> => {
    const [filterOptions, whiskeys] = await Promise.all([
      getProductFilterOptions(),
      getManyWhiskeys(args),
    ]);

    const selectedOptions = getProductFilterSelectedOptions({
      filterOptions,
      args,
    });

    return { filterOptions, selectedOptions, whiskeys };
  },
);
