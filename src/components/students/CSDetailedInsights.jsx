import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Brain,
  Cpu,
  Code,
  Sparkles,
  Target,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const CSDetailedInsights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const progressData = [
    { month: "Sep", score: 82, topic: "Basic Algorithms" },
    { month: "Oct", score: 85, topic: "Data Structures" },
    { month: "Nov", score: 88, topic: "Advanced Algorithms" },
    { month: "Dec", score: 92, topic: "Problem Solving" },
    { month: "Jan", score: 95, topic: "System Design" },
    { month: "Feb", score: 98, topic: "Advanced Topics" },
  ];

  const topicMastery = [
    { topic: "Problem Solving", score: 95, status: "Excellent" },
    { topic: "Programming Basics", score: 92, status: "Excellent" },
    { topic: "Data Structures", score: 90, status: "Very Good" },
    { topic: "Algorithms", score: 88, status: "Very Good" },
    { topic: "System Design", score: 85, status: "Good" },
    { topic: "Advanced Topics", score: 82, status: "Good" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Computer Science Progress Report
          </h1>
          <p className="text-gray-600 mt-2">Advanced Programming Analysis</p>
        </div>
        <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
          Overall Grade: A+ (98%)
        </Badge>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-blue-600 mr-2" />
            <CardTitle>Quick Summary</CardTitle>
          </div>
          <CardDescription>
            Here's how you're doing in Advanced Programming
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  What You're Great At
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                  <li>Writing efficient code solutions</li>
                  <li>Understanding complex data structures</li>
                  <li>Solving challenging problems</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Target className="h-5 w-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">
                  Areas to Focus On
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                  <li>Writing more memory-efficient code</li>
                  <li>Multi-threaded programming</li>
                  <li>Large-scale system design</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Over Time */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            <CardTitle>Your Progress Over Time</CardTitle>
          </div>
          <CardDescription>
            How your programming skills have improved each month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 shadow-lg rounded-lg border">
                          <p className="font-bold">{label}</p>
                          <p>Score: {payload[0].value}%</p>
                          <p>Focus: {payload[0].payload.topic}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Topic Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Cpu className="h-6 w-6 text-purple-600 mr-2" />
            <CardTitle>Topic Performance</CardTitle>
          </div>
          <CardDescription>
            How well you understand different programming topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={topicMastery}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 shadow-lg rounded-lg border">
                          <p className="font-bold">{label}</p>
                          <p>Score: {payload[0].value}%</p>
                          <p>Status: {payload[0].payload.status}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center">
            <Code className="h-6 w-6 text-purple-600 mr-2" />
            <CardTitle>Personalized Learning Plan</CardTitle>
          </div>
          <CardDescription>
            Your AI-powered study recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-purple-700 flex items-center">
                <Brain className="h-4 w-4 mr-2" /> What to Learn Next
              </h4>
              <p className="text-sm mt-2">
                Based on your strong performance in algorithms, we recommend
                focusing on advanced system design concepts next.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-blue-700 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" /> Practice Suggestions
              </h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-2">
                <li>Try building a small distributed system project</li>
                <li>Practice more multi-threaded programming exercises</li>
                <li>Work on memory optimization challenges</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-green-700 flex items-center">
                <Target className="h-4 w-4 mr-2" /> Next Goals
              </h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-2">
                <li>Complete the advanced system design course</li>
                <li>Build a real-world project using concurrent programming</li>
                <li>Participate in the upcoming coding competition</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSDetailedInsights;
