import { getDb } from '@/db/db-utils';
import type { Product } from '@/products/product-types';
import type {
  ProductFilterArgs,
  ProductFilterOptions,
  ProductFilterResponse,
  ProductFilterSelectedOption,
} from '@/search/search-types';
import { ProductFilterKey, ProductSorting } from '@/search/search-utils';
import { cache } from 'react';

async function getProductFilterOptions() {
  const { sortings, brands, ages, regions, types, abvs, cask_types, special_notes} = await getDb();

  const filterOptions: ProductFilterOptions = {
    sortings: {
      title: 'Sorting',
      options: sortings.map((option, i) => ({ ...option, order: `0_${i}` })),
      filterKey: ProductFilterKey.SORTING,
    },
    brand: {
      title: 'Brand',
      options: brands.map((option, i) => ({ ...option, order: `1_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },
    age: {
      title: 'Age',
      options: ages.map((option, i) => ({ ...option, order: `2_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },
    region: {
      title: 'Region',
      options: regions.map((option, i) => ({ ...option, order: `3_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },
    type: {
      title: 'Type',
      options: types.map((option, i) => ({ ...option, order: `4_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },
    abv: {
      title: 'ABV',
      options: abvs.map((option, i) => ({ ...option, order: `5_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },
    cask_type: {
      title: 'Cask Type',
      options: cask_types.map((option, i) => ({ ...option, order: `6_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },
    special_notes: {
      title: 'Special Notes',
      options: special_notes.map((option, i) => ({ ...option, order: `7_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },

  };

  return filterOptions;
}

async function getManyProducts(args: ProductFilterArgs) {
  const db = await getDb();
  let response: Product[] = [...db.products];

  if (args.categories?.length) {
    response = response.filter((product) =>
      args.categories?.includes(product.category.value),
    );
  }

  if (args.priceRanges?.length) {
    const productsInPriceRanges: Product[] = [];

    for (const priceRange of args.priceRanges) {
      const [minPriceText, maxPriceText] = priceRange.split('-');
      const minPrice = Number(minPriceText);
      const maxPrice =
        maxPriceText === 'max'
          ? Number.POSITIVE_INFINITY
          : Number(maxPriceText);
      productsInPriceRanges.push(
        ...response.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice,
        ),
      );
    }

    response = productsInPriceRanges;
  }

  if (args.sorting) {
    switch (args.sorting as ProductSorting) {
      case ProductSorting.PRICE_ASC: {
        response.sort((a, b) => a.price - b.price);
        break;
      }
      case ProductSorting.PRICE_DESC: {
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
  filterOptions: ProductFilterOptions;
  args: ProductFilterArgs;
}) {
  const { sortings, brands, ages, regions, types, abvs, cask_types, special_notes} = filterOptions;
  const selectedOptions: ProductFilterSelectedOption[] = [];

  let selectedSorting = sortings.options.find(
    (sorting) => sorting.value === args.sorting,
  );

  if (!selectedSorting) {
    selectedSorting = sortings.options.find(
      (sorting) => (sorting.value as ProductSorting) === ProductSorting.DEFAULT,
    );
  }

  if (selectedSorting) {
    selectedOptions.push({
      ...selectedSorting,
      isVisible:
        (selectedSorting.value as ProductSorting) !== ProductSorting.DEFAULT,
      filterKey: ProductFilterKey.SORTING,
    });
  }
  // for (const brand of brands.options) {
  //   if (args.brand?.includes(brand.value)) {
  //     selectedOptions.push({
  //       ...brand,
  //       isVisible: true,
  //       filterKey: ProductFilterKey.CATEGORIES,
  //     });
  //   }
  // }

  // for (const priceRange of priceRanges.options) {
  //   if (args.priceRanges?.includes(priceRange.value)) {
  //     selectedOptions.push({
  //       ...priceRange,
  //       isVisible: true,
  //       filterKey: ProductFilterKey.PRICE_RANGES,
  //     });
  //   }
  // }

  return selectedOptions;
}

export const filterProducts = cache(
  async (args: ProductFilterArgs): Promise<ProductFilterResponse> => {
    const [filterOptions, products] = await Promise.all([
      getProductFilterOptions(),
      getManyProducts(args),
    ]);

    const selectedOptions = getProductFilterSelectedOptions({
      filterOptions,
      args,
    });

    return { filterOptions, selectedOptions, products };
  },
);
