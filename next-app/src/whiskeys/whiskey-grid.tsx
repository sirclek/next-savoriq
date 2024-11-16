import React from 'react';
import { createMockArray } from '@/common/common-utils';
import type { Whiskey } from '../common/custom-types';
import { WhiskeyCard, WhiskeyCardSkeleton } from './whiskey-card';

type ProductGridShellProps = React.PropsWithChildren;

function WhiskeyGridShell({ children }: ProductGridShellProps) {
  const gridTemplateColumns = `repeat(4, minmax(0, 1fr))`;
  return (
    <ul className="grid gap-2 md:gap-4" style={{ gridTemplateColumns }}>
      {children}
    </ul>
  );
}

type WhiskeyGridProps = {
  whiskeys: Whiskey[];
};

export function WhiskeyGrid({ whiskeys }: WhiskeyGridProps) {
  return (
    <WhiskeyGridShell>
      {whiskeys.map((whiskey) => {
        return (
          <li key={whiskey.id}>
            <WhiskeyCard whiskey={whiskey}/>
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
            <WhiskeyCardSkeleton />
          </li>
        );
      })}
    </WhiskeyGridShell>
  );
}
