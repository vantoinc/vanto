"use server";

import { prisma } from "@/lib/prisma";
import { formPayment, formStore } from "@/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateStoreProfile(data: z.infer<typeof formStore>) {
  await prisma.setting.update({ where: { id: 1 }, data });

  revalidatePath("/dashboard/settings");
}

export async function updatePayment(data: z.infer<typeof formPayment>) {
  const { payment } = data;

  await prisma.$transaction(
    payment.map((p) =>
      prisma.payment.update({
        where: { name: p.name },
        data: {
          active: p.active,
          description: p.description,
          api_key: p.api_key,
          private_key: p.private_key,
        },
      }),
    ),
  );

  revalidatePath("/dashboard/settings");
}
