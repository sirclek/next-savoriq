import { fetchData, dataTypes } from '../db/db-utils';
import { Flavour, Chemical, Whiskey } from '../common/object-types';

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

  if (dataType === dataTypes.CHEMICALS) {
    return whiskey.chemicals.map((value: number, i: number) => {
      const chemical = allData.find(
        (chemical) => chemical.id === i,
      ) as Chemical;
      return {
        id: chemical.id,
        name: chemical.name,
        subType: 'Chemical',
        value: value+5,
      };
    });
  } else {
    return whiskey.flavours.map((value: number, i: number) => {
      const flavour = allData.find((flavour) => flavour.id === i) as Flavour;
      return {
        id: flavour.id,
        name: flavour.name,
        subType: flavour.subType,
        value,
      };
    });
  }
}
