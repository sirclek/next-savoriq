import { createMockArray } from '@/common/common-utils';
import { ProductCardSkeleton, WhiskeyCard } from './product-card';
import type { Whiskey } from './product-types';

type ProductGridShellProps = React.PropsWithChildren;

function ProductGridShell({ children }: ProductGridShellProps) {
  return (
    <ul className="grid gap-2 grid-cols-autofill-44 md:gap-4">{children}</ul>
  );
}

type WhiskeyGridProps = {
  whiskeys: Whiskey[];
};

export function WhiskeyGrid({ whiskeys }: WhiskeyGridProps) {
  return (
    <ProductGridShell>
      {whiskeys.map((whiskey) => {
        return (
          <li key={whiskey.id}>
            <WhiskeyCard whiskey={whiskey} />
          </li>
        );
      })}
    </ProductGridShell>
  );
}

type ProductGridSkeletonProps = {
  itemCount: number;
};

export function ProductGridSkeleton({ itemCount }: ProductGridSkeletonProps) {
  return (
    <ProductGridShell>
      {createMockArray(itemCount).map((i) => {
        return (
          <li key={i}>
            <ProductCardSkeleton />
          </li>
        );
      })}
    </ProductGridShell>
  );
}
