"use client";

import {
  ChartLine,
  LayoutDashboardIcon,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { SideLink } from "@/ui/common/side-link";

export function Sidebar({ id }: { id: string }): JSX.Element {
  return (
    <>
      <SideLink
        path={`/manage/${id}`}
        title="Dashboard"
        Icon={LayoutDashboardIcon}
      />

      <SideLink path={`/manage/${id}/catalog`} title="Catalog" Icon={Package} />

      <SideLink
        path={`/manage/${id}/orders`}
        title="Orders"
        Icon={ShoppingCart}
      />

      <SideLink
        path={`/manage/${id}/analytics`}
        title="Analytics"
        Icon={ChartLine}
      />

      <SideLink
        path={`/manage/${id}/settings`}
        title="Settings"
        Icon={Settings}
      />
    </>
  );
}
