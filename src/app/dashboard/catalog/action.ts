"use server";

import { prisma } from "@/utils/libs/prisma";
import { Product, ProductSummary } from "@/utils/types/product";
import { formSchema } from "@/utils/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createProduct(value: z.infer<typeof formSchema>) {
  await prisma.product.create({ data: value });
  revalidatePath("/dashboard/catalog");
}

export async function getProducts(
  page: number = 1,
  itemsPerPage: number = 8,
): Promise<{ products: Product[]; total: number }> {
  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      orderBy: { id: "desc" },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.product.count(),
  ]);

  return { products, total };
}

export async function updateProduct(id: number, value: ProductSummary) {
  await prisma.product.update({ where: { id }, data: value });
  revalidatePath("/dashboard/catalog");
}
