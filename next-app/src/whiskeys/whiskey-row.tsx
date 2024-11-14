'use client';

import { createMockArray } from '@/common/common-utils';
import React, { useRef, useState, useEffect } from 'react';
import type { Whiskey } from '../common/custom-types';
import { WhiskeyCard, WhiskeyCardSkeleton } from './whiskey-card';

type WhiskeyRowShellProps = React.PropsWithChildren;

function WhiskeyRowShell({ children }: WhiskeyRowShellProps) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 700;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    if (rowRef.current) {
      setIsAtStart(rowRef.current.scrollLeft === 0);
      setIsAtEnd(rowRef.current.scrollWidth - rowRef.current.clientWidth === rowRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
    }
    return () => {
      if (rowRef.current) {
        rowRef.current.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="relative">
      {!isAtStart && (
        <button
          className="scroll-button left-0"
          onClick={() => scroll('left')}
        >
          &#8249;
        </button>
      )}
      <ul
        ref={rowRef}
        className="grid auto-cols-[minmax(180px,_1fr)] grid-flow-col gap-2 overflow-x-auto md:gap-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </ul>
      {!isAtEnd && (
        <button
          className="scroll-button right-0"
          onClick={() => scroll('right')}
        >
          &#8250;
        </button>
      )}
    </div>
  );
}

export default WhiskeyRowShell;

type WhiskeyRowProps = {
  whiskeys: Whiskey[];
  showSimilarity?: boolean;
};

export function WhiskeyRow({ whiskeys, showSimilarity = false }: WhiskeyRowProps) {
  return (
    <WhiskeyRowShell>
      {whiskeys.map((whiskey) => {
        return (
          <li key={whiskey.id} className="inline-block">
            <WhiskeyCard whiskey={whiskey} showSimilarity={showSimilarity} />
          </li>
        );
      })}
    </WhiskeyRowShell>
  );
}

type WhiskeyRowSkeletonProps = {
  itemCount: number;
};

export function WhiskeyRowSkeleton({ itemCount }: WhiskeyRowSkeletonProps) {
  return (
    <WhiskeyRowShell>
      {createMockArray(itemCount).map((i) => {
        return (
          <li key={i} className="inline-block">
            <WhiskeyCardSkeleton />
          </li>
        );
      })}
    </WhiskeyRowShell>
  );
}
