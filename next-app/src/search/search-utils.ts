import type { Maybe } from '@/common/common-types';
import type { WhiskeyFilterSelectedOption } from '@/search/search-types';

export enum WhiskeyFilterKey {
  SORTING = 'sorting',
  CATEGORIES = 'categories',
  PRICE_RANGES = 'priceRanges',
}

export enum WhiskeySorting {
  DEFAULT = 'default',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
}

function getOneSelectedOptionValue(
  filterKey: WhiskeyFilterKey,
  selectedOptions: Maybe<WhiskeyFilterSelectedOption[]>,
) {
  return selectedOptions?.find((option) => option.filterKey === filterKey)
    ?.value;
}

function getManySelectedOptionValues(
  filterKey: WhiskeyFilterKey,
  selectedOptions: Maybe<WhiskeyFilterSelectedOption[]>,
) {
  const values: string[] = [];

  for (const selectedOption of selectedOptions ?? []) {
    if (selectedOption.filterKey === filterKey) {
      values.push(selectedOption.value);
    }
  }

  return values;
}

export function getValuesOfSelectedOptions(
  selectedOptions: Maybe<WhiskeyFilterSelectedOption[]>,
) {
  const values = {
    [WhiskeyFilterKey.SORTING]: getOneSelectedOptionValue(
      WhiskeyFilterKey.SORTING,
      selectedOptions,
    ),
    [WhiskeyFilterKey.CATEGORIES]: getManySelectedOptionValues(
      WhiskeyFilterKey.CATEGORIES,
      selectedOptions,
    ),
    [WhiskeyFilterKey.PRICE_RANGES]: getManySelectedOptionValues(
      WhiskeyFilterKey.PRICE_RANGES,
      selectedOptions,
    ),
  };

  return values;
}
