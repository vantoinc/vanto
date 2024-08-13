"use server";

import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signInGoogle(): Promise<void> {
  const session = await auth();
  if (!session) {
    await signIn("google", { redirectTo: "/manage" });
    return;
  }
  redirect("/manage");
}
