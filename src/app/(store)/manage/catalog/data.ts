import "server-only";

import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";

export async function getProducts(
  page: number = 1,
  itemsPerPage: number = 8,
): Promise<{ products: Product[]; total: number }> {
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
}
