import { Price } from '@/common/price';
import { Skeleton } from '@/common/skeleton';
import { Tooltip } from '@/common/tooltip';
import { NextLink } from '@/routing/next-link';
import { routes } from '@/routing/routing-utils';
import Image from 'next/image';
import type { Chemical } from './chemical-types';

type ChemicalCardProps = {
  chemical: Chemical;
};

export function ChemicalCard({ chemical }: ChemicalCardProps) {
  // console.log('Chemical', chemical);
  return (
    <NextLink
      href={routes.chemical({ params: { chemicalId: chemical.id } })}
      // To show outline when the link is `focus-visible`.
      className="block"
    >
      <article className="group flex flex-col gap-2 rounded-md border-2 p-2 md:p-4">
        <div className="p-2">
          <div className="relative aspect-[12/10] bg-transparent transition duration-500 ease-out group-hover:scale-110">
            <Image
              className="rounded bg-white object-contain"
              src={`/images/chemicals/${chemical.id}.png`}
              alt={chemical.name}
              fill
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <Tooltip content={chemical.name}>
            <h3 className="text-sm font-bold fixed-leading-5 fixed-line-clamp-3">
              {chemical.name}
            </h3>
          </Tooltip>
          
        </div>
      </article>
    </NextLink>
  );
}

export function ChemicalCardSkeleton() {
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
