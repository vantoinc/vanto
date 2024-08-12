"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formStore } from "@/types/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createStore(
  data: z.infer<typeof formStore>,
): Promise<void | null> {
  const session = await auth();
  if (!session || !session.user) return null;

  await prisma.store.create({
    data: {
      userId: session.user.id,
      ...data,
      Payment: {
        create: [
          {
            name: "Paypal",
            active: false,
            description: "pay with Paypal",
          },
          {
            name: "Stripe",
            active: false,
            description: "pay with Stripe",
          },
        ],
      },
    },
  });

  revalidatePath("/admin");
}
