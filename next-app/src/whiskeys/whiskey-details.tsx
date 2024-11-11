// import { Chip, ChipContent } from '@/common/chip';
import { Price } from '@/common/price';
// import { NextLink } from '@/routing/next-link';
// import { routes } from '@/routing/routing-utils';
import { ButtonLink } from '@/common/button-link';
import { dataTypes, fetchData } from '@/db/db-utils';
import { routes } from '@/routing/routing-utils';
import Image from 'next/image';
import type { Flavour, Whiskey } from '../common/custom-types';

type WhiskeyDetailsProps = {
  whiskey: Whiskey;
};

// handles the display of a product's details, including its image, title, price, description, and category. Activated when a user clicks on a product card.

export async function WhiskeyDetails({ whiskey }: WhiskeyDetailsProps) {
  const flavours = await fetchData<Flavour>(dataTypes.FLAVOURS);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
        <Image className="rounded bg-white object-contain" src={`/images/whiskeys/${whiskey.id}.png`} alt={whiskey.name} priority fill />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-3xl font-bold">{whiskey.name}</div>
          <div className="text-2xl">
            <Price className="text-primary" value={whiskey.price} />
          </div>
        </div>
        <div className="text-sm">{whiskey.description}</div>

        {flavours.slice(0, 4).map((flavour, i) => (
          <p key={i} className="text-sm">
            {flavour.name} - Intensity: {whiskey.flavours[i]}
          </p>
        ))}

        <div className="flex justify-center gap-4">
          <ButtonLink
            variant="primary"
            prefetch={true}
            href={routes.visulise(whiskey.id)}
            style={{
              justifyContent: 'center',
              width: '100%',
              padding: '1% 40%',
              borderRadius: '10px',
              transition: 'transform 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            Visulise
          </ButtonLink>
          <ButtonLink
            variant="primary"
            prefetch={true}
            href={routes.flavour()}
            style={{
              justifyContent: 'center',
              width: '100%',
              padding: '1% 40%',
              borderRadius: '10px',
              transition: 'transform 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            See Similar
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
