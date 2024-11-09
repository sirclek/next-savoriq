import type { Id } from "./common-types";

export type Flavour = {
  id: number;
  subType: string;
  name: string;
  description: string;
  title: string;
  chemicals: {
    name: string;
    value: string;
  }[];
};

export type Chemical = {
  id: number;
  name: string;
  description: string;
  title: string;
};

export type Whiskey = {
  id: Id;
  name: string;
  brand: string;
  age: string;
  region: string;
  type: string;
  abv: number;
  description: string;
  price: number;
  bottlingDate: string;
  caskType: string;
  specialNote: string;
  flavours: number[];
  chemicals: number[];
};
