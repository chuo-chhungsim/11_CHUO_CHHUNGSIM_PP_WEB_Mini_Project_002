import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider className={"font-sans"}>
      <AppSidebar />
      <main className="w-full">
        <div className="absolute top-3 left-5 z-50 bg-white shadow-md">
          {/* <SidebarTrigger className={"w-10 absolute right-0"} /> */}
        </div>
        <div className="px-2 ">{children}</div>
      </main>
    </SidebarProvider>
  );
}
