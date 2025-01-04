import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  ListTodo,
} from "lucide-react";

const TeacherReminders = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Sample reminders data with current month and year
  const reminders = [
    {
      id: 1,
      title: "Submit Progress Reports",
      date: new Date(currentYear, currentMonth, 15, 14, 30),
      priority: "high",
      status: "pending",
      description: "Complete and submit progress reports for Class 10A",
      category: "Administrative",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: new Date(currentYear, currentMonth, 18, 16, 0),
      priority: "medium",
      status: "pending",
      description: "Meeting with parents of struggling students",
      category: "Meetings",
    },
    {
      id: 3,
      title: "Math Quiz Preparation",
      date: new Date(currentYear, currentMonth, 20, 9, 0),
      priority: "high",
      status: "completed",
      description: "Prepare quiz questions for Chapter 5",
      category: "Academic",
    },
    {
      id: 4,
      title: "Department Meeting",
      date: new Date(currentYear, currentMonth, 22, 13, 30),
      priority: "medium",
      status: "pending",
      description: "Monthly mathematics department meeting",
      category: "Meetings",
    },
    {
      id: 5,
      title: "Grade Assignments",
      date: new Date(currentYear, currentMonth, 25, 15, 0),
      priority: "high",
      status: "pending",
      description: "Grade Chapter 4 homework assignments",
      category: "Academic",
    },
  ];

  // Initialize selectedReminder with the first reminder
  const [selectedReminder, setSelectedReminder] = useState(reminders[0]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Administrative":
        return "bg-purple-100 text-purple-800";
      case "Academic":
        return "bg-blue-100 text-blue-800";
      case "Meetings":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const ReminderCard = ({ reminder }) => (
    <Card
      className={`mb-4 cursor-pointer transform transition-all duration-200 hover:scale-[1.02] ${
        selectedReminder?.id === reminder.id ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={() => setSelectedReminder(reminder)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{reminder.title}</h3>
              {reminder.status === "completed" ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {formatDate(reminder.date)}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getPriorityColor(reminder.priority)}>
              {reminder.priority}
            </Badge>
            <Badge className={getCategoryColor(reminder.category)}>
              {reminder.category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CalendarView = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const getDayReminders = (day) => {
      return reminders.filter((reminder) => reminder.date.getDate() === day);
    };

    return (
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-semibold p-2 bg-gray-100 rounded"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayReminders = getDayReminders(day);
          return (
            <div
              key={day}
              className={`p-2 min-h-24 border rounded hover:bg-gray-50 transition-colors ${
                dayReminders.length > 0 ? "ring-1 ring-blue-200 bg-blue-50" : ""
              }`}
            >
              <div className="font-medium mb-1">{day}</div>
              {dayReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`text-xs p-1 mb-1 rounded ${getPriorityColor(
                    reminder.priority
                  )}`}
                  title={reminder.title}
                >
                  {reminder.title.length > 15
                    ? reminder.title.substring(0, 15) + "..."
                    : reminder.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <CalendarDays className="w-6 h-6" />
          Teacher Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <ListTodo className="w-4 h-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">All Reminders</h3>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                    + Add Reminder
                  </Button>
                </div>
                {reminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
              {selectedReminder && (
                <Card className="h-fit sticky top-4">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
                    <CardTitle>Reminder Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {selectedReminder.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {selectedReminder.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{formatDate(selectedReminder.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={getPriorityColor(
                            selectedReminder.priority
                          )}
                        >
                          Priority: {selectedReminder.priority}
                        </Badge>
                        <Badge
                          className={getCategoryColor(
                            selectedReminder.category
                          )}
                        >
                          {selectedReminder.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarView />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeacherReminders;
