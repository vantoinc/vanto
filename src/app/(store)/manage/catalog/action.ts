"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Category } from "@/types/product";
import { formProduct } from "@/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createProduct(
  data: z.infer<typeof formProduct>,
): Promise<void> {
  const session = await auth();
  if (!session) return;
  const userId = session.user.id;

  const { variants, ...productData } = data;
  await prisma.product.create({
    data: {
      userId,
      ...productData,
      Variant: {
        create: variants.map((variant) => ({
          name: variant.name,
          quantity: variant.quantity,
          price: variant.price,
        })),
      },
    },
    include: { Variant: true },
  });
  revalidatePath("/dashboard/catalog");
}

export async function updateProduct(
  id: number,
  data: z.infer<typeof formProduct>,
): Promise<void> {
  const { variants, ...productData } = data;
  await prisma.$transaction(async (tx) => {
    const product = await tx.product.update({
      where: { id },
      data: productData,
    });

    await tx.variant.deleteMany({
      where: { productId: id },
    });

    if (variants.length > 0) {
      await tx.variant.createMany({
        data: variants.map((variant) => ({
          name: variant.name,
          quantity: variant.quantity,
          price: variant.price,
          productId: id,
        })),
      });
    }

    return product;
  });

  revalidatePath("/dashboard/catalog");
}

export async function removeProduct(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } });

  revalidatePath("/dashboard/catalog");
}

// Category

export async function createCategory(
  data: Pick<Category, "name">,
): Promise<void> {
  const session = await auth();
  if (!session) return;
  const userId = session.user.id;

  await prisma.category.create({ data: { userId, ...data } });
  revalidatePath("/dashboard/catalog");
}
