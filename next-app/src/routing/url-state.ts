import { WhiskeyFilterResponse } from '@/search/search-types';

export function decodeState(selectedOptions: WhiskeyFilterResponse['selectedOptions']): Record<string, string[]> {

    const result: Record<string, string[]> = {};

    for (const selectedOption of selectedOptions) {
        if (result[selectedOption.dbKey] === undefined) {
            result[selectedOption.dbKey] = [selectedOption.value];
        } else {
            result[selectedOption.dbKey].push(selectedOption.value);
        }
    }
    return result;
};

export function encodeState(dbKey: string, newValues: string[], values: Record<string, string[]>): [url: string, values: Record<string, string[]>] {

    if (newValues.length === 0) {
      delete values[dbKey];
    } else {
      values[dbKey] = newValues;
    }

    let urlString = '?';
    for (const [key, value] of Object.entries(values)) {
      for (const item of values[key]) {
        urlString += `${key}=${item}&`;
      }
    }
    urlString = urlString.slice(0, -1);

    return [urlString, values];
};

