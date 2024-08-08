"use server";

import { prisma } from "@/lib/prisma";
import { formStore } from "@/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getSettings() {
  const settings = await prisma.setting.findFirst();
  return settings;
}

export async function updateStoreProfile(data: z.infer<typeof formStore>) {
  await prisma.setting.update({ where: { id: 1 }, data });

  revalidatePath("/dashboard/settings");
}
