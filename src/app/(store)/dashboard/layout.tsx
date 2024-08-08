"use client";

import {
  ChartLine,
  LayoutDashboardIcon,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { Profile } from "@/ui/common/profile";
import { SideLink } from "@/ui/common/side-link";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-[240px_1fr]">
        <div className="sticky top-0 flex h-screen flex-col gap-2 overflow-y-auto border-r bg-muted/40 p-4">
          <h1 className="mb-8 flex items-center gap-2 text-xl font-bold">
            <Image src="/icon.png" alt="tilby" width={30} height={30} />
            Tilby
          </h1>

          <SideLink
            path="/dashboard"
            title="Dashboard"
            Icon={LayoutDashboardIcon}
          />

          <SideLink path="/dashboard/catalog" title="Catalog" Icon={Package} />

          <SideLink
            path="/dashboard/orders"
            title="Orders"
            Icon={ShoppingCart}
          />

          <SideLink
            path="/dashboard/analytics"
            title="Analytics"
            Icon={ChartLine}
          />

          <SideLink
            path="/dashboard/settings"
            title="Settings"
            Icon={Settings}
          />

          <Profile />
        </div>

        <div className="p-4">
          <div className="h-full rounded-xl p-4">{children}</div>
        </div>
      </div>
    </>
  );
}
