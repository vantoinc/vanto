"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SigninPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Button
        variant="ghost"
        onClick={async () => {
          await signIn("github", {
            callbackUrl: "/dashboard",
            redirect: false,
          });
        }}
      >
        Sign in with Github
      </Button>
    </main>
  );
}
