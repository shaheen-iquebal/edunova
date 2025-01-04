import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Brain,
  ChevronRight,
  Sparkles,
  BarChart,
  Book,
  Users,
  User,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Mock Data
const performanceData = [
  { month: "Jan", avgScore: 85, classAvg: 78, attendance: 92 },
  { month: "Feb", avgScore: 82, classAvg: 76, attendance: 88 },
  { month: "Mar", avgScore: 88, classAvg: 79, attendance: 94 },
  { month: "Apr", avgScore: 90, classAvg: 82, attendance: 96 },
  { month: "May", avgScore: 87, classAvg: 80, attendance: 91 },
];

const subjectPerformance = [
  { subject: "Mathematics", score: 88, predicted: 92 },
  { subject: "Physics", score: 85, predicted: 88 },
  { subject: "Chemistry", score: 82, predicted: 86 },
  { subject: "Biology", score: 90, predicted: 94 },
];

const studentStrengths = [
  { category: "Problem Solving", score: 85 },
  { category: "Critical Thinking", score: 92 },
  { category: "Communication", score: 78 },
  { category: "Teamwork", score: 88 },
];

const mockStudents = [
  {
    id: "S001",
    name: "Alex Johnson",
    performance: 92,
    attendance: 95,
    trend: "improving",
    subjects: {
      Mathematics: 94,
      Physics: 88,
      Chemistry: 90,
      Biology: 86,
    },
  },
  {
    id: "S002",
    name: "Sarah Williams",
    performance: 88,
    attendance: 92,
    trend: "stable",
    subjects: {
      Mathematics: 86,
      Physics: 90,
      Chemistry: 85,
      Biology: 92,
    },
  },
  {
    id: "S003",
    name: "Michael Brown",
    performance: 85,
    attendance: 88,
    trend: "improving",
    subjects: {
      Mathematics: 82,
      Physics: 85,
      Chemistry: 88,
      Biology: 84,
    },
  },
];

// Component Definitions
const AIBadge = ({ text }) => (
  <div className="inline-flex items-center px-3 py-1 space-x-1 text-sm bg-purple-100 text-purple-800 rounded-full">
    <Sparkles className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

const PerformanceCard = ({ title, value, change, icon: Icon }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${
            change >= 0 ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          />
        </div>
      </div>
      <div
        className={`mt-2 text-sm ${
          change >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {change >= 0 ? "+" : ""}
        {change}% from last month
      </div>
    </CardContent>
  </Card>
);

const StudentCard = ({ student, onAnalyze }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      onAnalyze(student);
    }, 2000);
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-gray-500" />
            <div>
              <h3 className="font-medium">{student.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">
                  Performance: {student.performance}%
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  Attendance: {student.attendance}%
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="transition-all hover:bg-blue-50"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PerformanceChart = ({ data }) => (
  <div className="w-full h-[300px] flex justify-center">
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="avgScore"
        stroke="#8884d8"
        name="Student Score"
      />
      <Line
        type="monotone"
        dataKey="classAvg"
        stroke="#82ca9d"
        name="Class Average"
      />
    </LineChart>
  </div>
);

const SubjectPerformanceChart = ({ data }) => (
  <div className="w-full h-[300px] flex justify-center">
    <RechartsBarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="subject" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="score" fill="#8884d8" name="Current Score" />
      <Bar dataKey="predicted" fill="#82ca9d" name="Predicted Score" />
    </RechartsBarChart>
  </div>
);

const StrengthChart = ({ data }) => (
  <div className="w-full h-[200px] flex justify-center">
    <RechartsBarChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="score" fill="#82ca9d" />
    </RechartsBarChart>
  </div>
);

const AnalyticsSelector = () => {
  const [selectedClass, setSelectedClass] = useState("10A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const mockClasses = ["10A", "10B", "11A", "11B"];
  const mockSubjects = ["Mathematics", "Physics", "Chemistry", "Biology"];

  const handleAnalyzeStudent = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                AI-Powered Student Analytics
              </CardTitle>
              <CardDescription>
                Real-time insights powered by advanced machine learning
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <AIBadge text="Neural Analysis" />
              <AIBadge text="Predictive Insights" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Performance Overview Cards */}
          <div className="grid grid-cols-4 gap-4">
            <PerformanceCard
              title="Class Average"
              value="87%"
              change={2.5}
              icon={TrendingUp}
            />
            <PerformanceCard
              title="Attendance Rate"
              value="92%"
              change={1.8}
              icon={Users}
            />
            <PerformanceCard
              title="Engagement Score"
              value="8.5"
              change={-0.5}
              icon={Brain}
            />
            <PerformanceCard
              title="Achievement Index"
              value="94"
              change={3.2}
              icon={Award}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class Section</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {mockSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart data={performanceData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <SubjectPerformanceChart data={subjectPerformance} />
              </CardContent>
            </Card>
          </div>

          {/* Student List */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Student Analysis</h3>
            <div className="space-y-3">
              {mockStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onAnalyze={handleAnalyzeStudent}
                />
              ))}
            </div>
          </div>

          {/* Selected Student Details */}
          {selectedStudent && (
            <Card className="mt-6 bg-blue-50">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">
                        {selectedStudent.name}'s Analysis
                      </h3>
                      <p className="text-sm text-blue-600">
                        AI-Generated Insights
                      </p>
                    </div>
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Subject Performance</h4>
                      <SubjectPerformanceChart
                        data={Object.entries(selectedStudent.subjects).map(
                          ([subject, score]) => ({
                            subject,
                            score,
                            predicted: score + 5,
                          })
                        )}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Strengths Analysis</h4>
                      <StrengthChart data={studentStrengths} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSelector;
