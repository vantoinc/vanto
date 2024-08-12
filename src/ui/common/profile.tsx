"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export function Profile(): JSX.Element {
  const session = useSession();

  return (
    <div className="mt-auto flex items-center gap-3 border-t pt-2">
      <Image
        src={session.data?.user?.image || ""}
        alt="user"
        width={80}
        height={80}
        className="size-8 rounded-md"
      />
      <div>
        <p>{session.data?.user?.name}</p>
        <small className="text-muted-foreground">
          {session.data?.user?.email}
        </small>
      </div>
    </div>
  );
}
