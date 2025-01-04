// import * as React from "react";
import { useEffect, useState } from "react";
import {
  Bot,
  GalleryVerticalEnd,
  SquareTerminal,
  Home,
  ChartArea,
  BookText,
  MessageCircleQuestion,
  CalendarDays,
  Settings,
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
      plan: "Administrator Dashboard",
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
          url: "/admin/chat",
        },
        {
          title: "Bookmarked",
          url: "/admin/bookmarked-responses",
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
          url: "/admin/question-bot",
        },
        {
          title: "Mock Test Generator",
          url: "/admin/mock-test-generator",
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
          url: "/admin/books",
        },
        {
          title: "Class Notes",
          url: "/admin/notes",
        },
        {
          title: "Assignments",
          url: "/admin/assignments",
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
          title: "Performance Statistics",
          url: "/admin/class-performance-statistics",
        },
        {
          title: "Predictive Analytics",
          url: "/admin/predictive-analytics",
        },
        {
          title: "Strengths & Weaknesses",
          url: "/admin/class-strengths-weaknesses",
        },
        {
          title: "Recommendations",
          url: "/admin/recommendations",
        },
        {
          title: "Attendance",
          url: "/admin/attendance",
        },
      ],
    },
  ],
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/admin">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <StaticItems />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/admin/academic-calendar">
                    <CalendarDays />
                    <span>Academic Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/admin/customize-dashboard">
                    <Settings />
                    <span>Customize Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/admin/support">
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
        <NavUser user={userData || { name: "", avatar: "", email: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
