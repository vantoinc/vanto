import { auth } from "@/lib/auth";
import Image from "next/image";
import { ToggleTheme } from "@/ui/common/toggle-theme";
import { Logout } from "@/ui/common/logout";

export async function Profile(): Promise<JSX.Element> {
  const session = await auth();
  return (
    <>
      <div className="mt-auto flex gap-1">
        <Logout />
        <ToggleTheme />
      </div>

      <div className="flex items-center gap-3 border-t pt-2">
        <Image
          src={session?.user?.image || ""}
          alt="user"
          width={80}
          height={80}
          className="size-8 rounded-md"
        />
        <div className="leading-[1.2em]">
          <p>{session?.user?.name}</p>
          <small className="text-muted-foreground">
            {session?.user?.email}
          </small>
        </div>
      </div>
    </>
  );
}
