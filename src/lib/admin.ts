import { auth } from "./auth";

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
