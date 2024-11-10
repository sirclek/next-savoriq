import type { FilterDataType, WhiskeyFilterResponse } from '@/common/custom-types';

export function decodeState(selectedOptions: WhiskeyFilterResponse['selectedOptions']): Record<string, FilterDataType[]> {
  const result: Record<string, FilterDataType[]> = {};

  for (const selectedOption of selectedOptions) {
    result[selectedOption.dbKey] ??= [];
    result[selectedOption.dbKey].push(selectedOption.value);
  }
  return result;
}

export function encodeState(
  dbKey: string,
  newValues: FilterDataType[],
  values: Record<string, FilterDataType[]>,
): [url: string, values: Record<string, FilterDataType[]>] {
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
