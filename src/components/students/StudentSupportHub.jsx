import React, { useState } from "react";
import {
  BookOpen,
  Calculator,
  DollarSign,
  Calendar,
  MessageSquare,
  Clock,
  Users,
  FileQuestion,
  ChevronRight,
  Send,
  Building2,
  GraduationCap,
  MessagesSquare,
  Activity,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentSupportHub = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);

  const departments = [
    {
      id: "academic",
      title: "Academic Support",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description:
        "Get help with coursework, assignments, and learning resources",
    },
    {
      id: "finance",
      title: "Financial Services",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Inquire about fees, scholarships, and payment plans",
    },
    {
      id: "counseling",
      title: "Student Counseling",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Professional guidance for academic and personal challenges",
    },
    {
      id: "admin",
      title: "Administrative Help",
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description:
        "Assistance with documentation, ID cards, and general queries",
    },
  ];

  const quickActions = [
    {
      title: "Book Extra Class",
      icon: Calendar,
      action: () => setShowAppointment(true),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Ask Quick Question",
      icon: MessageSquare,
      action: () => setShowQueryForm(true),
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Track Request",
      icon: Activity,
      action: () => {},
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const upcomingSessions = [
    {
      subject: "Mathematics",
      teacher: "Dr. Smith",
      time: "Tomorrow, 3:00 PM",
      type: "Extra Class",
    },
    {
      subject: "Physics",
      teacher: "Prof. Johnson",
      time: "Friday, 4:30 PM",
      type: "Doubt Clearing",
    },
  ];

  return (
    <div className="w-full max-w-6xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Student Support Hub
          </h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
          <MessagesSquare className="w-4 h-4" />
          Live Chat
        </button>
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

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
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
                    <p className="text-sm text-gray-600">{session.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{session.time}</p>
                  <p className="text-sm text-gray-600">{session.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Query Dialog */}
      <Dialog open={showQueryForm} onOpenChange={setShowQueryForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit Your Query</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Department
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option>Academic Support</option>
                <option>Financial Services</option>
                <option>Student Counseling</option>
                <option>Administrative Help</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                placeholder="Brief subject of your query"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe your query in detail"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-2">
              Submit Query
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appointment Dialog */}
      <Dialog open={showAppointment} onOpenChange={setShowAppointment}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Book Extra Class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Computer Science</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Teacher</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Dr. Smith</option>
                <option>Prof. Johnson</option>
                <option>Mrs. Williams</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Date
              </label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Time
              </label>
              <input type="time" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Topics to Cover
              </label>
              <textarea
                rows={3}
                placeholder="List the topics you'd like to discuss"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-2">
              Book Session
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentSupportHub;
