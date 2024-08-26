"use server";

import { revalidateTag } from "next/cache";

import { prisma } from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { formPayment } from "@/lib/validations";

export const addPayment = authActionClient
  .schema(formPayment)
  .metadata({ name: "settings" })
  .action(async ({ parsedInput: params, ctx: { userId } }) => {
    await prisma.payment.upsert({
      create: {
        name: "Stripe",
        active: true,
        userId,
        ...params,
      },
      update: params,
      where: {
        name_userId: {
          name: "Stripe",
          userId,
        },
      },
    });

    revalidateTag(`settings_${userId}`);
  });
