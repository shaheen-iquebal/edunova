import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  BookOpen,
  Target,
  Clock,
  AlertCircle,
} from "lucide-react";

const ProductivityTracker = () => {
  // Sample data - in real app, this would come from an API
  const academicProgress = {
    completedPercentage: 60,
    daysRemaining: 72,
    currentTerm: "Spring 2024",
    startDate: "January 15, 2024",
    endDate: "May 30, 2024",
  };

  const assignments = [
    {
      id: 1,
      title: "Data Structures Final Project",
      subject: "Computer Science",
      dueDate: "2024-04-15",
      priority: "high",
      completion: 45,
    },
    {
      id: 2,
      title: "Literature Review",
      subject: "English",
      dueDate: "2024-04-10",
      priority: "medium",
      completion: 75,
    },
    {
      id: 3,
      title: "Physics Lab Report",
      subject: "Physics",
      dueDate: "2024-04-08",
      priority: "high",
      completion: 20,
    },
  ];

  const goals = [
    {
      id: 1,
      title: "Complete Python Certification",
      deadline: "2024-05-01",
      progress: 80,
      category: "Technical Skills",
    },
    {
      id: 2,
      title: "Maintain 3.8 GPA",
      deadline: "2024-05-30",
      progress: 90,
      category: "Academic",
    },
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return colors[priority];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Academic Progress Card */}
      <Card className="lg:col-span-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Academic Year Progress
          </CardTitle>
          <CardDescription>
            {academicProgress.currentTerm} ({academicProgress.startDate} -{" "}
            {academicProgress.endDate})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium">Academic Year Completion</span>
                <span className="text-muted-foreground">
                  {academicProgress.completedPercentage}%
                </span>
              </div>
              <Progress
                value={academicProgress.completedPercentage}
                className="h-2"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{academicProgress.daysRemaining} days remaining</span>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {Math.round((academicProgress.daysRemaining / 180) * 100)}% of
                year remaining
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Assignments Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Upcoming Assignments
          </CardTitle>
          <CardDescription>
            Track your pending assignments and their progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {assignment.subject}
                    </p>
                  </div>
                  <Badge className={getPriorityColor(assignment.priority)}>
                    {assignment.priority}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{assignment.completion}%</span>
                  </div>
                  <Progress value={assignment.completion} className="h-1.5" />
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <AlertCircle className="h-3 w-3" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Current Goals
          </CardTitle>
          <CardDescription>
            Track your academic and personal goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{goal.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {goal.category}
                    </p>
                  </div>
                  <Badge variant="outline">{goal.progress}%</Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={goal.progress} className="h-1.5" />
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Target: {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductivityTracker;
