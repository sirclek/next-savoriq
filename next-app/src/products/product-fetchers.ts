import { filterProducts, getManyWhiskeys } from '@/search/search-fetchers';
import { cache } from 'react';

export const getOneWhiskeyById = cache(async (whiskeyId: number) => {
  const whiskeys = getManyWhiskeys({});
  for (const whiskey of await whiskeys) {
    if (whiskey.id === whiskeyId) return whiskey;
  }
});

export const getManyWhiskeysByIds = cache(async (whiskeyIds: number[]) => {
  const whiskeys = await getManyWhiskeys({});
  return whiskeys.filter((whiskey) => whiskeyIds.includes(whiskey.id));
});

export const getRelatedWhiskeysFlavour = cache(async (whiskeyId: number) => {
  const whiskey = await getOneWhiskeyById(whiskeyId);

  if (!whiskey) return [];

  const { whiskeys } = await filterProducts({
    brand: [whiskey.brand],
    age: [whiskey.age.toString()],
    region: [whiskey.region],
    type: [whiskey.type],
    abv: [whiskey.abv.toString()],
    cask_type: [whiskey.caskType],
    special_note: [whiskey.specialNote],
  });

  const relatedWhiskeys = whiskeys.filter(
    (relatedWhiskey) => relatedWhiskey.id !== whiskey.id,
  );

  return relatedWhiskeys;
});

export const getRelatedWhiskeysChemicals = cache(async (whiskeyId: number) => {
  const whiskey = await getOneWhiskeyById(whiskeyId);

  if (!whiskey) return [];

  const { whiskeys } = await filterProducts({
    brand: [whiskey.brand],
    age: [whiskey.age.toString()],
    region: [whiskey.region],
    type: [whiskey.type],
    abv: [whiskey.abv.toString()],
    cask_type: [whiskey.caskType],
    special_note: [whiskey.specialNote],
  });

  const relatedWhiskeys = whiskeys.filter(
    (relatedWhiskey) => relatedWhiskey.id !== whiskey.id,
  );

  return relatedWhiskeys;
});
