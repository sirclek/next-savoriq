import type { Nil } from './common-types';

export const APP_URL = 'https://next-shopper.vercel.app';
export const APP_TITLE = 'SavourIQ';
export const APP_DESCRIPTION = `${APP_TITLE} is the best, and most informative way, to learn more about your Whiskey profile.`;
export const APP_REPOSITORY_URL = 'https://github.com/sirclek/SavourIQ-V4';

export const createMockArray = (length: number) => {
  // eslint-disable-next-line unicorn/prefer-spread
  return Array.from(Array.from({ length }).keys());
};

export const isNil = (value: unknown): value is Nil => {
  return value === null || value === undefined;
};
