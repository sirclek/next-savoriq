'use client';

import { Information } from '@/common/information';
import { Price } from '@/common/price';
import { Similarity } from '@/common/similarity';
import { Skeleton } from '@/common/skeleton';
import { Tooltip } from '@/common/tooltip';
import { NextLink } from '@/routing/next-link';
import { routes } from '@/routing/routing-utils';
import { useHover } from '@/similar/similar-context';
import Image from 'next/image';
import { useState } from 'react';
import type { Whiskey, WhiskeyWithCustom } from '../common/custom-types';

type WhiskeyCardProps = {
  whiskey: Whiskey | WhiskeyWithCustom;
  onLoad?: () => void;
  showSimilarity?: boolean;
  showCustom?: boolean;
  orientation?: 'row' | 'column';
};

export function WhiskeyCard({ whiskey, onLoad, showSimilarity = false, showCustom = false, orientation = 'row' }: WhiskeyCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  let setHoveredWhiskeyId;
  let setLastHoveredWhiskeyId;

  try {
    const hoverContext = useHover();
    setHoveredWhiskeyId = hoverContext.setHoveredWhiskeyId;
    setLastHoveredWhiskeyId = hoverContext.setLastHoveredWhiskeyId;
  } catch (error) {
    setHoveredWhiskeyId = () => {};
    setLastHoveredWhiskeyId = () => {};
  }

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  const handleMouseEnter = () => {
    setHoveredWhiskeyId(whiskey.id);
    setLastHoveredWhiskeyId(whiskey.id);
  };

  const handleMouseLeave = () => {
    setHoveredWhiskeyId(null);
  };

  return (
    <NextLink href={routes.whiskey({ params: { whiskeyId: whiskey.id } })} className="block">
      <article
        className={`group flex ${orientation === 'column' ? 'flex-row' : 'flex-col'} max-h-[400px] gap-2 rounded-md border-2 p-2 md:p-4 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ height: orientation === 'row' ? '100%' : 'auto' }}
      >
        {orientation === 'row' ? (
          <>
            <div className="p-2">
                    <div className="flex justify-center">
                    <div className="relative h-28 w-28 bg-transparent transition duration-500 ease-out group-hover:scale-110">
                      <Image className="rounded bg-white object-contain" src={`/images/whiskeys/${whiskey.id}.png`} alt={whiskey.name} layout="fill" onLoad={handleImageLoad} />
                    </div>
                    </div>
            </div>
            <div className="flex w-full flex-col gap-0 text-center">
              <Tooltip content={whiskey.name}>
                <h3 className="text-sm font-bold fixed-leading-5 fixed-line-clamp-3">{whiskey.name}</h3>
              </Tooltip>
              <div>
                <Price className="text-primary" value={whiskey.price} />
                <Information className="text-primary" value={` | ${whiskey.abv}% ABV`} />
              </div>
              <div>{`${whiskey.age == 0 ? 'No Age' : whiskey.age + ' Years Old'}`}</div>
              <div>
                <strong>{whiskey.caskType}</strong>
              </div>
              {'similarity' in whiskey && showSimilarity && (
                <div>
                  <Similarity value={whiskey.similarity} />
                </div>
              )}
              {'custom' in whiskey && showCustom && (
                <div>
                  <Information value={whiskey.custom} />
                </div>
              )}
            </div>
          </>
        ) : orientation === 'column' ? (
          <>
            <div className="max-h-[100px] flex-shrink-0 p-2">
              <div className="relative h-24 w-24 bg-transparent transition duration-500 ease-out group-hover:scale-110">
                <Image className="rounded bg-white object-contain" src={`/images/whiskeys/${whiskey.id}.png`} alt={whiskey.name} layout="fill" onLoad={handleImageLoad} />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 text-left">
              <Tooltip content={whiskey.name}>
                <h3 className="overflow-hidden whitespace-nowrap text-lg font-bold leading-tight group-hover:overflow-auto">{whiskey.name}</h3>
              </Tooltip>
              <div>
                <Information className="text-primary" value={`${whiskey.abv}% ABV | ${whiskey.age == 0 ? 'No Age' : whiskey.age + ' Years Old'}`} />
              </div>
              {'similarity' in whiskey && showSimilarity && (
                <div>
                  <Similarity value={whiskey.similarity} />
                </div>
              )}
            </div>
          </>
        ) : null}
      </article>
    </NextLink>
  );
}

export function WhiskeyCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-md border-2 p-2 md:p-4">
      <div className="p-2">
        <Skeleton className="aspect-[12/10]" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex w-full flex-col items-center gap-1">
          <Skeleton className="h-4 w-full max-w-[theme(spacing.28)]" />
          <Skeleton className="h-4 w-full max-w-[theme(spacing.36)]" />
          <Skeleton className="h-4 w-full max-w-[theme(spacing.28)]" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}
