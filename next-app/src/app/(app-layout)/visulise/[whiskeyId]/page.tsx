import { Id } from '@/common/common-types';
import ChemicalVisualizePage from '@/radar/Radar-Visual';
import { getOneWhiskeyById } from '@/whiskeys/whiskey-fetcher';
import { notFound } from 'next/navigation';

export type ChemicalVisualizeWrapperProps = {
  params: {
    whiskeyId: Id;
  };
};

export default async function ChemicalVisualizeWrapper({
  params,
}: ChemicalVisualizeWrapperProps) {
  const whiskeyId = Number(params.whiskeyId);
  const whiskey = await getOneWhiskeyById(whiskeyId);

  if (!whiskey) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <ChemicalVisualizePage whiskey={whiskey} />
    </div>
  );
}