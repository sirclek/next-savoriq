import type { Flavour, Id } from '@/common/custom-types';
import { Paper } from '@/common/paper';
import { Section } from '@/common/section';
import { dataTypes, getObjectById } from '@/db/db-utils';
import { getMetadata } from '@/seo/seo-utils';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type FlavourPageProps = {
  params: {
    flavourId: Id;
  };
};

export async function generateMetadata({ params }: FlavourPageProps): Promise<Metadata> {
  const flavour = await getObjectById<Flavour>(Number(params.flavourId), dataTypes.FLAVOURS);
  return getMetadata({
    title: flavour.name,
    pathname: `/flavours/${params.flavourId}`,
  });
}

export default async function FlavourPage({ params }: FlavourPageProps) {
  const flavour = await getObjectById<Flavour>(Number(params.flavourId), dataTypes.FLAVOURS);

  if (flavour.id === -1) notFound();

  return (
    <>
      <Section>
        <Paper>
          <div className="flex flex-col gap-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                <Image className="rounded bg-white object-contain" src={`/images/flavours/${flavour.id}.png`} alt={flavour.name} priority fill />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-3xl font-bold">{flavour.name}</div>
                  <div className="text-2xl">{/* for text*/}</div>
                </div>
                <div className="text-sm">
                  <p>{flavour.description}</p>
                </div>
                <div className="text-sm">
                  {flavour.chemicals.map((chemical, index) => (
                    <p key={index}>
                      {chemical.name}: {chemical.value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Section>

      <Section></Section>
    </>
  );
}
