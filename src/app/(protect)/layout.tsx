import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { unstable_ViewTransition as ViewTransition } from "react";
import "server-only";
import { AppHeader } from "./_components/app-header";
import { AppSidebar } from "./_components/app-sidebar";

/**
 * @private
 */
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col min-h-full w-full">
        <AppHeader>
          <SidebarTrigger />
        </AppHeader>
        <main className="p-4 flex-1 bg-gray-50">
          <ViewTransition>{children}</ViewTransition>
        </main>
      </div>
    </SidebarProvider>
  );
}
