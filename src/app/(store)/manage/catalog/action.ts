"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { formProduct } from "@/lib/validations";

export const createProduct = authActionClient
  .schema(formProduct)
  .metadata({ name: "create-product" })
  .action(async ({ parsedInput: params, ctx: { userId } }) => {
    const { Variant, ...productData } = params;
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
  });

export const updateProduct = authActionClient
  .schema(formProduct)
  .metadata({ name: "update-product" })
  .bindArgsSchemas<[id: z.ZodNumber]>([z.number()])
  .action(
    async ({
      parsedInput: params,
      bindArgsParsedInputs: [id],
      ctx: { userId },
    }) => {
      const { Variant, ...productData } = params;

      await prisma.$transaction(async (tx) => {
        const product = await tx.product.update({
          where: { id, userId },
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
    },
  );

export async function removeProduct(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } });

  revalidatePath("/manage/catalog");
}
