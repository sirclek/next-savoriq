'use client';

import { Paper, PaperTitle } from '@/common/paper';
import { Checkbox, CheckboxGroup } from '@/forms/checkbox-group';
import { RadioGroup, RadioGroupItem } from '@/forms/radio-group';
import { decodeState, encodeState } from '@/routing/url-state';
import { WhiskeyFilterKey } from '@/search/search-sorting';
import type { WhiskeyFilterData, WhiskeyFilterResponse } from '@/search/search-types';
import { useRouter } from 'next/navigation';

type WhiskeyFilterProps = {
  data: WhiskeyFilterResponse;
};

export function WhiskeyFilter({ data }: WhiskeyFilterProps) {
  const router = useRouter();
  const values = decodeState(data.selectedOptions);

  const handleChange = (dbKey: WhiskeyFilterData['dbKey'], newValues: string[]) => {
    const [urlString] = encodeState(dbKey, newValues, values);

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
