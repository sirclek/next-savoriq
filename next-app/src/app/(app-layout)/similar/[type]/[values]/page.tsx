import type { ChartData, Id, MatchType, Whiskey } from '@/common/custom-types';
import { dataTypes, getObjectById } from '@/db/db-utils';
import SimilarPage from '@/similar/similar-whiskeys';

export type SimilarWrapperProps = {
  params: {
    type: MatchType;
    values: string;
  };
};

type b64Data = {
  type: MatchType;
  compId: number;
  values: number[];
}

export default async function SimilarWrapper({ params }: SimilarWrapperProps) {
  let compWhiskey: Whiskey | undefined;

  const searchExistingWhiskey : boolean = !isNaN(Number(params.values));

  if (searchExistingWhiskey) {
    compWhiskey = await getObjectById<Whiskey>(Number(params.values) as Id, dataTypes.WHISKEYS);
  } else {
    const decodedData: b64Data = JSON.parse(Buffer.from(params.values.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8'));
    compWhiskey = {
      id: decodedData.compId,
      name: 'Comparison Whiskey',
      flavours: decodedData.values,
      chemicals: decodedData.values,
    } as Whiskey;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SimilarPage compWhiskey={compWhiskey} type={params.type} keepfirst={!searchExistingWhiskey} />
    </div>
  );
}
