"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { formProduct } from "@/lib/validations";

export async function createProduct(
  data: z.infer<typeof formProduct>,
): Promise<void> {
  const session = await auth();
  if (!session) return;
  const userId = session.user.id;

  const { Variant, ...productData } = data;
  await prisma.product.create({
    data: {
      userId,
      ...productData,
      Variant: {
        create: Variant.map((variant) => ({
          name: variant.name,
          quantity: variant.quantity,
          price: variant.price,
        })),
      },
    },
    include: { Variant: true },
  });
  revalidatePath("/manage/catalog");
}

export async function updateProduct(
  id: number,
  data: z.infer<typeof formProduct>,
): Promise<void> {
  const { Variant, ...productData } = data;
  await prisma.$transaction(async (tx) => {
    const product = await tx.product.update({
      where: { id },
      data: productData,
    });

    await tx.variant.deleteMany({
      where: { productId: id },
    });

    if (Variant.length > 0) {
      await tx.variant.createMany({
        data: Variant.map((variant) => ({
          name: variant.name,
          quantity: variant.quantity,
          price: variant.price,
          productId: id,
        })),
      });
    }

    return product;
  });

  revalidatePath("/manage/catalog");
}

export async function removeProduct(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } });

  revalidatePath("/manage/catalog");
}
