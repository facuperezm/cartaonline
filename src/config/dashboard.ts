import type { SidebarNavItem } from '@/lib/validations/types'

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Cuenta',
      href: '/dashboard/account',
      icon: 'avatar',
      items: [],
    },
    {
      title: 'Tiendas',
      href: '/dashboard/stores',
      icon: 'store',
      items: [],
    },
    {
      title: 'Pagos',
      href: '/dashboard/billing',
      icon: 'credit',
      items: [],
    },
  ],
}
