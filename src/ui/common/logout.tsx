import { Power } from "lucide-react";
import { Button } from "@/ui/shadcn/button";
import { signOut } from "@/lib/auth";

export function Logout() {
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
