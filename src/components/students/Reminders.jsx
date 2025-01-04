import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bell,
  Calendar,
  Clock,
  BookOpen,
  User2,
  GraduationCap,
  CheckCircle2,
  PlusCircle,
  Trash2,
  LayoutList,
  CalendarDays,
  Mail,
  AlarmClock,
} from "lucide-react";

const categories = {
  Study: <BookOpen className="w-4 h-4" />,
  Meeting: <User2 className="w-4 h-4" />,
  Assignment: <GraduationCap className="w-4 h-4" />,
  Library: <BookOpen className="w-4 h-4" />,
  Other: <Bell className="w-4 h-4" />,
};

// Function to generate initial reminders with current month and year
const generateInitialReminders = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Fixed days for reminders
  const reminderDays = [4, 10, 15, 17, 25];

  const reminders = [
    {
      id: 1,
      title: "Study Quantum Mechanics Chapter 4",
      category: "Study",
      datetime: new Date(year, month, reminderDays[0], 14, 0).toISOString(),
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      title: "Meet Professor Johnson - Discussion about Thesis",
      category: "Meeting",
      datetime: new Date(year, month, reminderDays[1], 11, 30).toISOString(),
      completed: false,
      priority: "medium",
    },
    {
      id: 3,
      title: "Return 'Machine Learning Basics' book",
      category: "Library",
      datetime: new Date(year, month, reminderDays[2], 16, 0).toISOString(),
      completed: true,
      priority: "low",
    },
    {
      id: 4,
      title: "Submit Mathematics Assignment",
      category: "Assignment",
      datetime: new Date(year, month, reminderDays[3], 23, 59).toISOString(),
      completed: false,
      priority: "high",
    },
    {
      id: 5,
      title: "Group Study Session - Database Systems",
      category: "Study",
      datetime: new Date(year, month, reminderDays[4], 15, 0).toISOString(),
      completed: false,
      priority: "medium",
    },
  ];

  return reminders;
};

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const CalendarView = ({ reminders, toggleComplete, deleteReminder }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Get first day of month and total days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // Create array for all calendar cells
  const days = [];
  for (let i = 0; i < 42; i++) {
    if (i < firstDay || i >= firstDay + daysInMonth) {
      days.push({ date: null, reminders: [] });
    } else {
      const date = new Date(currentYear, currentMonth, i - firstDay + 1);
      const dayReminders = reminders.filter((r) => {
        const reminderDate = new Date(r.datetime);
        return reminderDate.toDateString() === date.toDateString();
      });
      days.push({ date, reminders: dayReminders });
    }
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center font-semibold p-2">
          {day}
        </div>
      ))}
      {days.map(({ date, reminders }, i) => (
        <div
          key={i}
          className={`p-2 min-h-24 border rounded-lg ${
            date?.toDateString() === today.toDateString()
              ? "bg-blue-50 border-blue-200"
              : date
              ? "bg-white"
              : "bg-gray-50"
          }`}
        >
          {date && (
            <>
              <div className="text-right text-sm mb-1">{date.getDate()}</div>
              <ScrollArea className="h-20">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`mb-1 p-1 text-xs rounded ${
                      reminder.completed
                        ? "bg-gray-100"
                        : `${
                            reminder.priority === "high"
                              ? "bg-red-50"
                              : reminder.priority === "medium"
                              ? "bg-yellow-50"
                              : "bg-green-50"
                          }`
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleComplete(reminder.id)}
                        className={`${
                          reminder.completed
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                      </button>
                      <span
                        className={reminder.completed ? "line-through" : ""}
                      >
                        {reminder.title}
                      </span>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [newReminder, setNewReminder] = useState({
    title: "",
    category: "Study",
    datetime: "",
    priority: "medium",
  });

  useEffect(() => {
    setReminders(generateInitialReminders());
  }, []);

  const toggleComplete = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const addReminder = (e) => {
    e.preventDefault();
    const id = Math.max(...reminders.map((r) => r.id)) + 1;
    setReminders([
      {
        ...newReminder,
        id,
        completed: false,
      },
      ...reminders,
    ]);
    setShowAddForm(false);
    setNewReminder({
      title: "",
      category: "Study",
      datetime: "",
      priority: "medium",
    });
  };

  const formatDate = (datetime) => {
    return new Date(datetime).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <AlarmClock className="w-6 h-6" />
            Reminders
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setViewMode(viewMode === "list" ? "calendar" : "list")
              }
            >
              {viewMode === "list" ? (
                <>
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Calendar View
                </>
              ) : (
                <>
                  <LayoutList className="w-4 h-4 mr-2" />
                  List View
                </>
              )}
            </Button>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </div>
        <Alert className="bg-blue-50 border-blue-200">
          <Mail className="w-4 h-4" />
          <AlertDescription>
            You'll receive email notifications for all your reminders 24 hours
            and 1 hour before they're due.
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <form
            onSubmit={addReminder}
            className="mb-6 p-4 bg-gray-50 rounded-lg"
          >
            <div className="space-y-4">
              <Input
                placeholder="Reminder title"
                value={newReminder.title}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, title: e.target.value })
                }
                required
                className="w-full"
              />
              <div className="flex gap-4">
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1"
                  value={newReminder.category}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, category: e.target.value })
                  }
                >
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1"
                  value={newReminder.priority}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, priority: e.target.value })
                  }
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              <Input
                type="datetime-local"
                value={newReminder.datetime}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, datetime: e.target.value })
                }
                required
                className="w-full"
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Add Reminder
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}

        {viewMode === "list" ? (
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    reminder.completed ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleComplete(reminder.id)}
                      className={
                        reminder.completed ? "text-green-600" : "text-gray-400"
                      }
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </Button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${
                            reminder.completed
                              ? "line-through text-gray-500"
                              : ""
                          }`}
                        >
                          {reminder.title}
                        </span>
                        <Badge
                          className={`${priorityColors[reminder.priority]}`}
                        >
                          {reminder.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          {categories[reminder.category]}
                          {reminder.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(reminder.datetime)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <CalendarView
            reminders={reminders}
            toggleComplete={toggleComplete}
            deleteReminder={deleteReminder}
          />
        )}
      </CardContent>
    </Card>
  );
}
