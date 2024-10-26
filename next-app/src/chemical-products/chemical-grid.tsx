import { createMockArray } from '@/common/common-utils';
import { ChemicalCard, ChemicalCardSkeleton } from './chemical-card';
import type { Chemical } from './chemical-types';

type ProductGridShellProps = React.PropsWithChildren;

function ChemicalGridShell({ children }: ProductGridShellProps) {
  return (
    <ul className="grid gap-2 grid-cols-autofill-44 md:gap-4">{children}</ul>
  );
}

type ChemicalGridProps = {
  chemicals: Chemical[];
};

export function ChemicalGrid({ chemicals }: ChemicalGridProps) {

  return (
    <ChemicalGridShell>
      {chemicals.map((chemical) => {
        return (
          <li key={chemical.id}>
            <ChemicalCard chemical={chemical} />
          </li>
        );
      })}
    </ChemicalGridShell>
  );
}

type ChemicalGridSkeletonProps = {
  itemCount: number;
};

export function ChemicalGridSkeleton({ itemCount }: ChemicalGridSkeletonProps) {
  return (
    <ChemicalGridShell>
      {createMockArray(itemCount).map((i) => {
        return (
          <li key={i}>
            <ChemicalCardSkeleton />
          </li>
        );
      })}
    </ChemicalGridShell>
  );
}
