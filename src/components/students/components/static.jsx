import {
  AlarmClock,
  Calculator,
  MessageSquareMore,
  BookmarkCheck,
  ChartNoAxesCombined,
  ListTodo,
  Brain,
  Bot,
  Wand2,
  NotebookText,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    name: "Chat with AI",
    url: "/student/chat",
    icon: MessageSquareMore,
  },
  // {
  //   name: "Bookmarked AI Responses",
  //   url: "/student/bookmarked-responses",
  //   icon: BookmarkCheck,
  // },
  {
    name: "Strengths and Weaknesses",
    url: "/student/strengths-weaknesses",
    icon: Brain,
  },
  {
    name: "Performance Progress Analysis",
    url: "/student/performance-progress",
    icon: ChartNoAxesCombined,
  },
  {
    name: "AI Recommendations",
    url: "/student/recommendations",
    icon: Bot,
  },
  {
    name: "AI Study Tools",
    url: "/student/ai-study-tools",
    icon: Wand2,
  },
  {
    name: "Class Notes",
    url: "/student/class-notes",
    icon: NotebookText,
  },
  {
    name: "Smart To-Do List",
    url: "/student/smart-todo",
    icon: ListTodo,
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
      {/* <SidebarGroupLabel>Interactive Tools</SidebarGroupLabel> */}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild tooltip={item.name}>
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
