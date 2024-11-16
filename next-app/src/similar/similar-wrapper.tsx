import { WhiskeyMatching, type ChartData, type Chemical, type Flavour, type Id, type MatchType, type Whiskey } from '@/common/custom-types';
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

export default async function SimilarWrapperServer({ params }: SimilarWrapperProps) {
  let masterWhiskey: Whiskey | undefined;

  const searchExistingWhiskey: boolean = !isNaN(Number(params.values));

  if (searchExistingWhiskey) {
    masterWhiskey = await getObjectById<Whiskey>(Number(params.values) as Id, dataTypes.WHISKEYS);
  } else {
    const decodedData: b64Data = JSON.parse(Buffer.from(params.values.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8'));
    masterWhiskey = {
      id: decodedData.compId,
      name: 'Comparison Whiskey',
      flavours: decodedData.values,
      chemicals: decodedData.values,
    } as Whiskey;
  }
  const compWhiskey = searchExistingWhiskey ? await matchWhiskeysDropFirst(masterWhiskey, params.type, 10) : await matchWhiskeysKeepFirst(masterWhiskey, params.type, 10);

  const graphLabels: ChartData[] = (params.type === WhiskeyMatching.CHEMICAL ? (await fetchData<Chemical>(dataTypes.CHEMICALS)).slice(0,masterWhiskey.chemicals.length) : (await fetchData<Flavour>(dataTypes.FLAVOURS)).slice(0,masterWhiskey.flavours.length)).map((data) => ({id: data.id, name: data.name, type: params.type, value: 0}));

  return <SimilarPage masterWhiskey={masterWhiskey} compWhiskey={compWhiskey} type={params.type} graphLabels={graphLabels}/>;
}
