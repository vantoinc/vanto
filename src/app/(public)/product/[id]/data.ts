import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";

export const singleProduct = (id: number): Promise<Product | null> => {
  return unstable_cache(
    async () => {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { Variant: true },
      });
      return product;
    },
    ["single-product", String(id)],
    { revalidate: 180, tags: [`single-product-${id}`] },
  )();
};
