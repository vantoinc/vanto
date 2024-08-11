import { Button } from "@/ui/shadcn/button";
import { signIn } from "@/lib/auth";

export function GoogleProvider() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/admin" });
      }}
    >
      <Button>Sign in with Google</Button>
    </form>
  );
}
