"use server";

import { prisma } from "@/lib/prisma";
import { Category } from "@/types/product";
import { formProduct } from "@/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createProduct(data: z.infer<typeof formProduct>) {
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

export async function updateProduct(
  id: number,
  data: z.infer<typeof formProduct>,
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

export async function removeProduct(id: number) {
  await prisma.product.delete({ where: { id } });

  revalidatePath("/dashboard/catalog");
}

// Category

export async function createCategory(data: Pick<Category, "name">) {
  await prisma.category.create({ data });
  revalidatePath("/dashboard/catalog");
}
