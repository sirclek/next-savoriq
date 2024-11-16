import type { Nil } from './custom-types';

export const APP_URL = 'https://savorIQ.vercel.app';
export const APP_TITLE = 'SavorIQ';
export const APP_DESCRIPTION = `${APP_TITLE} is the best, and most informative way, to learn more about your Whiskey profile.`;
export const APP_REPOSITORY_URL = 'https://github.com/sirclek/next-savouriq';
export const APP_LOGO_PATH = 'next-app/public/images/image_assets/logo.png';

export const createMockArray = (length: number) => {
  // eslint-disable-next-line unicorn/prefer-spread
  return Array.from(Array.from({ length }).keys());
};

export const isNil = (value: unknown): value is Nil => {
  return value === null || value === undefined;
};
