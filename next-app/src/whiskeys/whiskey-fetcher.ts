import { getObjectById, fetchData } from '@/db/db-utils';
import { filterProducts, getManyWhiskeys } from '@/search/search-fetchers';
import { cache } from 'react';
import { Whiskey } from '@/common/object-types';

export const getManyWhiskeysByIds = cache(async (whiskeyIds: number[]) => {
  const whiskeys = await fetchData<Whiskey>('whiskeys');
  return whiskeys.filter((whiskey) => whiskeyIds.includes(whiskey.id));
});

export const getRelatedWhiskeysFlavour = cache(async (whiskeyId: number) => {
  const whiskey = await getObjectById<Whiskey>(whiskeyId, 'whiskeys');

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
  const whiskey = await getObjectById<Whiskey>(whiskeyId, 'whiskeys');

  if (!whiskey) return [];

  const { whiskeys } = await filterProducts({
    brands: [whiskey.brand],
    ages: [whiskey.age],
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
