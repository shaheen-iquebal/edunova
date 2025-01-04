import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  Bot,
  Loader2,
  Book,
  Brain,
  Clock,
  Calendar as CalendarIcon,
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
import { FaCalendarAlt } from "react-icons/fa";

const AcademicCalendar = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPlan, setAiPlan] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample academic events data
  const academicEvents = {
    "2024-04-08": [
      {
        type: "exam",
        title: "Physics Midterm",
        time: "10:00 AM",
        location: "Hall A",
      },
    ],
    "2024-04-15": [
      {
        type: "assignment",
        title: "Data Structures Project Due",
        time: "11:59 PM",
        location: "Online Submission",
      },
    ],
    "2024-04-20": [
      {
        type: "holiday",
        title: "Spring Break Begins",
        duration: "1 week",
      },
    ],
    "2024-05-01": [
      {
        type: "registration",
        title: "Course Registration Opens",
        time: "9:00 AM",
      },
    ],
    "2024-05-15": [
      {
        type: "exam",
        title: "Final Examinations Begin",
        duration: "2 weeks",
      },
    ],
    "2025-01-08": [
      {
        type: "exam",
        title: "Distribution of Admin Cards",
        duration: "2 weeks",
      },
    ],
    "2025-01-11": [
      {
        type: "exam",
        title: "Final Examinations Begin",
        duration: "2 weeks",
      },
    ],
    // New exam schedule starting from 2025-01-12 for 2 weeks
    "2025-01-12": [
      {
        type: "exam",
        title: " Mathematics Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-13": [
      {
        type: "exam",
        title: " Chemistry Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-14": [
      {
        type: "exam",
        title: " Biology Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-15": [
      {
        type: "exam",
        title: " English Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-16": [],
    "2025-01-17": [
      {
        type: "exam",
        title: " Physics Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-18": [
      {
        type: "exam",
        title: " History Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-19": [],
    "2025-01-20": [],
    "2025-01-21": [
      {
        type: "exam",
        title: " Geography Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-22": [
      {
        type: "exam",
        title: " Computer Science Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-23": [
      {
        type: "exam",
        title: " Economics Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-24": [
      {
        type: "exam",
        title: " Political Science Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-25": [
      {
        type: "exam",
        title: " Philosophy Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-26": [],
    "2025-01-27": [],
    "2025-01-28": [
      {
        type: "exam",
        title: " Music Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
    "2025-01-29": [
      {
        type: "exam",
        title: " Art Exam",
        time: "9:00 AM",
        location: "Hall A",
      },
    ],
  };

  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const monthData = [];
    let week = new Array(7).fill(null);

    // Fill in empty days at the start
    for (let i = 0; i < startingDay; i++) {
      week[i] = null;
    }

    // Fill in the days
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

  const getDateString = (day) => {
    if (!day) return null;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return date.toISOString().split("T")[0];
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800";
      case "assignment":
        return "bg-blue-100 text-blue-800";
      case "holiday":
        return "bg-green-100 text-green-800";
      case "registration":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const changeMonth = (increment) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  const generateAIPlan = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setAiPlan({
        summary:
          "Based on your current academic progress and upcoming deadlines, here's your personalized study plan:",
        recommendations: [
          {
            title: "Priority Focus Areas",
            items: [
              "Dedicate 3 hours/week for Physics Lab preparation",
              "Increase Data Structures practice - critical for upcoming project",
              "Schedule literature review drafts in 500-word increments",
            ],
          },
          {
            title: "Weekly Schedule",
            items: [
              "Monday & Wednesday: Data Structures (2 hours each)",
              "Tuesday & Thursday: Physics Lab work (2 hours each)",
              "Friday: Literature Review (3 hours)",
              "Weekend: Project work and revision",
            ],
          },
          {
            title: "Exam Preparation",
            items: [
              "Start Physics exam revision 3 weeks before date",
              "Complete 2 practice tests per week",
              "Form study group for Data Structures project",
            ],
          },
        ],
        metrics: {
          studyHours: 15,
          assignmentLoad: "Medium",
          examReadiness: "On Track",
          suggestedBreaks: 2,
        },
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <FaCalendarAlt className="inline mr-2 mb-2" />
            Academic Calendar
          </h1>
          <p className="text-gray-600">
            View important academic dates, exams, and deadlines
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2 items-center bg-rose-600">
              <Bot className="h-5 w-5" />
              Get AI Study Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>AI Study Planner</DialogTitle>
              <DialogDescription>
                Get a personalized study plan based on your academic calendar
                and curriculum
              </DialogDescription>
            </DialogHeader>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto pr-2">
              {!aiPlan && !isGenerating && (
                <div className="text-center py-8">
                  <Bot className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">
                    Ready to create your study plan?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The AI will analyze your:
                  </p>
                  <div className="flex justify-center gap-8 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Current academic calendar
                    </div>
                    <div className="flex items-center gap-2">
                      <Book className="h-4 w-4" />
                      Course curriculum
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Learning style
                    </div>
                  </div>
                  <Button onClick={generateAIPlan}>Generate Study Plan</Button>
                </div>
              )}

              {isGenerating && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-blue-500" />
                  <p className="text-gray-600">
                    Analyzing your academic data...
                  </p>
                </div>
              )}

              {aiPlan && !isGenerating && (
                <div className="space-y-6 py-4">
                  <p className="text-gray-600">{aiPlan.summary}</p>

                  {/* Metrics Overview - Grid layout */}
                  <div className="grid grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                          <div className="text-sm text-gray-600">
                            Weekly Study Hours
                          </div>
                          <div className="text-xl font-bold">
                            {aiPlan.metrics.studyHours}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <Book className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                          <div className="text-sm text-gray-600">
                            Assignment Load
                          </div>
                          <div className="text-xl font-bold">
                            {aiPlan.metrics.assignmentLoad}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <Brain className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                          <div className="text-sm text-gray-600">
                            Exam Readiness
                          </div>
                          <div className="text-xl font-bold">
                            {aiPlan.metrics.examReadiness}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <CalendarIcon className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                          <div className="text-sm text-gray-600">
                            Daily Breaks
                          </div>
                          <div className="text-xl font-bold">
                            {aiPlan.metrics.suggestedBreaks}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recommendations - Two column layout */}
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

            {/* Fixed footer for buttons */}
            {aiPlan && !isGenerating && (
              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <Button variant="outline" onClick={() => setAiPlan(null)}>
                  Reset
                </Button>
                <Button>Save Plan</Button>
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
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-sm">Exams</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm">Assignments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-sm">Holidays</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span className="text-sm">Registration</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar Grid */}
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
                  const hasEvents = dateString && academicEvents[dateString];
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
                              {academicEvents[dateString].map(
                                (event, index) => (
                                  <div
                                    key={index}
                                    className={`text-xs p-1 rounded-md mb-1 truncate ${getEventTypeColor(
                                      event.type
                                    )}`}
                                  >
                                    {event.title}
                                  </div>
                                )
                              )}
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

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              academicEvents[selectedDate] ? (
                <div className="space-y-4">
                  {academicEvents[selectedDate].map((event, index) => (
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

export default AcademicCalendar;

// We are also trying to integrate AI tools. So is it any benefit if add a button that a student can use to ask the AI to plan his academic year study plan? since the AI will have access to his data and scholl curriculum. If yes then maybe we can add a section somewhere as a dummy to represent the function?
