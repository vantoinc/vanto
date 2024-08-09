export type Product = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  sku: string;
  price: number;
  categoryId: number | null;
  variants: Variant[];
  Category: Category | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: number;
  name: string;
};

export type ProductSummary = Pick<
  Product,
  "name" | "sku" | "price" | "categoryId" | "variants"
> & {
  description?: string;
};

type Variant = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  product_id: number;
};
