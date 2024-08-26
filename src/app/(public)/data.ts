import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";

export const getAllProduct = (
  page: number = 1,
  itemsPerPage: number = 8,
): Promise<{ products: Product[]; total: number }> => {
  return unstable_cache(
    async () => {
      const [products, total] = await prisma.$transaction([
        prisma.product.findMany({
          include: {
            Variant: true,
          },
          orderBy: { id: "desc" },
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage,
        }),
        prisma.product.count(),
      ]);

      return { products, total };
    },
    ["products"],
    { revalidate: 180, tags: [`all_products`] },
  )();
};
