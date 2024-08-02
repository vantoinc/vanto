import { cn } from "@/utils/libs/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  title: string;
  Icon: LucideIcon;
}

export function SideLink({ path, title, Icon }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={cn(
        "flex items-center gap-2 rounded-md p-2 text-xl text-muted-foreground hover:text-yellow-300",
        { "text-yellow-300": pathname === path },
      )}
    >
      <Icon size={20} /> {title}
    </Link>
  );
}
