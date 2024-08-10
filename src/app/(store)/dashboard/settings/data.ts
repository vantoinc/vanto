import "server-only";
import { prisma } from "@/lib/prisma";

export async function getSettings() {
  const settings = await prisma.setting.findFirst({
    include: {
      Payment: true,
    },
  });
  return settings;
}