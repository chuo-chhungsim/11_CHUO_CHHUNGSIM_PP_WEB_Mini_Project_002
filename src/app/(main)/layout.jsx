import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider className={"font-sans no-scrollbar"}>
      <AppSidebar />
      <main className="w-full">
        {/* <SidebarTrigger /> */}
        <div className="px-2">{children}</div>
      </main>
    </SidebarProvider>
  );
}
