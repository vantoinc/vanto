"use server";

import { prisma } from "@/utils/libs/prisma";
import { formSchema } from "@/utils/types/validations";
import { z } from "zod";

export async function createProduct(value: z.infer<typeof formSchema>) {
  await prisma.product.create({ data: value });
}
