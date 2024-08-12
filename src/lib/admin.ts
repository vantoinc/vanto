import { Store } from "@/types/store";
import { auth } from "./auth";
import { prisma } from "./prisma";

export const withAdmin = async <T>(
  cb: (userId: string) => Promise<T>,
): Promise<T> => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Authentication failed");
  }

  const userId = session.user.id;
  return cb(userId);
};

export async function isStore(
  storeId: string,
): Promise<Pick<Store, "id" | "name" | "description" | "token"> | null> {
  console.log(storeId);
  return withAdmin(async (userId) => {
    return await prisma.store.findFirst({
      where: {
        token: storeId,
        userId,
      },
    });
  });
}
