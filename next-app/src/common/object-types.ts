import type { Id } from '@/common/common-types';

export type Product = {
  id: Id;
  category: {
    title: string;
    value: string;
  };
  description: string;
  image: string;
  price: number;
  title: string;
};

export type Chemical = {
  id: number;
  name: string;
  description: string;
  image: string;
  title: string;
}

export type Flavour = {
  id: number;
  subType: string;
  name: string;
  description: string;
  title: string;
  chemicals: {
    name: string;
    value: number;
  }[];
};

export type Whiskey = {
  id: number;
  name: string;
  brand: string;
  age: string;
  region: string;
  type: string;
  abv: number;
  description: string;
  aroma: {
    flavour: string;
    intensity: number;
  }[];
  taste: {
    flavour: string;
    intensity: number;
  }[];
  finish: {
    flavour: string;
    intensity: number;
  }[];
  compounds: {
    name: string;
    value: number;
  }[];
  price: number;
  bottlingDate: string;
  caskType: string;
  specialNote: string;
};


