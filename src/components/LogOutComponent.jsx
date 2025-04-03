"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function LogoutComponent() {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" }); // Redirect to homepage after logout
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <SidebarMenuButton
      asChild
      className="py-2 text-lg text-black hover:bg-gray-100"
      onClick={handleSignOut}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <LogOut />
        <span>Logout</span>
      </div>
    </SidebarMenuButton>
  );
}
