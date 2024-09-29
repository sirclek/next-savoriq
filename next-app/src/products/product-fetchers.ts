import type { Id } from '@/common/common-types';
import { getDb } from '@/db/db-utils';
import { filterProducts } from '@/search/search-fetchers';
import { cache } from 'react';

export const getOneWhiskeyById = cache(async (whiskeyId: Id) => {
  const db = await getDb();
  const whiskey = db.whiskeys.find((whiskey) => whiskey.id === whiskeyId);
  return whiskey;
});

export const getManyWhiskeysByIds = cache(async (whiskeyIds: Id[]) => {
  const db = await getDb();
  const whiskeys = db.whiskeys.filter((whiskey) =>
    whiskeyIds.includes(whiskey.id),
  );
  return whiskeys;
});

export const getRelatedWhiskeys = cache(async (whiskeyId: Id) => {
  const whiskey = await getOneWhiskeyById(whiskeyId);

  if (!whiskey) return [];

  const { whiskeys } = await filterProducts({
    brand: [whiskey.brand],
    age: [whiskey.age.toString()],
    region: [whiskey.region],
    type: [whiskey.type], 
    abv: [whiskey.abv.toString()],
    cask_type: [whiskey.cask_type],
    special_note: [whiskey.special_notes]
  });

  const relatedWhiskeys = whiskeys.filter(
    (relatedWhiskey) => relatedWhiskey.id !== whiskey.id,
  );

  return relatedWhiskeys;
});
