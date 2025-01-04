/* eslint-disable react/prop-types */
import { useState } from "react";
import { LockKeyhole, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { FaRegUser, FaRegEdit } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import slugify from "slugify";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  // Add a fallback check
  if (!user || !user.name) {
    return null; // or display a loading state
  }

  const avatarSrc =
    "/public/teacher/profile/" + slugify(user.username) + ".jpg";

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gray-100"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarSrc} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs capitalize">
                  Role: {user.userType}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarSrc} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLinkClick}>
                <Link to="/admin/profile" className="flex items-center gap-2">
                  <FaRegUser className="inline-block" />
                  <span>Account Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLinkClick}>
                <Link
                  to="/admin/update-profile"
                  className="flex items-center gap-2"
                >
                  <FaRegEdit className="inline-block" />
                  <span>Edit Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLinkClick}>
                <Link
                  to="/admin/notifications"
                  className="flex items-center gap-2"
                >
                  <Bell className="inline-block" />
                  <span>Notifications</span>
                  <Badge variant="destructive">3</Badge>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLinkClick}>
              <Link
                to="/admin/change-password"
                className="flex items-center gap-2"
              >
                <LockKeyhole className="inline-block" />
                <span>Change Password</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLinkClick}>
              <Link to="/logout" className="flex items-center gap-2">
                <LogOut className="inline-block" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
