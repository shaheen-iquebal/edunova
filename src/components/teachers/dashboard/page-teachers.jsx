import { Routes, Route, useLocation } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ChatAppForFlask from "@/components/ChatAppForFlask";
import ChangePassword from "@/components/common/ChangePassword";
import Home from "./Home";
import AttendanceHeatmap from "../AttendanceHeatmap";
import NotesGrid from "../NotesGrid";
import AttendanceDetailed from "../AttendanceDetailed";
import AnalyticsSelector from "../AnalyticsSelector";
import BooksLibrary from "../BooksLibrary";
import TeacherNotes from "../TeacherNotes";
import TeacherAssignmentsPage from "../TeacherAssignmentsPage";
import GenerateAssignmentPage from "../GenerateAssignmentPage";
import AccountDetails from "../AccountDetails";
import ClassPerformanceStatsDetailed from "../ClassPerformanceStatsDetailed";
import AIStudyHub from "../AIStudyHub";
import RemindersPage from "../RemindersPage";
import TeacherSupportHub from "../TeacherSupportHub";
import TeacherAcademicCard from "../TeacherAcademicCard";
import TeacherCalendar from "../TeacherCalendar";
import TeacherNotifications from "../TeacherNotifications";
import UpdateProfile from "../UpdateProfile";
import TeacherReminders from "../TeacherReminders";
import AICalculator from "../AICalculator";

// Add a mapping of route paths to readable names
const routeNameMap = {
  "": "Dashboard",
  profile: "Profile",
  "update-profile": "Update Profile",
  notes: "Notes",
  "change-password": "Change Password",
  notifications: "Notifications",
  books: "Books Library",
  "class-notes": "Class Notes",
  "bookmarked-responses": "Bookmarked Responses",
  assignments: "Assignments",
  "academic-calendar": "Academic Calendar",
  "ai-study-tools": "AI Study Tools",
  "ai-calculator": "AI Calculator",
  "smart-todo": "Smart Todo",
  support: "Support Desk",
  logout: "Logout",
  chat: "Chat",
  reminders: "Reminders",
  "performance-progress": "Performance Progress Analysis",
  "strengths-weaknesses": "Strengths and Weaknesses",
  "interactive-drill-down": "Interactive Drill Down",
  recommendations: "Recommendations",
  "generate-assignments": "Generate Assignments",
  "class-performance-statistics": "Class Performance Statistics",
};

export default function PageTeacher() {
  const location = useLocation();
  const isChat = location.pathname === "/admin/chat";

  // Function to generate breadcrumb items
  const getBreadcrumbItems = () => {
    // Remove "/admin" from the start and split the remaining path
    const path = location.pathname.replace(/^\/admin\/?/, "");
    const currentRoute = path || "";

    // If we're at the root, just show Dashboard
    if (!currentRoute) {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    }

    // For other routes, show Dashboard > Current Page
    return (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {routeNameMap[currentRoute] || currentRoute}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </>
    );
  };

  // If we're on the chat route, render only ChatAppForFlask
  if (isChat) {
    return <ChatAppForFlask home={"/admin"} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>{getBreadcrumbItems()}</BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="profile" element={<AccountDetails />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route
              path="interactive-drill-down"
              element={<AnalyticsSelector />}
            />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="attendance" element={<AttendanceDetailed />} />
            <Route path="bookmarked-responses" element={<NotesGrid />} />
            <Route path="books" element={<BooksLibrary />} />
            <Route path="notes" element={<TeacherNotes />} />
            <Route path="assignments" element={<TeacherAssignmentsPage />} />
            <Route
              path="generate-assignments"
              element={<GenerateAssignmentPage />}
            />
            <Route
              path="class-performance-statistics"
              element={<ClassPerformanceStatsDetailed />}
            />
            <Route path="ai-study-tools" element={<AIStudyHub />} />
            <Route path="reminders" element={<TeacherReminders />} />
            <Route path="support" element={<TeacherSupportHub />} />
            <Route path="academic-calendar" element={<TeacherCalendar />} />
            <Route path="notifications" element={<TeacherNotifications />} />
            <Route path="ai-calculator" element={<AICalculator />} />
            {/* <Route path="smart-todo" element={<AiTodoList />} />
            
            
            <Route
              path="performance-progress"
              element={<PerformanceProgressDetailed />}
            />
            <Route
              path="strengths-weaknesses"
              element={<StrengthsWeaknessDetailed />}
            />
            <Route
              path="recommendations"
              element={<RecommendationsDetailed />}
            />
            <Route path="logout" element={<Logout />} />
            <Route path="badges-rewards" element={<GamificationDetailed />} /> */}
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
