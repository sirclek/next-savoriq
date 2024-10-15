// import { Chip, ChipContent } from '@/common/chip';
import { Price } from '@/common/price';
// import { NextLink } from '@/routing/next-link';
// import { routes } from '@/routing/routing-utils';
import Image from 'next/image';
import type { Chemical } from './chemical-types';
import { routes } from '@/routing/routing-utils';
import { ButtonLink } from '@/common/button-link';

type ChemicalDetailsProps = {
  chemical: Chemical;
};

// handles the display of a product's details, including its image, title, price, description, and category. Activated when a user clicks on a product card.

export function ChemicalDetails({ chemical }: ChemicalDetailsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
        <Image
          className="rounded bg-white object-contain"
          src={`/images/chemicals/${chemical.id}.png`}
          alt={chemical.name}
          priority
          fill
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-3xl font-bold">{chemical.name}</div>
        </div>
        <div className="text-sm">{chemical.description}</div>
      </div>
    </div>
  );
}
