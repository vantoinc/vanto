export type Dates = {
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  sku: string;
  price: number;
  categoryId: number | null;
  storeId: number;
  Category: Category | null;
  Variant: Variant[];
} & Dates;

export type Category = {
  id: number;
  name: string;
  storeId: number;
} & Dates;

export type ProductSummary = Pick<
  Product,
  "name" | "sku" | "price" | "categoryId" | "Variant"
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
