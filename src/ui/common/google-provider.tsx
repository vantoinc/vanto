import { signInGoogle } from "@/app/(public)/login/action";
import { Button } from "@/ui/shadcn/button";

export function GoogleProvider(): JSX.Element {
  return (
    <form
      action={async () => {
        "use server";
        await signInGoogle();
      }}
    >
      <Button>Sign in with Google</Button>
    </form>
  );
}
