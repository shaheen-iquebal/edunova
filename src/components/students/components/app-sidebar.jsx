// import * as React from "react";
import { useEffect, useState } from "react";
import {
  Bot,
  GalleryVerticalEnd,
  SquareTerminal,
  Home,
  ChartArea,
  BookText,
  // ListTodo,
  // Calculator,
  // AlarmClock,
  // Wand2,
  NotebookPen,
  MessageCircleQuestion,
  CalendarDays,
  BookmarkCheck,
  LibraryBig,
} from "lucide-react";

import { NavMain } from "./nav-main";
// import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { StaticItems } from "./static";
import { Link } from "react-router-dom";

// This is sample data.
const data = {
  teams: [
    {
      name: "EduNova",
      logo: GalleryVerticalEnd,
      plan: "Student Dashboard",
    },
  ],
  navMain: [
    // { title: "Dashboard", url: "/student", icon: Home },
    {
      title: "Converse with AI",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Chat",
          url: "/student/chat",
        },
        {
          title: "Bookmarked",
          url: "/student/bookmarked-responses",
        },
        // {
        //   title: "Settings",
        //   url: "#",
        // },
      ],
    },
    {
      title: "AI Playground",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Question Bot",
          url: "/student/question-bot",
        },
        {
          title: "Mock Test Generator",
          url: "/student/mock-test-generator",
        },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Resources",
      url: "#",
      icon: BookText,
      items: [
        {
          title: "Books",
          url: "/student/books",
        },
        {
          title: "Class Notes",
          url: "/student/class-notes",
        },
        {
          title: "Assignments",
          url: "/student/assignments",
        },
        // {
        //   title: "Academic Calendar",
        //   url: "/student/academic-calendar",
        // },
      ],
    },
    {
      title: "AI Analytic Reports",
      url: "#",
      icon: ChartArea,
      items: [
        {
          title: "Performance & Progress",
          url: "/student/performance-progress",
        },
        {
          title: "Strengths & Weaknesses",
          url: "/student/strengths-weaknesses",
        },
        {
          title: "Badges/Rewards",
          url: "/student/badges-rewards",
        },
        {
          title: "Recommendations",
          url: "/student/recommendations",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Dashboard",
  //     url: "/student",
  //     icon: Home,
  //   },
  //   {
  //     name: "To-Do List",
  //     url: "/student/ai-to-do",
  //     icon: ListTodo,
  //   },
  //   {
  //     name: "AI Study Tools",
  //     url: "/student/ai-study-tools",
  //     icon: Wand2,
  //   },
  //   {
  //     name: "Reminder",
  //     url: "/student/reminders",
  //     icon: AlarmClock,
  //   },
  //   {
  //     name: "AI Calculator",
  //     url: "/student/ai-calculator",
  //     icon: Calculator,
  //   },
  // ],
};

export function AppSidebar({ ...props }) {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    // Retrieve and parse the userData cookie
    const userData = Cookies.get("userData");
    if (userData) {
      setuserData(JSON.parse(userData)); // Parse the cookie data
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props} className="text-lg">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link to="/student">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
        <StaticItems />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Assignments">
                  <Link to="/student/assignments">
                    <NotebookPen />
                    <span>Assignments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Academic Calendar">
                  <Link to="/student/academic-calendar">
                    <CalendarDays />
                    <span>Academic Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Books Library">
                  <Link to="/student/books">
                    <LibraryBig />
                    <span>Books Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Bookmarked AI Responses">
                  <Link to="/student/bookmarked-responses">
                    <BookmarkCheck />
                    <span>Bookmarked AI Responses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Support Desk">
                  <Link to="/student/support">
                    <MessageCircleQuestion />
                    <span>Support Desk</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData || { name: "", avatar: "", email: "" }} />{" "}
        {/* Provide fallback */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
