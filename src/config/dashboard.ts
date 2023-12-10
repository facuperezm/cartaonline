import { type SidebarNavItem } from "@/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Cuenta",
      href: "/dashboard/account",
      icon: "avatar",
      items: [],
    },
    {
      title: "Tiendas",
      href: "/dashboard/stores",
      icon: "store",
      items: [],
    },
  ],
};
