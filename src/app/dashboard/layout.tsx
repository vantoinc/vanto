import {
  ChartLine,
  LayoutDashboardIcon,
  Package,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { Profile } from "../_components/common/profile";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-[240px_1fr]">
        <div className="flex h-full flex-col gap-2 border-r bg-muted/40 p-4">
          <Profile />
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md p-2 text-xl text-muted-foreground"
          >
            <LayoutDashboardIcon size={20} /> Dashboard
          </Link>

          <Link
            href="/dashboard/catalog"
            className="flex items-center gap-2 rounded-md p-2 text-xl text-muted-foreground"
          >
            <Package size={20} /> Catalog
          </Link>

          <Link
            href="/dashboard/orders"
            className="flex items-center gap-2 rounded-md p-2 text-xl text-muted-foreground"
          >
            <ShoppingCart size={20} /> Orders
          </Link>

          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-2 rounded-md p-2 text-xl text-muted-foreground"
          >
            <ChartLine size={20} /> Analytics
          </Link>
        </div>

        <div className="p-4">
          <div className="h-full rounded-xl p-4">{children}</div>
        </div>
      </div>
    </>
  );
}
