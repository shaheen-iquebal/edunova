import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAssignment } from "react-icons/md";
import {
  Calendar,
  Clock,
  BookOpen,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Plus,
  FileWarning,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TeacherAssignmentsPage = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedChapter, setSelectedChapter] = useState("all");

  // Sample data - in real app, this would come from API
  const classes = ["Class 9A", "Class 9B", "Class 10A", "Class 10B"];
  const subjects = ["Mathematics", "Physics", "Chemistry", "Computer Science"];
  const chapters = [
    "Chapter 1: Introduction",
    "Chapter 2: Basic Concepts",
    "Chapter 3: Advanced Topics",
  ];

  const assignments = [
    {
      id: 2,
      title: "Sorting Algorithm Analysis",
      class: "Class 10A",
      subject: "Computer Science",
      chapter: "Chapter 4: Algorithms",
      dueDate: "2024-04-22",
      totalStudents: 30,
      submittedCount: 20,
      averageScore: 78,
      description: "Compare and analyze different sorting algorithms.",
      requirements: ["Analysis report", "Code implementation", "Sample data"],
      estimatedTime: "10 hours",
    },
    {
      id: 3,
      title: "Introduction to Shakespearean Drama",
      class: "Class 9B",
      subject: "English Literature",
      chapter: "Chapter 5: Elizabethan Era",
      dueDate: "2024-04-18",
      totalStudents: 28,
      submittedCount: 25,
      averageScore: 92,
      description: "Write an essay analyzing the themes in 'Hamlet'.",
      requirements: ["Essay (1000 words)", "Annotated references"],
      estimatedTime: "8 hours",
    },
    {
      id: 4,
      title: "Chemical Reactions Lab Report",
      class: "Class 11C",
      subject: "Chemistry",
      chapter: "Chapter 6: Reaction Dynamics",
      dueDate: "2024-04-20",
      totalStudents: 32,
      submittedCount: 28,
      averageScore: 88,
      description:
        "Document observations and results from the chemical reactions lab.",
      requirements: ["Lab report", "Graphs", "Error analysis"],
      estimatedTime: "5 hours",
    },
    {
      id: 5,
      title: "Statistics and Probability",
      class: "Class 12A",
      subject: "Mathematics",
      chapter: "Chapter 8: Probability Distributions",
      dueDate: "2024-04-25",
      totalStudents: 35,
      submittedCount: 30,
      averageScore: 81,
      description: "Solve and analyze probability problems.",
      requirements: ["Solutions", "Graphical representations", "Conclusion"],
      estimatedTime: "12 hours",
    },
    {
      id: 6,
      title: "World War II Causes",
      class: "Class 10B",
      subject: "History",
      chapter: "Chapter 10: Global Conflicts",
      dueDate: "2024-04-21",
      totalStudents: 27,
      submittedCount: 22,
      averageScore: 84,
      description: "Write a detailed report on the causes of World War II.",
      requirements: ["Report (1500 words)", "Citations", "Timeline"],
      estimatedTime: "10 hours",
    },
  ];

  const lateSubmissions = [
    {
      studentId: "ST003",
      name: "Michael Lee",
      class: "Class 10A",
      subject: "Computer Science",
      assignment: "Data Structures Implementation",
      dueDate: "2024-04-15",
      status: "Not Started",
      lastActive: "2024-03-30",
    },
    {
      studentId: "ST004",
      name: "Emily Davis",
      class: "Class 10A",
      subject: "Computer Science",
      assignment: "Sorting Algorithm Analysis",
      dueDate: "2024-04-22",
      status: "In Progress (50%)",
      lastActive: "2024-04-12",
    },
    {
      studentId: "ST005",
      name: "Samuel Johnson",
      class: "Class 11C",
      subject: "Chemistry",
      assignment: "Chemical Reactions Lab Report",
      dueDate: "2024-04-20",
      status: "Not Started",
      lastActive: "2024-03-28",
    },
    {
      studentId: "ST006",
      name: "Sophia Brown",
      class: "Class 9B",
      subject: "English Literature",
      assignment: "Introduction to Shakespearean Drama",
      dueDate: "2024-04-18",
      status: "In Progress (40%)",
      lastActive: "2024-04-08",
    },
    {
      studentId: "ST007",
      name: "Oliver Martinez",
      class: "Class 12A",
      subject: "Mathematics",
      assignment: "Statistics and Probability",
      dueDate: "2024-04-25",
      status: "In Progress (20%)",
      lastActive: "2024-04-10",
    },
  ];

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <MdAssignment className="inline mr-2 mb-2" />
            Assignment Management
          </h1>
          <p className="text-gray-600">
            Create and manage assignments for your classes
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/generate-assignments")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Generate New Assignment
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger>
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls} value={cls}>
                {cls}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((sub) => (
              <SelectItem key={sub} value={sub}>
                {sub}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedChapter} onValueChange={setSelectedChapter}>
          <SelectTrigger>
            <SelectValue placeholder="Select Chapter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Chapters</SelectItem>
            {chapters.map((chap) => (
              <SelectItem key={chap} value={chap}>
                {chap}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-2xl font-bold">{assignments.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Late Submissions</p>
                <p className="text-2xl font-bold">{lateSubmissions.length}</p>
              </div>
              <FileWarning className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Completion</p>
                <p className="text-2xl font-bold">83%</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Late Submissions Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Late/Missing Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Student ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Class</th>
                  <th className="px-4 py-2 text-left">Assignment</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {lateSubmissions.map((submission, index) => (
                  <tr
                    key={submission.studentId}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2">{submission.studentId}</td>
                    <td className="px-4 py-2">{submission.name}</td>
                    <td className="px-4 py-2">{submission.class}</td>
                    <td className="px-4 py-2">{submission.assignment}</td>
                    <td className="px-4 py-2">
                      {new Date(submission.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          submission.status.includes("Not Started")
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{submission.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{assignment.title}</CardTitle>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>{assignment.class}</span>
                    <span>•</span>
                    <span>{assignment.subject}</span>
                    <span>•</span>
                    <span>{assignment.chapter}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Submission Rate</div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(
                      (assignment.submittedCount / assignment.totalStudents) *
                        100
                    )}
                    %
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Class Progress</p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (assignment.submittedCount / assignment.totalStudents) *
                        100
                      }
                      className="flex-1"
                    />
                    <span className="text-sm font-medium">
                      {assignment.submittedCount}/{assignment.totalStudents}{" "}
                      Submitted
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Est. time: {assignment.estimatedTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Avg. Score: {assignment.averageScore}%
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherAssignmentsPage;
