import type { Chemical, Flavour, Whiskey } from '../common/object-types';
import { dataTypes, fetchData } from '../db/db-utils';

type ChartData = {
  id: number;
  name: string;
  subType: string;
  value: number;
};

export async function getGraphData(
  whiskey: Whiskey,
  dataType: dataTypes,
): Promise<ChartData[]> {
  const allData =
    dataType === dataTypes.CHEMICALS
      ? await fetchData<Chemical>(dataType)
      : await fetchData<Flavour>(dataType);

  return dataType === dataTypes.CHEMICALS
    ? whiskey.chemicals.map((value: number, i: number) => {
        const chemical = allData.find(
          (chemical) => chemical.id === i,
        ) as Chemical;
        return {
          id: chemical.id,
          name: chemical.name,
          subType: 'Chemical',
          value: value + 5,
        };
      })
    : whiskey.flavours.map((value: number, i: number) => {
        const flavour = allData.find((flavour) => flavour.id === i) as Flavour;
        return {
          id: flavour.id,
          name: flavour.name,
          subType: flavour.subType,
          value,
        };
      });
}
