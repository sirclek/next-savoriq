import type { Id } from '@/common/common-types';
import type { Chemical, Flavour, Whiskey } from '@/common/object-types';
import type { WhiskeyFilterOptionItem } from '@/search/search-types';
import dbJson from './db.json'; // Adjust the path to where your db object is defined

const getDb = async () => {
  return await dbJson;
};

export enum dataTypes {
  WHISKEYS = 'whiskeys',
  FLAVOURS = 'flavours',
  CHEMICALS = 'chemicals',
}

export type categoryData = {
  sortings: WhiskeyFilterOptionItem[];
  brands: WhiskeyFilterOptionItem[];
  ages: WhiskeyFilterOptionItem[];
  regions: WhiskeyFilterOptionItem[];
  types: WhiskeyFilterOptionItem[];
  abvs: WhiskeyFilterOptionItem[];
  caskTypes: WhiskeyFilterOptionItem[];
  specialNotes: WhiskeyFilterOptionItem[];
}

const cache: { [key in dataTypes]?: Whiskey[] | Flavour[] | Chemical[] } = {};

export async function fetchCategories(): Promise<categoryData> {
  const db = await getDb();
  const { sortings, brands, ages, regions, types, abvs, caskTypes, specialNotes } = db;
  return { sortings, brands, ages, regions, types, abvs, caskTypes, specialNotes } as categoryData;
}

export async function fetchData<T>(type: dataTypes): Promise<T[]> {
  if (cache[type]) {
    return cache[type] as T[];
  }

  const db = await getDb();

  let response: T[] = [];
  switch (type) {
    case dataTypes.WHISKEYS: {
      response = db.whiskeys.map((whiskey) => mapWhiskeyData(whiskey)) as T[];
      break;
    }
    case dataTypes.FLAVOURS: {
      response = db.flavours.map((flavour) => mapFlavourData(flavour)) as T[];
      break;
    }
    case dataTypes.CHEMICALS: {
      response = db.chemicals.map((chemical) => mapChemicalData(chemical)) as T[];
      break;
    }
    default: {
      throw new Error('Unsupported data type');
    }
  }

  cache[type] = response as Whiskey[] | Flavour[] | Chemical[];

  return response;
}

export async function getObjectById<T extends { id: Id }>(
  Id: Id,
  type: dataTypes,
): Promise<T> {
  const data = await fetchData<T>(type);
  const foundObject = data.find((item) => item.id === Id);
  
  if (foundObject) {
    return foundObject;
  }

  return { id: -1, ...Object.fromEntries(Object.keys(data[0]).map(key => [key as keyof T, null])) } as T;
}


/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

// function for Whiskey mapping
function mapWhiskeyData(whiskey: any): Whiskey {
  return {
    id: whiskey.id as Id,
    name: whiskey.name as string,
    brand: whiskey.brand as string,
    age: whiskey.age as string,
    region: whiskey.region as string,
    type: whiskey.type as string,
    abv: whiskey.abv as number,
    description: whiskey.description as string,
    price: whiskey.price as number,
    bottlingDate: whiskey.bottlingDate as string,
    caskType: whiskey.caskType as string,
    specialNote: whiskey.specialNote as string,
    flavours: whiskey.flavours as number[],
    chemicals: whiskey.chemicals as number[],
  };
}

// function for Flavour mapping
function mapFlavourData(flavour: any): Flavour {
  return {
    id: flavour.id as Id,
    subType: flavour.subType as string,
    name: flavour.name as string,
    description: flavour.description as string,
    title: flavour.title as string,
    chemicals: Object.keys(flavour.chemical).map((chem) => ({
      name: chem,
      value: flavour.chemical[chem as keyof typeof flavour.chemical] ?? 0,
    })) as { name: string; value: string }[],
  };
}

// function for Chemical mapping
function mapChemicalData(chemical: any): Chemical {
  return {
    id: chemical.id as Id,
    name: chemical.name as string,
    description: chemical.description as string,
    title: chemical.title as string,
  };
}
