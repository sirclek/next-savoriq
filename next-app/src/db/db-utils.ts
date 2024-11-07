import type { Id } from '@/common/common-types';
import { Chemical, Flavour, Whiskey } from '@/common/object-types';
import dbJson from './db.json';

export const getDb = async () => {
  return dbJson;
};

export enum dataTypes {
  WHISKEYS = 'whiskeys',
  FLAVOURS = 'flavours',
  CHEMICALS = 'chemicals',
}

const cache: { [key in dataTypes]?: any[] } = {};

export async function fetchData<T>(type: dataTypes): Promise<T[]> {
  if (cache[type]) {
    return cache[type] as T[];
  }

  const db = await getDb();

  let response: T[] = [];

  if (type === 'whiskeys') {
    response = db.whiskeys.map(mapWhiskeyData) as T[];
  } else if (type === 'flavours') {
    response = db.flavours.map(mapFlavourData) as T[];
  } else if (type === 'chemicals') {
    response = db.chemicals.map(mapChemicalData) as T[];
  } else {
    throw new Error('Unsupported data type');
  }

  cache[type] = response;

  return response;
}

export async function getObjectById<T extends { id: number | Id }>(
  Id: number | Id,
  type: dataTypes,
): Promise<T> {
  const data = await fetchData<T>(type);
  return data.find((item) => item.id === Id) as T;
}

// function for Whiskey mapping
function mapWhiskeyData(whiskey: any): Whiskey {
  return {
    id: whiskey.id,
    name: whiskey.name,
    brand: whiskey.brand,
    age: whiskey.age,
    region: whiskey.region,
    type: whiskey.type,
    abv: whiskey.abv,
    description: whiskey.description,
    price: whiskey.price,
    bottlingDate: whiskey.bottlingDate,
    caskType: whiskey.caskType,
    specialNote: whiskey.specialNotes,
    flavours: whiskey.flavourValues,
    chemicals: whiskey.chemicalValues,
  };
}

// function for Flavour mapping
function mapFlavourData(flavour: any): Flavour {
  return {
    id: flavour.id,
    subType: flavour.subType,
    name: flavour.name,
    description: flavour.description,
    title: flavour.title,
    chemicals: Object.keys(flavour.chemical).map((chem) => ({
      name: chem,
      value: flavour.chemical[chem as keyof typeof flavour.chemical] ?? 0,
    })),
  };
}

// function for Chemical mapping
function mapChemicalData(chemical: any): Chemical {
  return {
    id: chemical.id,
    name: chemical.name,
    description: chemical.description,
    title: chemical.title,
  };
}
