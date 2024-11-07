import { Id } from '@/common/common-types';
import { Flavour } from '@/common/object-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { getObjectById } from '@/db/db-utils';
import { getMetadata } from '@/seo/seo-utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type FlavourPageProps = {
  params: {
    flavourId: Id | string | number;
  };
};

export async function generateMetadata({
  params,
}: FlavourPageProps): Promise<Metadata> {
  const flavour = await getObjectById<Flavour>(
    Number(params.flavourId),
    'flavours',
  );
  return getMetadata({
    title: flavour ? flavour.name : 'Flavour',
    pathname: `/flavours/${params.flavourId}`,
  });
}

export default async function FlavourPage({ params }: FlavourPageProps) {
  const flavour = await getObjectById<Flavour>(
    Number(params.flavourId),
    'flavours',
  );

  if (!flavour) notFound();

  return (
    <>
      <Section>
        <Paper>
          <div className="flex flex-col gap-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                <Image
                  className="rounded bg-white object-contain"
                  src={`/images/flavours/${flavour.id}.png`}
                  alt={flavour.name}
                  priority
                  fill
                />
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
