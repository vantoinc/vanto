"use server";

import { prisma } from "@/utils/libs/prisma";
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
