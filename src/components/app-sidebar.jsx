import { Edit, LogOut, MoreHorizontal, Plus, Star, Trash } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getAllWorkspaces } from "@/services/workspace/workspaceService";
import Logo from "./logo";
import { colorList } from "@/resourse/color";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import ModalAddWorkspace from "./modalAddWorkspace";
import ModalUpdateWorkspace from "./modalUpdateWorkspace";
export async function AppSidebar() {
  const getColor = colorList;
  const workspace = await getAllWorkspaces();
  // console.log(workspace);
  const favoriteWorkspaces = workspace.filter((item) => item.isFavorite);

  return (
    <Sidebar>
      <SidebarContent className={"bg-white"}>
        <SidebarHeader className={"text-center"}>
          <Logo />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-black flex items-center justify-between">
            Workspaces
            <ModalAddWorkspace />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspace.map((item) => {
                // Generate a random color for each workspace
                const colorValues = Object.values(getColor);
                const randomColor =
                  colorValues[Math.floor(Math.random() * colorValues.length)];

                return (
                  <SidebarMenuItem
                    key={item.workspaceId}
                    className="w-full py-0.5 text-base relative"
                  >
                    <SidebarMenuButton asChild>
                      <a href={`/workspace/${item.workspaceId}`}>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: randomColor }}
                        ></div>
                        <span>{item.workspaceName}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreHorizontal />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="right"
                        align="start"
                        className={"bg-white border-none"}
                      >
                        <ModalUpdateWorkspace workspace={item} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-black">
            Favorite
          </SidebarGroupLabel>
          <SidebarGroupAction title="favorite">
            <Star /> <span className="sr-only">Favorite</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {favoriteWorkspaces.map((item) => {
                // Generate a random color for each workspace
                const colorValues = Object.values(getColor);
                const randomColor =
                  colorValues[Math.floor(Math.random() * colorValues.length)];

                return (
                  <SidebarMenuItem
                    key={item.workspaceId}
                    className="w-full py-0.5 text-base"
                  >
                    <SidebarMenuButton asChild>
                      <a href={`/workspace/${item.workspaceId}`}>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: randomColor }} // Use inline style for dynamic colors
                        ></div>
                        <span>{item.workspaceName}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreHorizontal />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="right"
                        align="start"
                        className={"bg-white border-none"}
                      >
                        <ModalUpdateWorkspace workspace={item} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={"bg-white"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={"py-2 text-lg"}>
              <a href="#" className="text-lg text-black">
                <LogOut />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
