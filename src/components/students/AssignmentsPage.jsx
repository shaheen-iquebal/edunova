import { MdAssignment } from "react-icons/md";
import {
  Calendar,
  Clock,
  BookOpen,
  AlertCircle,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AssignmentsPage = () => {
  const assignments = [
    {
      id: 1,
      title: "Data Structures Final Project",
      subject: "Computer Science",
      priority: "high",
      progress: 45,
      dueDate: "2024-04-15",
      description:
        "Implement a real-world application using advanced data structures",
      requirements: [
        "Documentation",
        "Source code",
        "Test cases",
        "Performance analysis",
      ],
      estimatedTime: "15 hours",
      professor: "Dr. Smith",
    },
    {
      id: 2,
      title: "Literature Review",
      subject: "English",
      priority: "medium",
      progress: 75,
      dueDate: "2024-04-10",
      description: "Critical analysis of post-modern literature",
      requirements: [
        "Minimum 2500 words",
        "APA format",
        "At least 8 sources",
        "Peer review",
      ],
      estimatedTime: "10 hours",
      professor: "Dr. Johnson",
    },
    {
      id: 3,
      title: "Physics Lab Report",
      subject: "Physics",
      priority: "high",
      progress: 20,
      dueDate: "2024-04-08",
      description: "Detailed report on the quantum tunneling experiment",
      requirements: [
        "Data analysis",
        "Error calculations",
        "Graphs and charts",
        "Conclusion",
      ],
      estimatedTime: "8 hours",
      professor: "Dr. Chen",
    },
  ];

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

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          <MdAssignment className="inline mr-2 mb-2" />
          Upcoming Assignments
        </h1>
        <p className="text-gray-600">
          Track and manage your pending assignments
        </p>
      </div>

      {/* Summary Cards - Now using flex for better control */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Card className="flex-1 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-2xl font-bold">{assignments.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold">
                  {assignments.filter((a) => a.priority === "high").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">
                  {assignments.filter((a) => a.progress === 100).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{assignment.title}</CardTitle>
                  <p className="text-sm text-gray-600">{assignment.subject}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    assignment.priority
                  )}`}
                >
                  {assignment.priority}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Progress</p>
                  <div className="flex items-center gap-2">
                    <Progress value={assignment.progress} className="flex-1" />
                    <span className="text-sm font-medium">
                      {assignment.progress}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Estimated time: {assignment.estimatedTime}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Requirements:</p>
                  <ul className="text-sm text-gray-600 list-disc pl-5">
                    {assignment.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                {getDaysRemaining(assignment.dueDate) <= 3 && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>
                      Due in {getDaysRemaining(assignment.dueDate)} days! Make
                      sure to complete this assignment soon.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;
