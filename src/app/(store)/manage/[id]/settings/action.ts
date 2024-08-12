"use server";

import { prisma } from "@/lib/prisma";
import { formPayment, formStore } from "@/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateStoreProfile(
  data: z.infer<typeof formStore>,
): Promise<void> {
  await prisma.store.update({ where: { id: 1 }, data });

  revalidatePath("/dashboard/settings");
}

export async function updatePayment(
  data: z.infer<typeof formPayment>,
): Promise<void> {
  const { payment } = data;

  await prisma.$transaction(
    payment.map((p) =>
      prisma.payment.update({
        where: { name: p.name },
        data: {
          active: p.active,
          description: p.description,
          apiKey: p.api_key,
          privateKey: p.private_key,
        },
      }),
    ),
  );

  revalidatePath("/dashboard/settings");
}
