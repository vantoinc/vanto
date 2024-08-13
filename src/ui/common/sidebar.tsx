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
      <SideLink path={"/manage"} title="Dashboard" Icon={LayoutDashboardIcon} />

      <SideLink path={"/manage/catalog"} title="Catalog" Icon={Package} />

      <SideLink path={"/manage/orders"} title="Orders" Icon={ShoppingCart} />

      <SideLink path={"/manage/analytics"} title="Analytics" Icon={ChartLine} />

      <SideLink path={"/manage/settings"} title="Settings" Icon={Settings} />
    </>
  );
}
