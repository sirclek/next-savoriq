// import { Chip, ChipContent } from '@/common/chip';
import { Price } from '@/common/price';
// import { NextLink } from '@/routing/next-link';
// import { routes } from '@/routing/routing-utils';
import Image from 'next/image';
import type { Whiskey } from './product-types';
import { routes } from '@/routing/routing-utils';
import { ButtonLink } from '@/common/button-link';

type WhiskeyDetailsProps = {
  whiskey: Whiskey;
};

// handles the display of a product's details, including its image, title, price, description, and category. Activated when a user clicks on a product card.

export function WhiskeyDetails({ whiskey }: WhiskeyDetailsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
        <Image
          className="rounded bg-white object-contain"
          src={`/images/whiskeys/${whiskey.id}.png`}
          alt={whiskey.name}
          priority
          fill
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-3xl font-bold">{whiskey.name}</div>
          <div className="text-2xl">
            <Price className="text-primary" value={whiskey.price} />
          </div>
        </div>
        <div className="text-sm">{whiskey.description}</div>   
          
        {whiskey.aroma.map((aroma, index) => (          // aroma
          <p key={index} className='text-sm'>
            {aroma.flavour} - Intensity: {aroma.intensity}
          </p>
        ))}
        <div className='flex gap-4'>
        <ButtonLink variant="primary" href={routes.chemical()}>
          Chemical Profile
        </ButtonLink>
        <ButtonLink variant="primary" href={routes.explore()}>
          Flavour Profile
        </ButtonLink>
        </div>
      </div>
    </div>
  );
}
