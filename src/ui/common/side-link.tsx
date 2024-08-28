"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface Props {
  path: string;
  title: string;
  Icon: LucideIcon;
}

export function SideLink({ path, title, Icon }: Props): JSX.Element {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={cn(
        "flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:text-foreground",
        {
          "bg-muted text-foreground shadow-sm shadow-zinc-300 dark:shadow-black":
            pathname === path,
        },
      )}
    >
      <Icon size={20} /> {title}
    </Link>
  );
}
