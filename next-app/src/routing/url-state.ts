import type { WhiskeyFilterResponse } from '@/search/search-types';

export function decodeState(
  selectedOptions: WhiskeyFilterResponse['selectedOptions'],
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const selectedOption of selectedOptions) {
    result[selectedOption.dbKey] ??= [];
    result[selectedOption.dbKey].push(selectedOption.value);
  }
  return result;
}

export function encodeState(
  dbKey: string,
  newValues: string[],
  values: Record<string, string[]>,
): [url: string, values: Record<string, string[]>] {
  let updatedValues = { ...values };

  if (newValues.length === 0) {
    const { [dbKey]: _, ...remainingValues } = updatedValues;
    updatedValues = remainingValues;
  } else {
    updatedValues[dbKey] = newValues;
  }


  const urlString = Object.entries(updatedValues)
    .flatMap(([key, items]) => items.map((item) => `${key}=${item}`))
    .join('&');

  return [`?${urlString}`, updatedValues];
}
