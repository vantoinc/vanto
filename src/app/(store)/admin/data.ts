import "server-only";

import { withAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Store } from "@/types/store";

type GetStore = Pick<
  Store,
  "id" | "name" | "description" | "token" | "userId" | "createdAt" | "updatedAt"
> | null;

export const getStore = (): Promise<GetStore> =>
  withAdmin(async (userId) => {
    return await prisma.store.findFirst({
      where: {
        userId,
      },
    });
  });
