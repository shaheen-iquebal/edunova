// import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardSidebar from "./components/Admin/DashboardSidebar";
import Header from "./components/Admin/Header";
// Import your dashboard content components
import DashboardHome from "./components/Admin/DashboardHome";
import AddNewStudent from "./components/Admin/AddNewStudent";
import ChatAppForFlask from "./components/ChatAppForFlask";

function Dashboard() {
  const location = useLocation();
  const isChat = location.pathname === "/admin/chat";

  // If we're on the chat route, render only ChatAppForFlask
  if (isChat) {
    return <ChatAppForFlask home={"/admin"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="p-4 xl:ml-72">
        {/* Header */}
        <Header />

        {/* Dynamic Body Content */}
        <div className="mt-12" id="body-content">
          <Routes>
            {/* Default route for dashboard home */}
            <Route path="" element={<DashboardHome />} />

            {/* Route for adding new student */}
            <Route path="add-new-student" element={<AddNewStudent />} />

            {/* Add more routes for other admin pages as needed */}
            {/* Example:
            <Route path="manage-students" element={<ManageStudents />} />
            <Route path="reports" element={<Reports />} />
            */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
