"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { formPayment } from "@/lib/validations";

export async function addPayment(
  data: z.infer<typeof formPayment>,
): Promise<void | null> {
  const session = await auth();
  if (!session) return null;

  await prisma.payment.upsert({
    create: {
      name: "Stripe",
      active: true,
      userId: session.user.id,
      ...data,
    },
    update: data,
    where: {
      name_userId: {
        name: "Stripe",
        userId: session.user.id,
      },
    },
  });

  revalidatePath("/manage/settings");
}
