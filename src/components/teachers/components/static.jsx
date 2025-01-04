import {
  AlarmClock,
  Calculator,
  Calendar,
  Home,
  Inbox,
  ListTodo,
  NotebookText,
  Search,
  Settings,
  Target,
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
    name: "Generate Assignments",
    url: "/admin/generate-assignments",
    icon: NotebookText,
  },
  {
    name: "Interactive Drill-Down",
    url: "/admin/interactive-drill-down",
    icon: Target,
  },
  {
    name: "Smart To-Do List",
    url: "/admin/smart-todo",
    icon: ListTodo,
  },
  {
    name: "AI Study Tools",
    url: "/admin/ai-study-tools",
    icon: Wand2,
  },
  {
    name: "Reminders",
    url: "/admin/reminders",
    icon: AlarmClock,
  },
  {
    name: "AI Calculator",
    url: "/admin/ai-calculator",
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
