import "server-only";

import { unstable_cache } from "next/cache";

import { withAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const getMethodPayment = (): Promise<{
  apiKey: string | null;
  privateKey: string | null;
  urlCallback: string | null;
} | null> =>
  withAdmin((userId) => {
    return unstable_cache(
      async () => {
        const methodPayment = await prisma.payment.findFirst({
          select: {
            apiKey: true,
            privateKey: true,
            urlCallback: true,
          },
          where: {
            userId,
          },
        });

        return methodPayment;
      },
      ["settings", userId],
      { revalidate: 180, tags: [`settings_${userId}`] },
    )();
  });
