import type { Whiskey } from '@/common/object-types';
import { dataTypes, fetchData } from '@/db/db-utils';

export enum WhiskeyFilterKey {
  SORTING = 'sorting',
  CATEGORIES = 'categories',
}

export enum WhiskeySorting {
  DEFAULT = 'default',
  ALC_ASC = 'alc-asc',
  ALC_DESC = 'alc-desc',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
  AGE_ASC = 'age-asc',
  AGE_DESC = 'age-desc',
}

export enum WhiskeyMatching {
  FLAVOUR = 'flavour',
  CHEMICAL = 'chemical',
}

export function sortWhiskeys(whiskeys: Whiskey[], sorting: string) {
  switch (sorting) {
    case WhiskeySorting.PRICE_ASC:
      return whiskeys.sort((a, b) => a.price - b.price);

    case WhiskeySorting.PRICE_DESC:
      return whiskeys.sort((a, b) => b.price - a.price);

    case WhiskeySorting.ALC_ASC:
      return whiskeys.sort((a, b) => a.abv - b.abv);

    case WhiskeySorting.ALC_DESC:
      return whiskeys.sort((a, b) => b.abv - a.abv);

    case WhiskeySorting.AGE_ASC:
      return whiskeys.sort((a, b) => a.age - b.age);

    case WhiskeySorting.AGE_DESC:
      return whiskeys.sort((a, b) => b.age - a.age);

    default:
      return whiskeys.sort((a, b) => a.id - b.id);
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export async function matchWhiskeys(masterWhiskey: Whiskey, matchType: WhiskeyMatching, returnMaxCount: number) {
  let whiskeyData = await fetchData<Whiskey>(dataTypes.WHISKEYS);

  switch (matchType) {
    case WhiskeyMatching.FLAVOUR:
      whiskeyData = whiskeyData
        .map((whiskey) => ({
          ...whiskey,
          similarity: cosineSimilarity(masterWhiskey.flavours, whiskey.flavours),
        }))
        .sort((a, b) => b.similarity - a.similarity);
      break;

    case WhiskeyMatching.CHEMICAL:
      whiskeyData = whiskeyData
        .map((whiskey) => ({
          ...whiskey,
          similarity: cosineSimilarity(masterWhiskey.chemicals, whiskey.chemicals),
        }))
        .sort((a, b) => b.similarity - a.similarity);
      break;

    default:
      [];
  }
  // whiskeyData.forEach(whiskey => {
  //   console.log(matchType, { id: whiskey.id, name: whiskey.name, similarity: whiskey.similarity });
  // });
  return whiskeyData.slice(1, Math.min(returnMaxCount + 1, whiskeyData.length));
}
