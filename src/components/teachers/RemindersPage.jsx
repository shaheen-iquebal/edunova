// src/components/RemindersPage.js
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  CheckCircle,
  Bell,
  Calendar as CalendarIcon,
  List,
} from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styling for the calendar

const reminders = [
  {
    id: 1,
    title: "Grade Assignments",
    description: "Grade the latest batch of student assignments by Friday.",
    date: "2023-10-27",
    completed: false,
  },
  {
    id: 2,
    title: "Prepare Lesson Plan",
    description: "Prepare the lesson plan for next week’s classes.",
    date: "2023-10-30",
    completed: true,
  },
  {
    id: 3,
    title: "Parent-Teacher Meetings",
    description: "Schedule and confirm parent-teacher meetings for next month.",
    date: "2023-11-05",
    completed: false,
  },
];

const RemindersPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleMarkAsDone = (id) => {
    console.log(`Marked reminder ${id} as done.`);
    // Add logic to update the reminder status
  };

  const getRemindersForDate = (date) => {
    return reminders.filter(
      (reminder) =>
        new Date(reminder.date).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Bell className="mr-2" /> Reminders
      </h1>
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">
            <List className="mr-2" /> List View
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarIcon className="mr-2" /> Calendar View
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="grid gap-4 mt-4">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{reminder.title}</span>
                    {reminder.completed && (
                      <CheckCircle className="text-green-500" />
                    )}
                  </CardTitle>
                  <CardDescription>{reminder.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="mr-2" />
                    <span>Due: {reminder.date}</span>
                  </div>
                  {!reminder.completed && (
                    <Button
                      variant="outline"
                      onClick={() => handleMarkAsDone(reminder.id)}
                    >
                      Mark as Done
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="calendar">
          <div className="mt-4 flex gap-6">
            <div className="flex-1">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="border rounded-lg shadow-sm"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">
                Reminders for {selectedDate.toDateString()}
              </h2>
              <div className="grid gap-4">
                {getRemindersForDate(selectedDate).map((reminder) => (
                  <Card key={reminder.id} className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{reminder.title}</span>
                        {reminder.completed && (
                          <CheckCircle className="text-green-500" />
                        )}
                      </CardTitle>
                      <CardDescription>{reminder.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="mr-2" />
                        <span>Due: {reminder.date}</span>
                      </div>
                      {!reminder.completed && (
                        <Button
                          variant="outline"
                          onClick={() => handleMarkAsDone(reminder.id)}
                        >
                          Mark as Done
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RemindersPage;
