import { Button } from "@/ui/shadcn/button";
import { signIn } from "@/lib/auth";

export function GoogleProvider(): JSX.Element {
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
