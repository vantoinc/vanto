import "server-only";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getMethodPayment(): Promise<{
  apiKey: string | null;
  privateKey: string | null;
  urlCallback: string | null;
} | null> {
  const session = await auth();
  if (!session) return null;

  const methodPayment = await prisma.payment.findFirst({
    select: {
      apiKey: true,
      privateKey: true,
      urlCallback: true,
    },
    where: {
      userId: session.user.id,
    },
  });

  return methodPayment;
}
