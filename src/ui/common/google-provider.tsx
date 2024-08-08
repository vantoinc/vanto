"use client";

import { Button } from "@/ui/shadcn/button";
import { signIn } from "next-auth/react";

export function GoogleProvider() {
  return (
    <Button
      onClick={async () => {
        await signIn("google", {
          callbackUrl: "/dashboard",
          redirect: false,
        });
      }}
    >
      Sign in with Google
    </Button>
  );
}
