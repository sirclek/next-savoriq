import type { Id } from '@/common/common-types';
import { Chemical, Flavour, Whiskey } from '@/common/object-types';
import dbJson from './db.json';

export const getDb = async () => {
  return dbJson;
};

type inputTypes = 'whiskeys' | 'flavours' | 'chemicals';

const cache: { [key in inputTypes]?: any[] } = {};

export async function fetchData<T>(type: inputTypes): Promise<T[]> {
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
  type: inputTypes,
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
      value: whiskey.compounds[compound as keyof typeof whiskey.compounds] ?? 0,
    })),
    price: whiskey.price,
    bottlingDate: whiskey.bottlingDate,
    caskType: whiskey.caskType,
    specialNote: whiskey.specialNote,
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
    chemicals: flavour.chemicals.map((chemical: any) => ({
      name: chemical.name,
      value: chemical.value,
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
