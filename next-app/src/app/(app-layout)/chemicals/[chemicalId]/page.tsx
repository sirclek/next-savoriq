import { Id } from '@/common/common-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { getMetadata } from '@/seo/seo-utils';
import { Chemical } from '@/common/object-types';
import { getObjectById } from '@/db/db-utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type ChemicalPageProps = {
  params: {
  chemicalId: Id;
  };
};

export async function generateMetadata({
  params,
}: ChemicalPageProps): Promise<Metadata> {
  const chemical = await getObjectById<Chemical>(
    Number(params.chemicalId),
    'chemicals',
  );
  return getMetadata({
    title: chemical ? chemical.name : 'Chemical',
    pathname: `/chemicals/${params.chemicalId}`,
  });
}

export default async function ChemicalPage({ params }: ChemicalPageProps) {
  const chemical = await getObjectById<Chemical>(Number(params.chemicalId),'chemicals');

  if (!chemical) notFound();

  return (
    <>
      <Section>
        <Paper>
          <div className="flex flex-col gap-4">
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
                  <div className="text-2xl">{/* for text*/}</div>
                </div>
                <div className="text-sm">
                  <p>{chemical.description}</p>
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