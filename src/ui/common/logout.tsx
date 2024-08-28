import { Power } from "lucide-react";

import { signOut } from "@/lib/auth";
import { Button } from "@/ui/shadcn/button";

export function Logout(): JSX.Element {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirect: true, redirectTo: "/" });
      }}
    >
      <Button variant="ghost" className="p-2">
        <Power size={18} />
      </Button>
    </form>
  );
}
