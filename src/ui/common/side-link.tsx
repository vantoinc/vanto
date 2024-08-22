"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        "flex items-center gap-3 rounded-md p-2 px-0 text-xl text-muted-foreground hover:text-yellow-600 dark:hover:text-yellow-300",
        { "text-yellow-600 dark:text-yellow-300": pathname === path },
      )}
    >
      <Icon size={26} /> {title}
    </Link>
  );
}
