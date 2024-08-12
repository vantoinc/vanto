import { Category, Dates, Product } from "./product";

export type Store = {
  id: number;
  name: string;
  description: string;
  userId: string;
  token: string;
  Payment: Payment[];
  Taxe: Taxe[];
  Product: Product[];
  Category: Category[];
} & Dates;

export type Payment = {
  id: number;
  name: string;
  active: boolean;
  description: string | null;
  apiKey: string | null;
  privateKey: string | null;
  urlCallback: string | null;
  storeId: number;
} & Dates;

export type Taxe = {
  id: number;
  country: string;
  rate: number;
  storeId: number;
} & Dates;
