export type Product = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  sku: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductSummary = {
  name: string;
  sku: string;
  price: number;
  description?: string;
};
