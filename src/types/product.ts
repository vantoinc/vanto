export type Dates = {
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  stock: number;
  theme: "opta" | "optb" | "optc";
  userId: string;
  Variant: Variant[];
} & Dates;

export type ProductSummary = Pick<
  Product,
  "name" | "price" | "stock" | "theme" | "Variant"
> & {
  description?: string;
};

type Variant = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  productId: number;
};

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
