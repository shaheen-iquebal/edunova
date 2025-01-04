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

import ProfileDetails from "../ProfileDetails";
import ChatAppForFlask from "@/components/ChatAppForFlask";
import UpdateProfileDetails from "../UpdateProfileDetails";
import NotesGrid from "../NotesGrid";
import ChangePassword from "@/components/common/ChangePassword";
import NotificationsPanel from "../NotificationsPanel";
import Logout from "../../Logout";
import Home from "./Home";
import BooksLibrary from "../BooksLibrary";
import ClassNotes from "../ClassNotes";
import AssignmentsPage from "../AssignmentsPage";
import AcademicCalendar from "../AcademicCalendar";
import AIStudyHub from "../AIStudyHub";
import AICalculator from "../AICalculator";
import AiTodoList from "../AiTodoList";
import StudentSupportHub from "../StudentSupportHub";
import Reminders from "../Reminders";
import PerformanceProgressDetailed from "../PerformanceProgressDetailed";
import StrengthsWeaknessDetailed from "../StrengthsWeaknessDetailed";
import GamificationDetailed from "../GamificationDetailed";
import RecommendationsDetailed from "../RecommendationsDetailed";

// export default function Page() {
//   const location = useLocation();
//   const isChat = location.pathname === "/student/chat";

//   // If we're on the chat route, render only ChatAppForFlask
//   if (isChat) {
//     return <ChatAppForFlask home={"/student"} />;
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
//           <div className="flex items-center gap-2 px-4">
//             <SidebarTrigger className="-ml-1" />
//             <Separator orientation="vertical" className="mr-2 h-4" />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="#">
//                     Building Your Application
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//           <Routes>
//             <Route path="" element={<Home />} />
//             <Route path="profile" element={<ProfileDetails />} />
//             <Route path="update-profile" element={<UpdateProfileDetails />} />
//             <Route path="notes" element={<NotesGrid />} />
//             <Route path="change-password" element={<ChangePassword />} />
//             <Route path="notifications" element={<NotificationsPanel />} />
//             <Route path="books" element={<BooksLibrary />} />
//             <Route path="class-notes" element={<ClassNotes />} />
//             <Route path="bookmarked-responses" element={<NotesGrid />} />
//             <Route path="assignments" element={<AssignmentsPage />} />
//             <Route path="academic-calendar" element={<AcademicCalendar />} />
//             <Route path="ai-study-tools" element={<AIStudyHub />} />
//             <Route path="ai-calculator" element={<AICalculator />} />
//             <Route path="smart-todo" element={<AiTodoList />} />
//             <Route path="support" element={<StudentSupportHub />} />
//             <Route path="logout" element={<Logout />} />
//           </Routes>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

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
  support: "Student Support",
  logout: "Logout",
  chat: "Chat",
  reminders: "Reminders",
  "performance-progress": "Performance Progress Analysis",
  "strengths-weaknesses": "Strengths and Weaknesses",
  "badges-rewards": "Badges and Rewards",
  recommendations: "Recommendations",
};

export default function Page() {
  const location = useLocation();
  const isChat = location.pathname === "/student/chat";

  // Function to generate breadcrumb items
  const getBreadcrumbItems = () => {
    // Remove "/student" from the start and split the remaining path
    const path = location.pathname.replace(/^\/student\/?/, "");
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
          <BreadcrumbLink href="/student">Dashboard</BreadcrumbLink>
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
    return <ChatAppForFlask home={"/student"} />;
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
            {/* <Route path="/student" element={<Home />} /> */}
            <Route path="profile" element={<ProfileDetails />} />
            <Route path="update-profile" element={<UpdateProfileDetails />} />
            <Route path="notes" element={<NotesGrid />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="notifications" element={<NotificationsPanel />} />
            <Route path="books" element={<BooksLibrary />} />
            <Route path="class-notes" element={<ClassNotes />} />
            <Route path="bookmarked-responses" element={<NotesGrid />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="academic-calendar" element={<AcademicCalendar />} />
            <Route path="ai-study-tools" element={<AIStudyHub />} />
            <Route path="ai-calculator" element={<AICalculator />} />
            <Route path="smart-todo" element={<AiTodoList />} />
            <Route path="support" element={<StudentSupportHub />} />
            <Route path="reminders" element={<Reminders />} />
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
            <Route path="badges-rewards" element={<GamificationDetailed />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
