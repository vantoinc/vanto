import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Store } from "@/types/store";
import "server-only";

export async function getStore(): Promise<Omit<
  Store,
  "Payment" | "Taxe" | "Product" | "Category"
> | null> {
  const session = await auth();

  return await prisma.store.findFirst({
    where: {
      userId: session?.user.id,
    },
  });
}
