'use client';

import { createMockArray } from '@/common/common-utils';
import React, { useEffect, useRef, useState } from 'react';
import type { Whiskey, WhiskeyWithCustom } from '../common/custom-types';
import { WhiskeyCard, WhiskeyCardSkeleton } from './whiskey-card';

type WhiskeyLineShellProps = React.PropsWithChildren & {
  orientation: 'row' | 'column';
};

function WhiskeyLineShell({ children, orientation }: WhiskeyLineShellProps) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 600;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    if (rowRef.current) {
      if (orientation === 'row') {
        setIsAtStart(rowRef.current.scrollLeft === 0);
        setIsAtEnd(rowRef.current.scrollWidth - rowRef.current.clientWidth === rowRef.current.scrollLeft);
      } else {
        setIsAtStart(rowRef.current.scrollTop === 0);
        setIsAtEnd(rowRef.current.scrollHeight - rowRef.current.clientHeight === rowRef.current.scrollTop);
      }
    }
  };

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.addEventListener('scroll', checkScrollPosition);
    }
    return () => {
      if (rowRef.current) {
        rowRef.current.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [orientation]);

  return (
    <div className="relative">
      {!isAtStart && orientation === 'row' && (
        <button className="scroll-button left-0" onClick={() => { scroll('left') }}>
          &#8249;
        </button>
      )}
      <ul
        ref={rowRef}
        className={
          orientation === 'row'
            ? 'scrollbar-hide grid auto-cols-[minmax(220px,_1fr)] grid-flow-col gap-2 overflow-x-auto md:gap-4 overflow-y-hidden'
            : 'scrollbar-hide grid min-w-[100px] grid-flow-row gap-2 overflow-y-auto md:gap-4'
        }
        style={{ maxHeight: orientation === 'row' ? '45vh' : '80vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </ul>
      {!isAtEnd && orientation === 'row' && (
        <button className="scroll-button right-0" onClick={() => { scroll('right') }}>
          &#8250;
        </button>
      )}
    </div>
  );
}

export default WhiskeyLineShell;

type WhiskeyLineProps = {
  whiskeys: Whiskey[] | WhiskeyWithCustom[];
  showSimilarity?: boolean;
  showCustom?: boolean;
  orientation: 'row' | 'column';
};

export function WhiskeyRow({ whiskeys, showSimilarity = false, showCustom = false, orientation }: WhiskeyLineProps) {
  return (
    <WhiskeyLineShell orientation={orientation}>
      {whiskeys.map((whiskey) => {
        return (
          <li key={whiskey.id} className="inline-block">
            <WhiskeyCard whiskey={whiskey} showSimilarity={showSimilarity} showCustom={showCustom} orientation={orientation} />
          </li>
        );
      })}
    </WhiskeyLineShell>
  );
}

type WhiskeyLineSkeletonProps = {
  itemCount: number;
};

export function WhiskeyLineSkeleton({ itemCount }: WhiskeyLineSkeletonProps) {
  return (
    <WhiskeyLineShell orientation="row">
      {createMockArray(itemCount).map((i) => {
        return (
          <li key={i} className="inline-block">
            <WhiskeyCardSkeleton />
          </li>
        );
      })}
    </WhiskeyLineShell>
  );
}
