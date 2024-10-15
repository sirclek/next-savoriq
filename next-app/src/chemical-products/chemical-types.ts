import type { Id } from '@/common/common-types';

export type Chemical = {
  name: string;
  id: Id;
  nmae: string;
  category: {
    title: string;
    value: string;
  };
  description: string;
  image: string;
  title: string;
};
