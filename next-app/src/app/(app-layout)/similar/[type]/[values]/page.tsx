import { WhiskeyMatching, type ChartData, type Chemical, type Flavour, type MatchType, type Whiskey } from '@/common/custom-types';
import { dataTypes, fetchData, getObjectById } from '@/db/db-utils';
import { matchWhiskeysDropFirst, matchWhiskeysKeepFirst } from '@/search/search-sorting';
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
};

export default async function SimilarWrapper({ params }: SimilarWrapperProps) {
  let masterWhiskey: Whiskey | undefined;

  const searchExistingWhiskey: boolean = !Number.isNaN(Number(params.values));

  if (searchExistingWhiskey) {
    masterWhiskey = await getObjectById<Whiskey>(Number(params.values), dataTypes.WHISKEYS);
  } else {
    const decodedData: b64Data = JSON.parse(Buffer.from(params.values.replaceAll(/-/g, '+').replaceAll(/_/g, '/'), 'base64').toString('utf8'));
    masterWhiskey = {
      id: decodedData.compId,
      name: 'Comparison Whiskey',
      flavours: decodedData.values,
      chemicals: decodedData.values,
    } as Whiskey;
  }
  const compWhiskey = searchExistingWhiskey ? await matchWhiskeysDropFirst(masterWhiskey, params.type, 10) : await matchWhiskeysKeepFirst(masterWhiskey, params.type, 10);

  const importData: Chemical[] | Flavour[] = params.type === WhiskeyMatching.CHEMICAL ? await fetchData<Chemical>(dataTypes.CHEMICALS) : await fetchData<Flavour>(dataTypes.FLAVOURS);
  const graphLabels: ChartData[] = importData
    .slice(0, params.type === WhiskeyMatching.CHEMICAL ? masterWhiskey.chemicals.length : masterWhiskey.flavours.length)
    .map((data) => ({ id: data.id, name: data.name, type: params.type, value: 0 }));
  return <SimilarPage masterWhiskey={masterWhiskey} compWhiskey={compWhiskey} type={params.type} graphLabels={graphLabels} />;
}
