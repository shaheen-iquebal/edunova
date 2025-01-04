import { Routes, Route } from "react-router-dom";
// import Dashboard from "./Dashboard";
// import Login from "./components/Login";
import GenericBot from "./components/GenericBot";
// import Home from "./components/Home";
import Bots from "./components/Bots";
import ChatApp from "./components/ChatApp";
import Logout from "./components/Logout";
import ChatAppWithContext from "./components/ChatAppWithContext";
// import ChatAppForFlask from "./components/ChatAppForFlask";
import ProtectedRoute from "./components/ProtectedRoute";
// import StudentDashboard from "./components/student/StudentDashboard";
import Error404 from "./components/common/Error404";
import Page from "./components/students/dashboard/page";
import PageTeacher from "./components/teachers/dashboard/page-teachers";
import LoginPage from "./login/page";
import RootRedirect from "./RootRedirect";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/" element={<Home />} /> */}

      {/* Root route with automatic redirect */}
      <Route path="/" element={<RootRedirect />} />

      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        path="/generic-bot"
        element={
          <ProtectedRoute>
            <GenericBot />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bots"
        element={
          <ProtectedRoute>
            <Bots />
          </ProtectedRoute>
        }
      />

      {/* Admin/Teacher only routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedUserTypes={["teacher", "principal"]}>
            {/* <Dashboard /> */}
            <PageTeacher />
          </ProtectedRoute>
        }
      />

      {/* Student only routes */}
      {/* <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedUserTypes={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedUserTypes={["student"]}>
            <Page />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <ChatApp />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatwithcontext"
        element={
          <ProtectedRoute>
            <ChatAppWithContext />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatAppForFlask />
          </ProtectedRoute>
        }
      /> */}

      <Route path="/logout" element={<Logout />} />
      <Route path="/new" element={<LoginPage />} />

      {/* 404 Fallback */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
