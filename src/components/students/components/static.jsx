import {
  AlarmClock,
  Calculator,
  Calendar,
  Home,
  Inbox,
  ListTodo,
  Search,
  Settings,
  Wand2,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    name: "Smart To-Do List",
    url: "/student/smart-todo",
    icon: ListTodo,
  },
  {
    name: "AI Study Tools",
    url: "/student/ai-study-tools",
    icon: Wand2,
  },
  {
    name: "Reminders",
    url: "/student/reminders",
    icon: AlarmClock,
  },
  {
    name: "AI Calculator",
    url: "/student/ai-calculator",
    icon: Calculator,
  },
];

export function StaticItems() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Interactive Tools</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
