"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export function Profile() {
  const session = useSession();
  return (
    <div className="flex items-center gap-2 border-b pb-2">
      <Image
        src={session.data?.user?.image || ""}
        alt="user"
        width={80}
        height={80}
        className="size-10 rounded-md"
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
