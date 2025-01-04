import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, Calendar, AlertCircle } from "lucide-react";

const RemindersDeadlines = () => {
  // Sample data - in a real app, this would come from props or an API
  const examData = {
    subject: "Math",
    date: "2024-12-30", // Example date
  };

  const reminders = [
    {
      id: 1,
      title: "Physics Assignment",
      dueDate: "2024-12-29",
      type: "assignment",
    },
    {
      id: 2,
      title: "Chemistry Lab Report",
      dueDate: "2024-12-31",
      type: "report",
    },
    {
      id: 3,
      title: "Literature Essay Draft",
      dueDate: "2025-01-02",
      type: "essay",
    },
  ];

  // Calculate days remaining until exam
  const calculateDaysRemaining = (targetDate) => {
    const today = new Date();
    const examDate = new Date(targetDate);
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExam = calculateDaysRemaining(examData.date);

  // Sort reminders by due date
  const sortedReminders = [...reminders].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Reminders & Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Exam Countdown */}
        <Alert className="bg-blue-50 border-blue-200">
          <Clock className="h-4 w-4" />
          <AlertTitle className="ml-2">Exam Countdown</AlertTitle>
          <AlertDescription className="ml-6">
            {daysUntilExam} days left until the {examData.subject} exam
          </AlertDescription>
        </Alert>

        {/* Upcoming Reminders */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-gray-600">
            Upcoming Tasks
          </h3>
          {sortedReminders.map((reminder) => (
            <Alert
              key={reminder.id}
              className={`
                ${
                  reminder.type === "assignment"
                    ? "bg-green-50 border-green-200"
                    : ""
                }
                ${
                  reminder.type === "report"
                    ? "bg-yellow-50 border-yellow-200"
                    : ""
                }
                ${
                  reminder.type === "essay"
                    ? "bg-purple-50 border-purple-200"
                    : ""
                }
              `}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="ml-2">{reminder.title}</AlertTitle>
              <AlertDescription className="ml-6">
                Due: {new Date(reminder.dueDate).toLocaleDateString()}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RemindersDeadlines;
