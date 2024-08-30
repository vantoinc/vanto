import "server-only";

import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";

export const singleProduct = async (id: number): Promise<Product | null> => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { Variant: true },
  });

  return product;
};
