import { createMockArray } from '@/common/common-utils';
import { ProductCardSkeleton, WhiskeyCard } from './product-card';
import type { Whiskey } from './product-types';

type ProductGridShellProps = React.PropsWithChildren;

function WhiskeyGridShell({ children }: ProductGridShellProps) {
  return (
    <ul className="grid gap-2 grid-cols-autofill-44 md:gap-4">{children}</ul>
  );
}

type WhiskeyGridProps = {
  whiskeys: Whiskey[];
};

export function WhiskeyGrid({ whiskeys }: WhiskeyGridProps) {
  console.log(whiskeys);
  return (
    <WhiskeyGridShell>
      {whiskeys.map((whiskey) => {
        return (
          <li key={whiskey.id}>
            <WhiskeyCard whiskey={whiskey} />
          </li>
        );
      })}
    </WhiskeyGridShell>
  );
}

type WhiskeyGridSkeletonProps = {
  itemCount: number;
};

export function WhiskeyGridSkeleton({ itemCount }: WhiskeyGridSkeletonProps) {
  return (
    <WhiskeyGridShell>
      {createMockArray(itemCount).map((i) => {
        return (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        );
      })}
    </WhiskeyGridShell>
  );
}
