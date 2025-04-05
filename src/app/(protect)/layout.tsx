import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
      <div className="w-full">
        <AppHeader>
          <SidebarTrigger />
        </AppHeader>
        <main className="p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
