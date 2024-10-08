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

  const state = usePathname();

  const decodeState = (
    selectedOptions: WhiskeyFilterResponse['selectedOptions'],
  ): Record<string, string[]> => {
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

  const values = decodeState(data.selectedOptions);
  // console.log(values);
  const handleChange = (
    dbKey: WhiskeyFilterData['dbKey'],
    newValues: string[],
  ) => {

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

    router.push(`/search${urlString}`);
  };

  return (
    <div data-pending={false} className="flex flex-col gap-4 pb-6">
      {Object.values(data.filterOptions).map((filter) => {
        let filterInput = null;

        switch (filter.filterKey) {
          case WhiskeyFilterKey.SORTING: {
            filterInput = (
              <RadioGroup
                value={values[filter.dbKey].at(0) as string}
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
                value={values[filter.dbKey] ?? []}
                
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
