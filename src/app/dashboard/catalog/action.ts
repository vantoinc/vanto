"use server";

import { prisma } from "@/utils/libs/prisma";
import { ProductSummary } from "@/utils/types/product";
import { formSchema } from "@/utils/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createProduct(value: z.infer<typeof formSchema>) {
  await prisma.product.create({ data: value });
  revalidatePath("/dashboard/catalog");
}

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { id: "desc" },
  });
}

export async function updateProduct(id: number, value: ProductSummary) {
  await prisma.product.update({ where: { id }, data: value });
  revalidatePath("/dashboard/catalog");
}
