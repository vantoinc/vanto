import { auth } from "@/lib/auth";
import Image from "next/image";

export async function Profile(): Promise<JSX.Element> {
  const session = await auth();
  return (
    <div className="mt-auto flex items-center gap-3 border-t pt-2">
      <Image
        src={session?.user?.image || ""}
        alt="user"
        width={80}
        height={80}
        className="size-8 rounded-md"
      />
      <div className="leading-[1.2em]">
        <p>{session?.user?.name}</p>
        <small className="text-muted-foreground">{session?.user?.email}</small>
      </div>
    </div>
  );
}
