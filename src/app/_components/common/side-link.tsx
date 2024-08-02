import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  path: string;
  title: string;
  Icon: LucideIcon;
}

export function SideLink({ path, title, Icon }: Props) {
  return (
    <Link
      href={path}
      className="flex items-center gap-2 rounded-md p-2 text-xl text-muted-foreground hover:text-yellow-400"
    >
      <Icon size={20} /> {title}
    </Link>
  );
}
