import "server-only";

import { unstable_cache } from "next/cache";

import { withAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";

export const getProducts = (
  page: number = 1,
  itemsPerPage: number = 8,
): Promise<{ products: Product[]; total: number }> =>
  withAdmin((userId) => {
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
            where: {
              userId,
            },
          }),
          prisma.product.count({ where: { userId } }),
        ]);

        return { products, total };
      },
      ["products", userId],
      { revalidate: 180, tags: [`products_${userId}`] },
    )();
  });
