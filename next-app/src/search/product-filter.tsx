'use client';

import { Paper, PaperTitle } from '@/common/paper';
import { Checkbox, CheckboxGroup } from '@/forms/checkbox-group';
import { RadioGroup, RadioGroupItem } from '@/forms/radio-group';
import type {
  WhiskeyFilterData,
  WhiskeyFilterResponse,
} from '@/search/search-types';
import { WhiskeyFilterKey } from '@/search/search-utils';
import { usePathname, useRouter } from 'next/navigation';

type WhiskeyFilterProps = {
  data: WhiskeyFilterResponse;
};

export function WhiskeyFilter({ data }: WhiskeyFilterProps) {
  const router = useRouter();
  console.log('selected', data.selectedOptions);
  const state = usePathname();

  const decodeState = (
    state: string | undefined,
  ): Record<string, string | string[]> => {
    const params = new URLSearchParams(state);
    const result: Record<string, string | string[]> = {};
    console.log('params', params);
    for (const [key, value] of params) {
      result[key] = value.split(',');
    }

    return result;
  };

  const values = decodeState(state);

  const handleChange = (
    filterKey: WhiskeyFilterData['dbKey'],
    newValues: string[],
  ) => {
    values[filterKey] = newValues;
    let urlString = '?';
    for (const [key, value] of Object.entries(values)) {
      urlString += `${key}=${value}&`;
    }
    urlString = urlString.slice(0, -1);
    router.push(`/search${urlString}`);
  };

  return (
    <div data-pending={true} className="flex flex-col gap-4 pb-6">
      {Object.values(data.filterOptions).map((filter) => {
        let filterInput = null;

        switch (filter.filterKey) {
          case WhiskeyFilterKey.SORTING: {
            filterInput = (
              <RadioGroup
                value={values[filter.dbKey]?.[0] ?? undefined}
                onChange={(newValue) => {
                  handleChange(filter.dbKey, [newValue]);
                }}
              >
                {filter.options.map((option) => {
                  return (
                    <RadioGroupItem key={option.value} value={option.value}>
                      {option.title}
                    </RadioGroupItem>
                  );
                })}
              </RadioGroup>
            );
            break;
          }
          default: {
            filterInput = (
              <CheckboxGroup
                value={
                  Array.isArray(values[filter.dbKey])
                    ? (values[filter.dbKey] as string[]).flat()
                    : [values[filter.dbKey]]
                }
                onChange={(newValue) => {
                  handleChange(filter.dbKey, newValue);
                }}
              >
                {filter.options.map((option) => {
                  return (
                    <Checkbox key={option.value} value={option.value}>
                      {option.title}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            );
          }
        }

        return (
          <div key={filter.filterKey}>
            <PaperTitle>{filter.title}</PaperTitle>
            <Paper>{filterInput}</Paper>
          </div>
        );
      })}
    </div>
  );
}
