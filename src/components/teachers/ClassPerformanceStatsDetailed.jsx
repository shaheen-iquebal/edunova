import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle,
  Award,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClassPerformanceStatsDetailed = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("month");
  const [selectedClass, setSelectedClass] = useState("class-10a");

  // Sample class list
  const classList = [
    { id: "class-10a", name: "Class 10-A" },
    { id: "class-10b", name: "Class 10-B" },
    { id: "class-11a", name: "Class 11-A" },
    { id: "class-11b", name: "Class 11-B" },
    { id: "class-12a", name: "Class 12-A" },
    { id: "class-12b", name: "Class 12-B" },
  ];

  // Enhanced sample data
  const stats = {
    averageScore: 75.8,
    previousAverageScore: 73.2,
    highPerformers: 65,
    totalStudents: 30,
    attendanceRate: 92,
    submissionRate: 88,
    weakestSubjects: [
      { subject: "Mathematics", score: 68, trend: -2 },
      { subject: "Physics", score: 72, trend: 1 },
      { subject: "Chemistry", score: 74, trend: -1 },
    ],
    gradeDistribution: [
      { grade: "A", count: 5, color: "#22c55e" },
      { grade: "B", count: 8, color: "#3b82f6" },
      { grade: "C", count: 10, color: "#f59e0b" },
      { grade: "D", count: 5, color: "#ef4444" },
      { grade: "F", count: 2, color: "#6b7280" },
    ],
    performanceTrend: [
      { month: "Sep", score: 71 },
      { month: "Oct", score: 73 },
      { month: "Nov", score: 74 },
      { month: "Dec", score: 75.8 },
    ],
    topPerformers: [
      { name: "Student 1", score: 95, improvement: 3 },
      { name: "Student 2", score: 92, improvement: 5 },
      { name: "Student 3", score: 90, improvement: 2 },
    ],
    skillBreakdown: [
      { skill: "Problem Solving", mastery: 82 },
      { skill: "Critical Thinking", mastery: 78 },
      { skill: "Practical Application", mastery: 74 },
      { skill: "Theoretical Knowledge", mastery: 80 },
    ],
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return <ArrowUp className="text-green-500 w-4 h-4" />;
    if (trend < 0) return <ArrowDown className="text-red-500 w-4 h-4" />;
    return <Minus className="text-gray-500 w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-64">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              {classList.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="semester">Semester</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Average Class Score
              {stats.averageScore > stats.previousAverageScore ? (
                <Badge className="bg-green-500">↑ Improving</Badge>
              ) : (
                <Badge className="bg-red-500">↓ Declining</Badge>
              )}
            </CardTitle>
            <CardDescription>Overall performance metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">
                  {stats.averageScore}%
                </span>
                <span className="text-sm text-gray-500">
                  vs {stats.previousAverageScore}% previous
                </span>
              </div>
              <Progress value={stats.averageScore} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Engagement</CardTitle>
            <CardDescription>Attendance & Submission Metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Attendance Rate</span>
                  <span className="font-bold">{stats.attendanceRate}%</span>
                </div>
                <Progress value={stats.attendanceRate} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Assignment Submission</span>
                  <span className="font-bold">{stats.submissionRate}%</span>
                </div>
                <Progress value={stats.submissionRate} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Performers</CardTitle>
            <CardDescription>Students scoring 80% or above</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">
                  {stats.highPerformers}%
                </span>
                <span className="text-sm text-gray-500">
                  (
                  {Math.round(
                    (stats.totalStudents * stats.highPerformers) / 100
                  )}{" "}
                  students)
                </span>
              </div>
              <div className="space-y-2">
                {stats.topPerformers.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>{student.name}</span>
                    <div className="flex items-center space-x-2">
                      <span>{student.score}%</span>
                      <Badge className="bg-green-500">
                        +{student.improvement}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Average score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.performanceTrend}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Breakdown of grades across class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.gradeDistribution}
                    dataKey="count"
                    nameKey="grade"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {stats.gradeDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 gap-4">
        {/* Skill Mastery */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Mastery Analysis</CardTitle>
            <CardDescription>Breakdown of key competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.skillBreakdown} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="skill" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="mastery" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card>
          <CardHeader>
            <CardTitle>Areas Needing Attention</CardTitle>
            <CardDescription>Subjects performing below target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.weakestSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <AlertTriangle className="text-amber-500" />
                    <div>
                      <div className="font-medium">{subject.subject}</div>
                      <div className="text-sm text-gray-500">
                        Current Score: {subject.score}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(subject.trend)}
                    <span className="text-sm">
                      {Math.abs(subject.trend)}%{" "}
                      {subject.trend >= 0 ? "improvement" : "decline"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassPerformanceStatsDetailed;
