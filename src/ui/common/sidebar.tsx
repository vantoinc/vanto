"use client";

import {
  ChartLine,
  LayoutDashboardIcon,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { SideLink } from "@/ui/common/side-link";

export function Sidebar(): JSX.Element {
  return (
    <>
      <SideLink
        path={"/dashboard"}
        title="Dashboard"
        Icon={LayoutDashboardIcon}
      />

      <SideLink path={"/dashboard/catalog"} title="Catalog" Icon={Package} />

      <SideLink path={"/dashboard/orders"} title="Orders" Icon={ShoppingCart} />

      <SideLink
        path={"/dashboard/analytics"}
        title="Analytics"
        Icon={ChartLine}
      />

      <SideLink path={"/dashboard/settings"} title="Settings" Icon={Settings} />
    </>
  );
}
