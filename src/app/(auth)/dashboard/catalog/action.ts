"use server";

import { writeFile } from "fs/promises";
import { revalidatePath, revalidateTag } from "next/cache";
import path from "path";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { generateToken } from "@/lib/utils";
import { formProduct } from "@/lib/validations";

export const uploadImage = async (data: FormData): Promise<string> => {
  const image = data.get("image") as File | null;

  if (!image) {
    throw new Error("Image no found");
  }

  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedMimeTypes.includes(image.type)) {
    throw new Error("Invalid image type");
  }

  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const extension = path.extname(image.name).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    throw new Error("Invalid file extension");
  }

  const safeFileName = generateToken(16) + extension;

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "upload");
  const filePath = path.join(uploadDir, safeFileName);
  await writeFile(filePath, buffer);

  return safeFileName;
};

export const createProduct = authActionClient
  .schema(formProduct.extend({ imageUrl: z.string().optional() }))
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

    revalidatePath("/dashboard/catalog");
  });

export const updateProduct = authActionClient
  .schema(formProduct.extend({ imageUrl: z.string().optional() }))
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

      revalidateTag("/dashboard/catalog");
    },
  );

export async function removeProduct(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } });

  revalidatePath("/dashboard/catalog");
}
