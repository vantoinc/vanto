"use server";

import { redirect } from "next/navigation";

import { auth, signIn } from "@/lib/auth";

export async function signInGoogle(): Promise<void> {
  const session = await auth();
  if (!session) {
    await signIn("google", { redirectTo: "/dashboard" });
    return;
  }
  redirect("/dashboard");
}
