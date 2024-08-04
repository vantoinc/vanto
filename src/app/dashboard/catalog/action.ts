"use server";

import { prisma } from "@/utils/libs/prisma";
import { Product } from "@/utils/types/product";
import { formSchema } from "@/utils/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createProduct(data: z.infer<typeof formSchema>) {
  const { variants, ...productData } = data;
  await prisma.product.create({
    data: {
      ...productData,
      variants: {
        create: variants.map((variant) => ({
          name: variant.name,
          quantity: variant.quantity,
          price: variant.price,
        })),
      },
    },
    include: { variants: true },
  });
  revalidatePath("/dashboard/catalog");
}

export async function getProducts(
  page: number = 1,
  itemsPerPage: number = 8,
): Promise<{ products: Product[]; total: number }> {
  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      include: {
        variants: true,
      },
      orderBy: { id: "desc" },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.product.count(),
  ]);

  return { products, total };
}

export async function updateProduct(
  id: number,
  data: z.infer<typeof formSchema>,
) {
  const { variants, ...productData } = data;
  await prisma.$transaction(async (tx) => {
    const product = await tx.product.update({
      where: { id },
      data: productData,
    });

    await tx.variant.deleteMany({
      where: { product_id: id },
    });

    if (variants.length > 0) {
      await tx.variant.createMany({
        data: variants.map((variant) => ({
          name: variant.name,
          quantity: variant.quantity,
          price: variant.price,
          product_id: id,
        })),
      });
    }

    return product;
  });

  revalidatePath("/dashboard/catalog");
}
