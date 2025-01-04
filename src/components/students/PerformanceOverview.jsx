import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const PerformanceOverview = () => {
  const trendData = [
    { month: "Jan", real: 75, predicted: 78 },
    { month: "Feb", real: 82, predicted: 80 },
    { month: "Mar", real: 78, predicted: 82 },
    { month: "Apr", real: 85, predicted: 83 },
    { month: "May", real: 82, predicted: 85 },
    { month: "Jun", real: 88, predicted: 86 },
    { month: "Jul", real: 80, predicted: 81 },
    { month: "Aug", real: 79, predicted: 76 },
  ];

  const performanceData = [
    {
      subject: "Mathematics",
      realPerformance: 85,
      predictedPerformance: 88,
      trend: "up",
    },
    {
      subject: "Physics",
      realPerformance: 72,
      predictedPerformance: 75,
      trend: "down",
    },
    {
      subject: "Chemistry",
      realPerformance: 78,
      predictedPerformance: 80,
      trend: "up",
    },
    {
      subject: "English",
      realPerformance: 90,
      predictedPerformance: 92,
      trend: "up",
    },
    {
      subject: "Computer Science",
      realPerformance: 95,
      predictedPerformance: 94,
      trend: "up",
    },
  ];

  const getPerformanceColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const SubjectCard = ({ subject, realScore, predictedScore, trend }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">{subject}</h3>
          <div className="flex gap-2 items-center">
            <Badge variant="outline" className={getPerformanceColor(realScore)}>
              Real: {realScore}%
            </Badge>
            <Badge
              variant="outline"
              className={getPerformanceColor(predictedScore)}
            >
              Predicted: {predictedScore}%
            </Badge>
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${realScore}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );

  const handleStrengthsClick = () => {
    // Navigate to strengths page
    console.log("Navigate to strengths page");
  };

  return (
    <div className="w-full space-y-6">
      {/* Performance Trends */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>
            Track your real performance (RP) and predicted performance (PP) over
            time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="real"
                  name="Real Performance"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="Predicted Performance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Overview */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Subject Overview</CardTitle>
            <CardDescription>
              Current performance across all subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={performanceData} barGap={0}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="realPerformance"
                    name="Real Performance"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="predictedPerformance"
                    name="Predicted Performance"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject Breakdown */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Subject Breakdown</CardTitle>
            <CardDescription>Detailed performance by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {performanceData.map((data, index) => (
                <SubjectCard
                  key={index}
                  subject={data.subject}
                  realScore={data.realPerformance}
                  predictedScore={data.predictedPerformance}
                  trend={data.trend}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>
              Key observations about your academic progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Badge variant="default" className="bg-green-500">
                  Strength
                </Badge>
                <p className="text-sm">
                  Exceptional performance in Computer Science (95%) and English
                  (90%)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="default" className="bg-yellow-500">
                  Improvement
                </Badge>
                <p className="text-sm">
                  Chemistry shows steady improvement with current score of 78%
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="default" className="bg-red-500">
                  Action Needed
                </Badge>
                <p className="text-sm">
                  Physics requires attention - currently 3% below predicted
                  performance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strengths and Weaknesses Summary */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Strength Analysis</CardTitle>
            <CardDescription>
              Overview of your academic strong points and areas needing
              attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">
                  Top Performing Areas
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Advanced Programming Concepts (98%)</li>
                  <li>Literature Analysis (92%)</li>
                  <li>Calculus (88%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">
                  Areas for Improvement
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Physics Mechanics (65%)</li>
                  <li>Organic Chemistry (72%)</li>
                </ul>
              </div>
              <Button onClick={handleStrengthsClick} className="w-full mt-4">
                View Detailed Strengths and Weaknesses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceOverview;
