import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { dashboardConfig } from "@/config/dashboard";
import { InitialUser } from "@/lib/initial-user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNav } from "@/components/layouts/sidebar-nav";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sso-callback?origin=dashboard");
  }

  const user = await InitialUser();

  if (!user) {
    redirect("/sso-callback?origin=dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={clerkUser} />
      <div className="container flex-1 items-start px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav items={dashboardConfig.sidebarNav} />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
