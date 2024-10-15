import { filterProducts, getManyWhiskeys } from '@/search/search-fetchers';
import { cache } from 'react';

export const getOneWhiskeyById = cache(async (chemicalId: number) => {
  const chemicals = getManyWhiskeys({});
  for (const chemical of await chemicals) {
    if (chemical.id === chemicalId) return chemical;
  }
});

export const getManyWhiskeysByIds = cache(async (chemicalIds: number[]) => {
  const chemicals = await getManyWhiskeys({});
  return chemicals.filter((chemical) => chemicalIds.includes(chemical.id));
});

export const getRelatedWhiskeysFlavour = cache(async (chemicalId: number) => {
  const chemical = await getOneWhiskeyById(chemicalId);

  if (!chemical) return [];


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
