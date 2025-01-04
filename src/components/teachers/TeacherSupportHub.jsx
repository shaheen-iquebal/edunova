import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  Clock,
  FileText,
  ChevronRight,
  Building2,
  GraduationCap,
  MessagesSquare,
  Activity,
  BookmarkPlus,
  ClipboardList,
  School,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TeacherSupportHub = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showResourceRequest, setShowResourceRequest] = useState(false);
  const [showClassSchedule, setShowClassSchedule] = useState(false);

  const departments = [
    {
      id: "academic",
      title: "Teaching Resources",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description:
        "Access lesson plans, teaching materials, and curriculum guides",
    },
    {
      id: "student",
      title: "Student Management",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Manage attendance, grades, and student behavior records",
    },
    {
      id: "admin",
      title: "Administrative Support",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description:
        "Submit reports, request supplies, and access school policies",
    },
    {
      id: "professional",
      title: "Professional Development",
      icon: School,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Access training resources and certification programs",
    },
  ];

  const quickActions = [
    {
      title: "Schedule Extra Class",
      icon: Calendar,
      action: () => setShowClassSchedule(true),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Request Resources",
      icon: BookmarkPlus,
      action: () => setShowResourceRequest(true),
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Track Requests",
      icon: Activity,
      action: () => {},
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const upcomingClasses = [
    {
      subject: "Mathematics",
      class: "Grade 10-A",
      time: "Today, 2:00 PM",
      type: "Regular Class",
      attendees: 28,
    },
    {
      subject: "Mathematics",
      class: "Grade 11-B",
      time: "Today, 3:30 PM",
      type: "Extra Class",
      attendees: 15,
    },
  ];

  const pendingTasks = [
    {
      title: "Grade Term Papers",
      deadline: "Tomorrow",
      class: "Grade 11-B",
      priority: "High",
    },
    {
      title: "Submit Weekly Report",
      deadline: "Friday",
      department: "Academic",
      priority: "Medium",
    },
  ];

  return (
    <div className="w-full max-w-6xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Support Hub
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
            <MessagesSquare className="w-4 h-4" />
            Department Chat
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">
            <ClipboardList className="w-4 h-4" />
            My Reports
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={action.action}
            className={`p-4 rounded-lg ${action.bgColor} hover:opacity-90 transition-all duration-200 flex items-center gap-3`}
          >
            <action.icon className={`w-5 h-5 ${action.color}`} />
            <span className={`font-medium ${action.color}`}>
              {action.title}
            </span>
            <ChevronRight className={`w-4 h-4 ${action.color} ml-auto`} />
          </button>
        ))}
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedDepartment(dept)}
          >
            <CardContent className="pt-6">
              <div
                className={`w-12 h-12 rounded-lg ${dept.bgColor} flex items-center justify-center mb-4`}
              >
                <dept.icon className={`w-6 h-6 ${dept.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{dept.title}</h3>
              <p className="text-gray-600 text-sm">{dept.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Today's Schedule</CardTitle>
          <button className="text-sm text-blue-600 hover:underline">
            View Full Schedule
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingClasses.map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{session.subject}</h4>
                    <p className="text-sm text-gray-600">{session.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{session.time}</p>
                  <p className="text-sm text-gray-600">
                    {session.attendees} students
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Pending Tasks</CardTitle>
          <button className="text-sm text-blue-600 hover:underline">
            View All Tasks
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600">
                      {task.class || task.department}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{task.deadline}</p>
                  <p
                    className={`text-sm ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority} Priority
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Request Dialog */}
      <Dialog open={showResourceRequest} onOpenChange={setShowResourceRequest}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Teaching Resources</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Resource Type
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option>Teaching Materials</option>
                <option>Laboratory Equipment</option>
                <option>Technology Resources</option>
                <option>Books & References</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Subject/Class
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option>Mathematics - Grade 10</option>
                <option>Mathematics - Grade 11</option>
                <option>Mathematics - Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe the resources you need"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Required By Date
              </label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
          </div>
          <DialogFooter>
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-2">
              Submit Request
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Class Schedule Dialog */}
      <Dialog open={showClassSchedule} onOpenChange={setShowClassSchedule}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Extra Class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Class</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Grade 10-A</option>
                <option>Grade 11-B</option>
                <option>Grade 12-C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <input type="time" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Topics to Cover
              </label>
              <textarea
                rows={3}
                placeholder="List the topics you plan to cover"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Required Resources
              </label>
              <textarea
                rows={2}
                placeholder="List any resources you'll need"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-2">
              Schedule Class
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherSupportHub;
