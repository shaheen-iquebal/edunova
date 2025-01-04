import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  Bot,
  Loader2,
  Book,
  Users,
  Clock,
  Calendar as CalendarIcon,
  GraduationCap,
  FileSpreadsheet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaChalkboardTeacher } from "react-icons/fa";

const TeacherCalendar = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPlan, setAiPlan] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample teacher events data
  const teacherEvents = {
    "2025-01-08": [
      {
        type: "class",
        title: "Physics 101 Lecture",
        time: "10:00 AM",
        location: "Room 201",
        class: "Grade 11A",
      },
      {
        type: "duty",
        title: "Lunch Supervision",
        time: "12:30 PM",
        location: "Cafeteria",
      },
    ],
    "2025-01-15": [
      {
        type: "assessment",
        title: "Grade Data Structures Projects",
        time: "2:00 PM",
        deadline: "April 17",
      },
      {
        type: "meeting",
        title: "Department Meeting",
        time: "3:30 PM",
        location: "Staff Room",
      },
    ],
    "2025-01-20": [
      {
        type: "holiday",
        title: "Spring Break",
        duration: "1 week",
      },
    ],
    "2025-01-01": [
      {
        type: "admin",
        title: "Submit Term Reports",
        deadline: "End of Day",
      },
      {
        type: "meeting",
        title: "Parent-Teacher Conferences",
        time: "1:00 PM - 5:00 PM",
        location: "Main Hall",
      },
    ],
    "2025-01-25": [
      {
        type: "exam",
        title: "Proctor Final Examinations",
        duration: "2 weeks",
        location: "Various Rooms",
      },
    ],
  };

  // Helper function to generate month data
  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const monthData = [];
    let week = new Array(7).fill(null);

    for (let i = 0; i < startingDay; i++) {
      week[i] = null;
    }

    let dayCounter = 1;
    for (let i = startingDay; i < 7; i++) {
      week[i] = dayCounter++;
    }
    monthData.push(week);

    week = [];
    while (dayCounter <= daysInMonth) {
      week = [];
      for (let i = 0; i < 7; i++) {
        if (dayCounter <= daysInMonth) {
          week.push(dayCounter++);
        } else {
          week.push(null);
        }
      }
      monthData.push(week);
    }

    return monthData;
  };

  // Helper function to get date string
  const getDateString = (day) => {
    if (!day) return null;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return date.toISOString().split("T")[0];
  };

  // Get color based on event type
  const getEventTypeColor = (type) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800";
      case "assessment":
        return "bg-purple-100 text-purple-800";
      case "exam":
        return "bg-red-100 text-red-800";
      case "meeting":
        return "bg-amber-100 text-amber-800";
      case "admin":
        return "bg-gray-100 text-gray-800";
      case "duty":
        return "bg-green-100 text-green-800";
      case "holiday":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Month navigation
  const changeMonth = (increment) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  // AI workload analysis generation
  const generateAIWorkload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiPlan({
        summary:
          "Based on your current teaching schedule and responsibilities, here's your optimized workload management plan:",
        recommendations: [
          {
            title: "Class Preparation",
            items: [
              "Prepare Physics 101 lab materials 2 days in advance",
              "Schedule weekly review sessions for struggling students",
              "Create differentiated assignments for mixed-ability groups",
            ],
          },
          {
            title: "Assessment Schedule",
            items: [
              "Grade assignments within 48 hours of submission",
              "Prepare exam questions 2 weeks before test date",
              "Schedule regular formative assessments",
            ],
          },
          {
            title: "Administrative Tasks",
            items: [
              "Complete attendance records by end of day",
              "Update gradebook every Friday",
              "Submit weekly lesson plans by Sunday evening",
            ],
          },
        ],
        metrics: {
          teachingHours: 18,
          studentCount: 120,
          pendingGrading: 25,
          officeHours: 5,
        },
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-6 w-full">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <FaChalkboardTeacher className="inline mr-2 mb-2" />
            Teacher Calendar
          </h1>
          <p className="text-gray-600">
            Manage classes, duties, and academic responsibilities
          </p>
        </div>

        {/* AI Workload Analysis Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2 items-center bg-blue-600">
              <Bot className="h-5 w-5" />
              Analyze Workload
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>AI Workload Analysis</DialogTitle>
              <DialogDescription>
                Get insights and recommendations for managing your teaching
                responsibilities
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto pr-2">
              {/* Initial State */}
              {!aiPlan && !isGenerating && (
                <div className="text-center py-8">
                  <Bot className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">
                    Ready to analyze your workload?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The AI will analyze your:
                  </p>
                  <div className="flex justify-center gap-8 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Class sizes
                    </div>
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Grading load
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Teaching hours
                    </div>
                  </div>
                  <Button onClick={generateAIWorkload}>Analyze Workload</Button>
                </div>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-blue-500" />
                  <p className="text-gray-600">
                    Analyzing your teaching workload...
                  </p>
                </div>
              )}

              {/* Results State */}
              {aiPlan && !isGenerating && (
                <div className="space-y-6 py-4">
                  <p className="text-gray-600">{aiPlan.summary}</p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                          <div className="text-sm text-gray-600">
                            Teaching Hours/Week
                          </div>
                          <div className="text-xl font-bold">
                            {aiPlan.metrics.teachingHours}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <Users className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                          <div className="text-sm text-gray-600">
                            Total Students
                          </div>
                          <div className="text-xl font-bold">
                            {aiPlan.metrics.studentCount}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <FileSpreadsheet className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                          <div className="text-sm text-gray-600">
                            Pending Grading
                          </div>
                          <div className="text-xl font-bold">
                            {aiPlan.metrics.pendingGrading}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <GraduationCap className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                          <div className="text-sm text-gray-600">
                            Office Hours/Week
                          </div>
                          <div className="text-xl font-bold">
                            {aiPlan.metrics.officeHours}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recommendations Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {aiPlan.recommendations.map((section, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {section.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dialog Footer */}
            {aiPlan && !isGenerating && (
              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <Button variant="outline" onClick={() => setAiPlan(null)}>
                  Reset
                </Button>
                <Button>Save Analysis</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar Legend */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm">Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span className="text-sm">Assessments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-sm">Meetings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-500"></span>
              <span className="text-sm">Admin Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-sm">Duties</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </CardTitle>
              <div className="flex gap-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium p-2">
                  {day}
                </div>
              ))}
              {getMonthData(currentDate).map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  const dateString = getDateString(day);
                  const hasEvents = dateString && teacherEvents[dateString];
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`
                        p-2 min-h-16 border rounded-lg
                        ${day ? "hover:bg-gray-50 cursor-pointer" : ""}
                        ${selectedDate === dateString ? "bg-blue-50" : ""}
                      `}
                      onClick={() => day && setSelectedDate(dateString)}
                    >
                      {day && (
                        <>
                          <div
                            className={`text-sm ${
                              hasEvents ? "font-bold" : ""
                            }`}
                          >
                            {day}
                          </div>
                          {hasEvents && (
                            <div className="mt-1">
                              {teacherEvents[dateString].map((event, index) => (
                                <div
                                  key={index}
                                  className={`text-xs p-1 rounded-md mb-1 truncate ${getEventTypeColor(
                                    event.type
                                  )}`}
                                >
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Event Details Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              teacherEvents[selectedDate] ? (
                <div className="space-y-4">
                  {teacherEvents[selectedDate].map((event, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div
                        className={`inline-block px-2 py-1 rounded-md text-xs mb-2 ${getEventTypeColor(
                          event.type
                        )}`}
                      >
                        {event.type.toUpperCase()}
                      </div>
                      <h3 className="font-medium mb-1">{event.title}</h3>
                      {event.time && (
                        <p className="text-sm text-gray-600">
                          Time: {event.time}
                        </p>
                      )}
                      {event.location && (
                        <p className="text-sm text-gray-600">
                          Location: {event.location}
                        </p>
                      )}
                      {event.duration && (
                        <p className="text-sm text-gray-600">
                          Duration: {event.duration}
                        </p>
                      )}
                      {event.class && (
                        <p className="text-sm text-gray-600">
                          Class: {event.class}
                        </p>
                      )}
                      {event.deadline && (
                        <p className="text-sm text-gray-600">
                          Deadline: {event.deadline}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">
                  No events scheduled for this date.
                </p>
              )
            ) : (
              <p className="text-gray-600 text-sm">
                Select a date to view events.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherCalendar;
