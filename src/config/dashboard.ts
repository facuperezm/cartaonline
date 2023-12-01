import { type SidebarNavItem } from "@/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "avatar",
      items: [],
    },
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: "store",
      items: [],
    },
  ],
};
