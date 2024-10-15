'use client';

import { createSafeContext } from '@/common/safe-context';
import { produce } from 'immer';
import { useOptimistic } from 'react';
import type {
  WhiskeyFilterResponse,
  WhiskeyFilterSelectedOption,
} from './search-types';
import { WhiskeyFilterKey, WhiskeySorting } from './search-utils';

type SelectedOptionsContextValue = {
  optimisticSelectedOptions: WhiskeyFilterSelectedOption[];
  setOptimisticSelectedOptions: (
    selectedOptions: WhiskeyFilterSelectedOption[],
  ) => void;
};

const [SelectedOptionsContext, useSelectedOptionsContext] =
  createSafeContext<SelectedOptionsContextValue>({
    displayName: 'SelectedOptionsContext',
  });

export { useSelectedOptionsContext };

type SelectedOptionsProviderProps = React.PropsWithChildren<{
  data: WhiskeyFilterResponse;
}>;

export function SelectedOptionsProvider({
  data,
  children,
}: SelectedOptionsProviderProps) {
  const [optimisticData, setOptimisticSelectedOptions] = useOptimistic(
    data,
    (state, newSelectedOptions: WhiskeyFilterSelectedOption[]) => {
      return produce(state, (draft) => {
        draft.selectedOptions = newSelectedOptions;

        const hasSorting = draft.selectedOptions.some(
          (option) => option.filterKey === WhiskeyFilterKey.SORTING,
        );

        if (!hasSorting) {
          draft.selectedOptions.push({
            filterKey: WhiskeyFilterKey.SORTING,
            isVisible: false,
            title: 'Sorting',
            value: WhiskeySorting.DEFAULT,
            order: '0_0',
          });
        }
      });
    },
  );

  return (
    <SelectedOptionsContext.Provider
      value={{
        optimisticSelectedOptions: optimisticData.selectedOptions,
        setOptimisticSelectedOptions,
      }}
    >
      {children}
    </SelectedOptionsContext.Provider>
  );
}
