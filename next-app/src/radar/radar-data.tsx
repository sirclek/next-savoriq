import { type ChartData, type Chemical, type Flavour, type Whiskey, type MatchType, WhiskeyMatching } from '../common/custom-types';
import { dataTypes, fetchData } from '../db/db-utils';

export async function getGraphData(whiskey: Whiskey, dataType: dataTypes): Promise<ChartData[]> {
  const allData = dataType === dataTypes.CHEMICALS ? await fetchData<Chemical>(dataType) : await fetchData<Flavour>(dataType);

  return dataType === dataTypes.CHEMICALS
    ? whiskey.chemicals.map((value: number, i: number) => {
        const chemical = allData.find((chemical) => chemical.id === i) as Chemical;
        return {
          id: chemical.id,
          name: chemical.name,
          type: WhiskeyMatching.CHEMICAL,
          value: value + 5,
        };
      })
    : whiskey.flavours.map((value: number, i: number) => {
        const flavour = allData.find((flavour) => flavour.id === i) as Flavour;
        return {
          id: flavour.id,
          name: flavour.name,
          type: WhiskeyMatching.FLAVOUR,
          value,
        };
      });
}
