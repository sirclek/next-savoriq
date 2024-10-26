import dbJson from './db.json';
import type { Id } from '@/common/common-types';

export const getDb = async () => {
  return dbJson;
};

type inputTypes = 'whiskeys' | 'flavours' | 'chemicals';


export async function fetchData<T>(type: inputTypes): Promise<T[]> {

  const db = await getDb();

  let response: T[] = [];

  switch (type) {
    case 'whiskeys':
      response = db.whiskeys.map((whiskey) => ({
        id: whiskey.id,
        name: whiskey.name,
        brand: whiskey.brand,
        age: whiskey.age,
        region: whiskey.region,
        type: whiskey.type,
        abv: whiskey.abv,
        description: whiskey.description,
        aroma: Object.keys(whiskey.aroma).map((flavour) => ({
          flavour: flavour,
          intensity: whiskey.aroma[flavour as keyof typeof whiskey.aroma],
        })),
        taste: Object.keys(whiskey.taste).map((flavour) => ({
          flavour: flavour,
          intensity: whiskey.taste[flavour as keyof typeof whiskey.taste],
        })),
        finish: Object.keys(whiskey.finish).map((flavour) => ({
          flavour: flavour,
          intensity: whiskey.finish[flavour as keyof typeof whiskey.finish],
        })),
        compounds: Object.keys(whiskey.compounds).map((compound) => ({
          name: compound,
          value:
            whiskey.compounds[compound as keyof typeof whiskey.compounds] ?? 0,
        })),
        price: whiskey.price,
        bottlingDate: whiskey.bottlingDate,
        caskType: whiskey.caskType,
        specialNote: whiskey.specialNote,
      })) as T[];
      break;
    case 'flavours':
      response = db.flavours.map((flavour) => ({
        ...flavour,
        chemicals: Object.keys(flavour.chemical).map((chemical) => ({
          name: chemical,
          value: flavour.chemical[chemical as keyof typeof flavour.chemical],
        })),
      })) as T[];
      break;
    case 'chemicals':
      // TBC CHEMICAL DATABASE
      break;
  }

  return response;
}

export async function getObjectById<T extends { id: number | Id }>(Id: number | Id, type: inputTypes): Promise<T> {
  return (await fetchData<T>(type)).find((item) => item.id === Id) as T;
};
