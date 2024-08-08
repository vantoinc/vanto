export type Product = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  sku: string;
  price: number;
  variants: Variant[];
  createdAt: Date;
  updatedAt: Date;
};

export type ProductSummary = {
  name: string;
  sku: string;
  price: number;
  description?: string;
  variants: Variant[];
};

type Variant = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  product_id: number;
};
