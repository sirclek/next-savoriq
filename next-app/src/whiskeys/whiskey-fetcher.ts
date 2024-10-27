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
    brands: [whiskey.brand],
    ages: [whiskey.age.toString()],
    regions: [whiskey.region],
    types: [whiskey.type],
    abvs: [whiskey.abv.toString()],
    caskTypes: [whiskey.caskType],
    specialNotes: [whiskey.specialNote],
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
    brands: [whiskey.brand],
    ages: [whiskey.age.toString()],
    regions: [whiskey.region],
    types: [whiskey.type],
    abvs: [whiskey.abv.toString()],
    caskTypes: [whiskey.caskType],
    specialNotes: [whiskey.specialNote],
  });

  const relatedWhiskeys = whiskeys.filter(
    (relatedWhiskey) => relatedWhiskey.id !== whiskey.id,
  );

  return relatedWhiskeys;
});
