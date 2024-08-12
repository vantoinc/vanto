import "server-only";
import { prisma } from "@/lib/prisma";
import { Store } from "@/types/store";

export async function getSettings(): Promise<Omit<
  Store,
  "Taxe" | "Product" | "Category"
> | null> {
  const store = await prisma.store.findFirst({
    include: {
      Payment: true,
    },
  });

  return store;
}
