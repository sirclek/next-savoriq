import { WhiskeyMatching, WhiskeySorting, type Whiskey, type WhiskeyWithSimilarity, type Id } from '@/common/custom-types';
import { dataTypes, fetchData } from '@/db/db-utils';


export function sortWhiskeys(whiskeys: Whiskey[], sorting: WhiskeySorting) {
  switch (sorting) {
    case WhiskeySorting.PRICE_ASC: {
      return whiskeys.sort((a, b) => a.price - b.price);
    }
    case WhiskeySorting.PRICE_DESC: {
      return whiskeys.sort((a, b) => b.price - a.price);
    }
    case WhiskeySorting.ALC_ASC: {
      return whiskeys.sort((a, b) => a.abv - b.abv);
    }
    case WhiskeySorting.ALC_DESC: {
      return whiskeys.sort((a, b) => b.abv - a.abv);
    }
    case WhiskeySorting.AGE_ASC: {
      return whiskeys.sort((a, b) => a.age - b.age);
    }
    case WhiskeySorting.AGE_DESC: {
      return whiskeys.sort((a, b) => b.age - a.age);
    }

    default: {
      return whiskeys.sort((a, b) => a.id - b.id);
    }
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export async function matchWhiskeysDropFirst(masterWhiskey: Partial<Whiskey>, matchType: WhiskeyMatching, returnMaxCount: number) : Promise<WhiskeyWithSimilarity[]> {
  return matchWhiskeys(masterWhiskey, matchType, returnMaxCount, false);
}

export async function matchWhiskeysKeepFirst(masterWhiskey: Partial<Whiskey>, matchType: WhiskeyMatching, returnMaxCount: number) : Promise<WhiskeyWithSimilarity[]> {
  return matchWhiskeys(masterWhiskey, matchType, returnMaxCount, true);
}


async function matchWhiskeys(masterWhiskey: Partial<Whiskey>, matchType: WhiskeyMatching, returnMaxCount: number, keepFirst: boolean): Promise<WhiskeyWithSimilarity[]> {
  let whiskeyData = await fetchData<WhiskeyWithSimilarity>(dataTypes.WHISKEYS);
  switch (matchType) {
    case WhiskeyMatching.FLAVOUR: {
      whiskeyData = whiskeyData
        .map((whiskey) => ({
          ...whiskey,
          similarity: Math.max(0, Math.min(1, Number(cosineSimilarity(masterWhiskey.flavours ?? [], whiskey.flavours ?? []).toFixed(5)))),
        }))
        .sort((a, b) => b.similarity - a.similarity);
      break;
    }
    case WhiskeyMatching.CHEMICAL: {
      whiskeyData = whiskeyData
        .map((whiskey) => ({
          ...whiskey,
          similarity: Math.max(0, Math.min(1, Number(cosineSimilarity(masterWhiskey.chemicals ?? [], whiskey.chemicals ?? []).toFixed(5)))),
        }))
        .sort((a, b) => b.similarity - a.similarity);
      break;
    }
    default: {
      [];
    }
  }

  return whiskeyData.slice(keepFirst ? 0 : 1, Math.min(returnMaxCount + (keepFirst ? 0 : 1), whiskeyData.length));
}

export async function matchValues(Id: Id, matchType: WhiskeyMatching, returnMaxCount: number) {
  let whiskeyData = await fetchData<Whiskey>(dataTypes.WHISKEYS);

  switch (matchType) {
    case WhiskeyMatching.FLAVOUR: {
      whiskeyData = whiskeyData.sort((a, b) => b.flavours[Id] - a.flavours[Id]);
      break;
    }
    case WhiskeyMatching.CHEMICAL: {
      whiskeyData = whiskeyData.sort((a, b) => b.chemicals[Id] - a.chemicals[Id]);
      break;
    }
    default: {
      [];
    }
  }
  return whiskeyData.slice(0, Math.min(returnMaxCount, whiskeyData.length));
}
