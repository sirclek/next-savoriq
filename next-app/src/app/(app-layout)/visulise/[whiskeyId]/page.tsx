import type { Id, Whiskey } from '@/common/custom-types';
import { dataTypes, getObjectById } from '@/db/db-utils';
import VisualizePage from '@/radar/radar-visual';
import { notFound } from 'next/navigation';

export type VisualiseWrapperProps = {
  params: {
    whiskeyId: Id;
  };
};

export default async function VisualiseWrapper({ params }: VisualiseWrapperProps) {

  const whiskey = await getObjectById<Whiskey>(params.whiskeyId, dataTypes.WHISKEYS);

  if (whiskey.id == -1) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <VisualizePage whiskey={whiskey} />
    </div>
  );
}
