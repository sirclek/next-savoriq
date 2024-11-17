import { Price } from '@/common/price';
import { Information } from '@/common/information';
import { ButtonLink } from '@/common/button-link';
import { dataTypes, fetchData } from '@/db/db-utils';
import { routes } from '@/routing/routing-utils';
import Image from 'next/image';
import { type Flavour, type Whiskey, WhiskeyMatching } from '../common/custom-types';

type WhiskeyDetailsProps = {
  whiskey: Whiskey;
};

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
            <Information className="text-primary" value={` | ${whiskey.abv}% ABV`} />
          </div>
        </div>
        <div className="text-sm">{whiskey.description}</div>

        <div className="grid grid-cols-2 gap-3">
          {flavours.slice(0, 12).map((flavour, i) => (
            <p key={i} className="text-sm">
              <a href={`/flavours/${flavour.name}`} className="text-blue-500 hover:underline">
                {flavour.name}
              </a>{' '}
              - Intensity: {whiskey.flavours[i]}
            </p>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <ButtonLink
            variant="primary"
            prefetch={true}
            href={routes.visulise(whiskey.id)}
            style={{
              justifyContent: 'center',
              width: '100%',
              padding: '1% 5%',
              borderRadius: '10px',
              transition: 'transform 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            Visualise
          </ButtonLink>
          <ButtonLink
            variant="primary"
            prefetch={true}
            href={routes.similar({ params: { type: WhiskeyMatching.FLAVOUR, values: whiskey.id } })}
            style={{
              justifyContent: 'center',
              width: '100%',
              padding: '1% 5%',
              borderRadius: '10px',
              transition: 'transform 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            Similar by Flavours
          </ButtonLink>
          <ButtonLink
            variant="primary"
            prefetch={true}
            href={routes.similar({ params: { type: WhiskeyMatching.CHEMICAL, values: whiskey.id } })}
            style={{
              justifyContent: 'center',
              width: '100%',
              padding: '1% 5%',
              borderRadius: '10px',
              transition: 'transform 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            Similar by Chemicals
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
