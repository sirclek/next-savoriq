import { Price } from '@/common/price';
import { Skeleton } from '@/common/skeleton';
import { Tooltip } from '@/common/tooltip';
import { NextLink } from '@/routing/next-link';
import { routes } from '@/routing/routing-utils';
import Image from 'next/image';
import type { Flavour } from '@/common/object-types';

type FlavourCardProps = {
  flavour: Flavour;
};

export function FlavourCard({ flavour }: FlavourCardProps) {
  // console.log('Flavour', flavour);
  return (
    <NextLink
      href={routes.flavour({ params: { flavourId: flavour.id } })}
      // To show outline when the link is `focus-visible`.
      className="block"
    >
      <article className="group flex flex-col gap-2 rounded-md border-2 p-2 md:p-4">
        <div className="p-2">
          <div className="relative aspect-[12/10] bg-transparent transition duration-500 ease-out group-hover:scale-110">
            <Image
              className="rounded bg-white object-contain"
              src={`/images/flavours/${flavour.id}.png`}
              alt={flavour.name}
              fill
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <Tooltip content={flavour.name}>
            <h3 className="text-sm font-bold fixed-leading-5 fixed-line-clamp-3">
              {flavour.name}
            </h3>
          </Tooltip>
          <div>
            <Price className="text-primary" value={flavour.price} />
          </div>
        </div>
      </article>
    </NextLink>
  );
}